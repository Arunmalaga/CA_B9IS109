const express=require('express')
const productController = require('../controller/Product')
const router=express.Router()


router
    .post("/",productController.create)
    .get("/",productController.getAll)
    .get('/:id',productController.getById)
    .patch("/:id",productController.updateById)

module.exports=router