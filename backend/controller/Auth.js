require('dotenv').config()
const User = require("../model/User");
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken');
const { sanitizeUser } = require("../common/common");

exports.create=async(req,res)=>{
    try {
        const isEmailTaken=await User.findOne({email:req.body.email})

        if(isEmailTaken){
            return res.status(400).json({'message':"User already exists"})
        }
        else{
            const hashedPassword=await bcrypt.hash(req.body.password,14)
            req.body.password=hashedPassword

            const newUser=new User(req.body)
            await newUser.save()

            const secureUser= sanitizeUser(newUser)
            const token=jwt.sign(secureUser,process.env.SECRET_KEY,{expiresIn:'6hr'})

            res.cookie('token',token,{
                httpOnly:"true",
                sameSite:"Lax",
                maxAge:new Date(Date.now() + 90000000)
            })

            return res.status(201).json({'message':"hello"}) 
        }
    } catch (error) {
        res.status(500).json({'message':error})
        console.log(error)
    }
}

exports.login=async(req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email})

        if(existingUser && (await bcrypt.compare(req.body.password,existingUser.password))){

            const secureUser=  sanitizeUser(existingUser)
            const token=jwt.sign(secureUser,process.env.SECRET_KEY,{expiresIn:'6hr'})

            res.cookie('token',token,{
                httpOnly:"true",
                sameSite:"Lax",
                maxAge:new Date(Date.now() + 90000000)
            })
            return res.status(200).json(secureUser) 
        }
        else{
            return res.status(400).json({"message":"Invalid Credentails"})
        }
    } catch (error) {
        res.status(500).json({'message':'Interval Server Error'})
    }
}

exports.checkAuth=async(req,res)=>{
    try {
        if(req.user){
            return res.status(200).json(req.user)
        }
        else{
            return res.status(401).json({'message':"token has expired please login again"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({'message':"some error occured, please login again"})
    }
}


exports.logout=async(req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true})
    res.status(200).json({"message":"logout succesfull"})
}
