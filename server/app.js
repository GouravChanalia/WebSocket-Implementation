const Express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const { Server } = require("socket.io");
const app = Express();


app.get("/", function(req, res){
    const filePath = path.join(__dirname, "../user-interface/index.html");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(filePath));
});

module.exports = app;