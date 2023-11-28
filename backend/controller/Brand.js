const Brand = require("../model/Brand");

exports.getAll=async(req,res)=>{
    try {
        const brands=await Brand.find({})
        res.status(200).json(brands)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}

exports.create=async(req,res)=>{
    try {
        const createdBrand=new Brand(req.body)
        await createdBrand.save()
        res.status(201).json(createdBrand)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}