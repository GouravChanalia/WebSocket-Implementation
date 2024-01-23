const fs = require("node:fs");
const path = require("node:path");
const rooms = require("./rooms");
module.exports = {
  KEY: fs.readFileSync(path.join(__dirname, "localhost.key")),
  CERT: fs.readFileSync(path.join(__dirname, "localhost.crt")),
  PREDEFINED_ROOMS: rooms,
};
