const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:[1,'Wrong min price'],
        max:[10000,'Wrong max price']
    },
    discountPercentage:{
        type:Number,
        min:[1,'Wrong min discount'],
        max:[99,'Wrong maximum discount']
    },
    rating:{
        type:Number,
        min:[1,'wrong min rating'],
        max:[5,'wrong maximum rating'],
        default:1,
    },
    stock:{
        type:Number,
        min:[0,'Wrong min stock'],
        default:0
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    deleted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Product",productSchema)