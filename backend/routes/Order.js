const express=require("express")
const router=express.Router()
const orderController=require("../controller/Order")


router
    .post("/",orderController.create)
    .get('/:id',orderController.getById)
    .patch("/:id",orderController.updateById)
    .delete("/:id",orderController.deleteById)


module.exports=router