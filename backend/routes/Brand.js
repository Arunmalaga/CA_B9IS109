const brandController = require("../controller/Brand");
const express=require("express")
const router=express.Router()



router
    .get("/",brandController.getAll)
    .post("/",brandController.create)


module.exports=router