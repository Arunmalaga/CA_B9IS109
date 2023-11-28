const Order = require("../model/Order");

exports.create=async(req,res)=>{
    try {
        const newOrder=new Order(req.body)
        await newOrder.save()
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({'message':error})
        console.log(error)
    }
}
exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const fetchedOrdersByUserId=await Order.find({user:id})
        return res.status(200).json(fetchedOrdersByUserId)
    } catch (error) {
        res.status(404).json({'message':error})
        console.log(error)
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedOrder=await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedOrder)

    } catch (error) {
        res.status(400).json({'message':error})
        console.log(error)
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params

        const deletedOrder=await Order.findByIdAndDelete(id,req.body)
        // todo -> there might be a empty doc in "deletedcartitem"
        res.status(200).json(deletedOrder)

    } catch (error) {
        res.status(400).json({'message':error})
        console.log(error)
    }
}