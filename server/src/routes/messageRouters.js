const { Router } = require('express');
const app = Router();
const messageControllers=require("../controllers/messageControllers")

app.post('/messages',messageControllers.PostMessages)
app.get('/messages/:userId/:conversationId', messageControllers.GetMessagesById);


module.exports = app;