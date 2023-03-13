const { Router } = require('express');
const app = Router();
const userRegisterControllers = require("../controllers/userRegisterControllers")
const userLoginControllers = require("../controllers/userLoginControllers")
const userControllers=require("../controllers/userControllers")

app.post('/register',userRegisterControllers.Register)

app.post('/login',userLoginControllers.Login)

app.get("/users", userControllers.GetUsers);

module.exports = app;