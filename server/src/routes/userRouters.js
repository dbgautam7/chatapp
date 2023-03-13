const { Router } = require('express');
const app = Router();
const userRegisterControllers = require("../controllers/userRegisterControllers")
const userLoginControllers = require("../controllers/userLoginControllers")

app.post('/register',userRegisterControllers.Register)

app.post('/login',userLoginControllers.Login)

module.exports = app;