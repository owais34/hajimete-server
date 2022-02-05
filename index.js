const express = require("express");
const socket = require("socket.io");
const { userRoomUtil} =require("./services/UserQueue")
const {QueLoop}=require('./services/QueLoop')
const path=require('path')

// App setup
const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});


app.use(express.static(path.join(__dirname,"public")))


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
 });

//Setting up User Queuer
const queLoop=new QueLoop();


// Socket setup
const io = socket(server,{cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}});

io.on("connection", function (socket) {
  console.log("Made socket connection",socket.id);
  
  socket.on("queue_in",()=>{
    //console.log("Queued in",socket.id)
    queLoop.addUser(socket,io)
    queLoop.runLoop(io);
  })

  socket.on("message_hola",(payload)=>{
      socket.to(userRoomUtil.getRoom(socket.id)).emit("message_hola",payload)
  })

  socket.on("disconnect",()=>{
    //console.log("disconnected",socket.id)
    queLoop.removeUser(socket,io)
  })

  socket.on("queue_out",()=>{
    //console.log("Queued out",socket.id)
    queLoop.removeUser(socket,io)
  })

});


