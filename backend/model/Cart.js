const mongoose=require("mongoose")
const {Schema}=mongoose

const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports=mongoose.model("Cart",cartSchema)