require("dotenv").config();
const https = require("node:https")
const fs = require("node:fs");
const path = require("node:path");
const app = require("./server/app");
const config = require("./config");
const options = {
    key: config.KEY,
    cert: config.CERT
}

const server = https.createServer(options, app);

server.listen(process.env.PORT, function(){
    console.log(`Example app listening on port ${process.env.PORT}`)
})
