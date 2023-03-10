const { Router } = require('express');
const app = Router();
const userControllers = require("../controllers/userControllers")

app.post('/register',userControllers.Register)

module.exports = app;