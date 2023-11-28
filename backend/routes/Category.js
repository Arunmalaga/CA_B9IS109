const categoryController = require("../controller/Category");
const express=require("express");
const router=express.Router()



router
    .get("/",categoryController.getAll)
    .post("/",categoryController.create)


module.exports=router