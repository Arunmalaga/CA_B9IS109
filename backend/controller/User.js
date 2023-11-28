const User = require("../model/User");

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const fetchedUser=(await User.findById(id)).toObject()
        delete fetchedUser.password
        return res.status(200).json(fetchedUser)
    } catch (error) {
        res.status(404).json({'message':error})
        console.log(error)
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedUser=(await User.findByIdAndUpdate(id,req.body,{new:true})).toObject()
        delete updatedUser.password
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(400).json({'message':error})
        console.log(error)
    }
}