const express=require('express')
const authController = require('../controller/Auth')
const { verifyToken } = require('../middleware/middleware')
const router=express.Router()



router
    .post("/login",authController.login)
    .post("/signup",authController.create)
    .get("/checkauth",verifyToken,authController.checkAuth)
    .get("/logout",authController.logout)

module.exports=router