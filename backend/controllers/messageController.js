const express = require("express");
const app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

// io.set("transports", ["websocket"]);

io.on("connection", async (socket) => {

  socket.on("editContact", (data) => {
    //firstUserUpdate
    console.log(data);
    // seconde sendData afterUpdate
    io.emit("sendContact", "fouad");
  });

});
async function initializesocket() {
  http.listen(process.env.SOCKET_PORT, () =>
    console.log(`Socket.io listening to port ${process.env.SOCKET_PORT}`)
  );
}

module.exports.initializesocket = initializesocket.bind(this);
module.exports.io = io;
