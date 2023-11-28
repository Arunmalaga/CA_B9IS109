const mongoose=require("mongoose")
const {Schema}=mongoose


const categorySchema=new Schema({
    label:{
        type:String,
        required:true,
        unique:true
    },

    value:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports=mongoose.model("Category",categorySchema)