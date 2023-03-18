const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const userRouters=require("../src/routes/userRouters")
const messageRouters=require("../src/routes/messageRouters")

app.use(userRouters)
app.use(messageRouters)

const io = new Server(server,{
  cors: {
      origin: "*"
  },
});

const connect=require("./db/connect")
const Messages = require('./models/Messages')
connect()

require('dotenv').config()
const port=process.env.PORT

server.listen(port, () => {
    console.log(`Server running on port at ${port}`);
});

io.on('connection', (socket) => {
  console.log("socket is connected")

  socket.on("messageRequest", async(messageRequest) => {
     io.emit("messageRequest", messageRequest);
  });


  socket.on('disconnect', () => {
    console.log("socket is disconnected");
  });
});

