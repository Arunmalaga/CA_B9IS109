const Cart = require("../model/Cart");

exports.create=async(req,res)=>{
    try {
        const newCartItem=new Cart(req.body)
        await newCartItem.save()
        const addedItem=await newCartItem.populate('product')
        res.status(201).json(addedItem)
    } catch (error) {
        res.status(500).json({'message':error})
        console.log(error)
    }
}
exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const fetchedCartItems=await Cart.find({user:id}).populate("user").populate("product")
        return res.status(200).json(fetchedCartItems)
    } catch (error) {
        res.status(404).json({'message':error})
        console.log(error)
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedCartItem=await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate("user").populate("product")
        res.status(200).json(updatedCartItem)

    } catch (error) {
        res.status(400).json({'message':error})
        console.log(error)
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params

        const deletedCartItem=await Cart.findByIdAndDelete(id)
        res.status(200).json(deletedCartItem)

    } catch (error) {
        res.status(400).json({'message':error})
        console.log(error)
    }
}