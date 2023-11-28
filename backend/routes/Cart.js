const cartController = require("../controller/Cart");
const express=require("express")
const router=express.Router()

router
    .post("/",cartController.create)
    .get("/:id",cartController.getById)
    .patch("/:id",cartController.updateById)
    .delete("/:id",cartController.deleteById)

module.exports=router