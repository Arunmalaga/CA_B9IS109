const mongoose=require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    addresses:{
        type:[Schema.Types.Mixed]
    },
    name:{
        type:String,
        required:true
    },
    orders:{
        type:[Schema.Types.Mixed]
    }
})

module.exports=mongoose.model("User",userSchema)