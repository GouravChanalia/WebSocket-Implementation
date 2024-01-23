require("dotenv").config();
const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");
const app = require("./server/app");
const config = require("./config");
const { Server: SocketIO } = require("socket.io");
const options = {
  key: config.KEY,
  cert: config.CERT,
};

const server = https.createServer(options, app);
const io = new SocketIO(server);

io.on("connection", (socket) => {
  /** catch all incoming listener */
  socket.onAny((eventName, ...args) => {
    console.log(eventName);
  });

  /** on event */
  socket.on("chat message", async (msg, roomName, callback) => {
    console.log("message: " + msg);
    /** callback function for acknowledgement */
    callback({
      status: "message received",
    });

    /** acknowledgement by using emitWithAck event */
    io.to(roomName)
      .timeout(5000)
      .emitWithAck("chat message", msg)
      .then(function (response) {
        console.log(response?.status);
      })
      .catch(function (err) {
        console.log("Error", err);
      });
  });

  /** join the socket room to emit events for the members of this room  */
  socket.on("join the room", (roomName, callback) => {
    let isFound = config.PREDEFINED_ROOMS.find((room) => room === roomName);
    console.log(isFound);
    if (isFound) {
      socket.join(roomName);
      callback({
        status: "joined",
      });
    }
  });

  /** leave the room */
  socket.on("leave room", (roomName, callback) => {
    socket.leave(roomName);
    callback({
      status: "left",
    });
  });
});

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
