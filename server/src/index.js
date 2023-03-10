const express = require('express')
const cors = require('cors')
const connect=require("./db/connect")

const app = express()

app.use(express.json())
app.use(cors())

connect()

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running on port at http://${hostname}:${port}/`);
  });
