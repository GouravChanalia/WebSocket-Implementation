require("dotenv").config();
const https = require("node:https")
const fs = require("node:fs");
const path = require("node:path");
const app = require("./server/app");
const config = require("./config");
const { Server: SocketIO } = require("socket.io");
const options = {
    key: config.KEY,
    cert: config.CERT
}

const server = https.createServer(options, app);
const io = new SocketIO(server);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // socket.broadcast.emit("chat message", msg);
    io.emit("chat message", msg);
  });
});

server.listen(process.env.PORT, function(){
    console.log(`Example app listening on port ${process.env.PORT}`)
})
