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
connect()

require('dotenv').config()
const port=process.env.PORT

server.listen(port, () => {
    console.log(`Server running on port at ${port}`);
});

io.on('connection', (socket) => {
  console.log("socket is connected")

  socket.on("messageRequest", async(messageRequest) => {
    try {
      io.emit("messageRequest", messageRequest);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', () => {
    console.log("socket is disconnected");
  });

  socket.on('error', (error) => {
    console.log("socket error:", error);
  });
});


