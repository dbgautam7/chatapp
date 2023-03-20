const { Router } = require('express');
const app = Router();
const userRegisterControllers = require("../controllers/userRegisterControllers")
const userLoginControllers = require("../controllers/userLoginControllers")
const userControllers=require("../controllers/userControllers")
const profilePicUploadMiddleware=require("../middlewares/profilePicUploadMiddleware")
const profilePicControllers=require("../controllers/profilePicControllers")

app.post('/register',userRegisterControllers.Register)

app.post('/login',userLoginControllers.Login)

app.get("/users", userControllers.GetUsers);

app.post("/profilePicChange", profilePicUploadMiddleware.upload,profilePicControllers.PostProfile)

module.exports = app;