const Category = require("../model/Category");

exports.getAll=async(req,res)=>{
    try {
        const category=await Category.find({})
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}


exports.create=async(req,res)=>{
    try {
        const createdCategory=new Category(req.body)
        await createdCategory.save()
        res.status(201).json(createdCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}