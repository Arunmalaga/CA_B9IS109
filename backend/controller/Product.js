
const Product = require("../model/Product")

exports.create=async(req,res)=>{
    try {
        const newProduct=new Product(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({'message':error})
        console.log(error)
    }
}


exports.getAll=async(req,res)=>{

    // filter = {"category":['smartphones','laptops]}
    // sort= [_sort:"price",_order='desc']
    // pageination = {_page:1,_limit=10}

    try {
        let query=Product.find({})
        let totalProuductsQuery=Product.find({})

        if(req.query.category){
            query= query.find({category:req.query.category})
            totalProuductsQuery= totalProuductsQuery.find({category:req.query.category})
        }
        if(req.query.brand){
            query= query.find({brand:req.query.brand})
            totalProuductsQuery= totalProuductsQuery.find({brand:req.query.brand})
        }
        if(req.query._sort && req.query._order){
            query= query.sort({[req.query._sort]:req.query._order})
            totalProuductsQuery= totalProuductsQuery.sort({[req.query._sort]:req.query._order})
        }

        if(req.query._page && req.query._limit){
            const pageSize=req.query._limit
            const page=req.query._page
            
            query=query.skip(pageSize*(page-1)).limit(pageSize)
        }

        const docs=await query.exec()
        const totalCount=await totalProuductsQuery.count().exec()
        res.set("X-Total-Count",totalCount)
        return res.status(200).json(docs)
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':error})
    }
}

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const fetchedProduct=await Product.findById(id)
        return res.status(200).json(fetchedProduct)
    } catch (error) {
        res.status(404).json({'message':error})
        console.log(error)
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedProduct=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(400).json({'message':error})
        console.log(error)
    }
}