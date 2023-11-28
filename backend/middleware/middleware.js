require('dotenv').config()
const jwt=require('jsonwebtoken')

exports.verifyToken=async(req,res,next)=>{
    try {
        const {token}=req.cookies
        const decodedUser=jwt.verify(token,process.env.SECRET_KEY)
        if(decodedUser._id,decodedUser.role){
            req.user=decodedUser
            next()
        }
        else{
            return res.status(401).json({"message":"token expired, please login again"})
        }
    } catch (error) {
        return res.status(500).json({"message":"some error occured, please login again"})
    }
}