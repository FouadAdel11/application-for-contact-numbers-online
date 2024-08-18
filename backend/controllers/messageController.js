const express = require("express");
const app = express();
let http = require("http").createServer(app);
const Contact = require("../models/contactModel");
let io = require("socket.io")(http ,{  cors: {
    origin: "*", // Your Angular app's URL
    methods: ["GET", "POST" ,"PUT"]
  }});

io.on("connection", async (socket) => {
  socket.on("editContact", async(data) => {
    try {
    //firstUserUpdate
      let limit = data.limit
      let offset=data.offset
          const contact = await Contact.findById(data._id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
    }
    let updatedContact
    if (Object.keys(data).length!==0) {
 updatedContact= await Contact.findByIdAndUpdate(
    data._id,
  data,
    {new:true}
      );

      }
    const contacts = await Contact.find().sort({ _id: -1 }).skip(+offset).limit(+limit)
    const totalCount = await Contact.countDocuments();
      //seconde send data
      if(updatedContact)
    io.emit("sendContact", {contacts,totalCount});
    } catch (error) {
console.log(error);
    }

  });

});
async function initializesocket() {
  http.listen(process.env.SOCKET_PORT, () =>
    console.log(`Socket.io listening to port ${process.env.SOCKET_PORT}`)
  );
}

module.exports.initializesocket = initializesocket.bind(this);
module.exports.io = io;
