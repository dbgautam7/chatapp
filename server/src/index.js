const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server,{
  cors: {
      origin: "*"
  },
});



const connect=require("./db/connect")
connect()

const hostname = '127.0.0.1';
const port = 3000;

io.on('connection', (socket) => {
  console.log("socket is connected")
});

server.listen(port, hostname, () => {
    console.log(`Server running on port at http://${hostname}:${port}/`);
});


// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };