import { axiosi } from "../auth/authApi"

export const fetchLoggedInUserInfo=async(userid)=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/users/${userid}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getOrderbyUserId=async(userid)=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/orders/${userid}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUser=async(update)=>{
    try {
        const res=await axiosi.patch(`http://localhost:8000/users/${update._id}`,update)
        return res.data
    } catch (error) {
        console.log(error)
    }
}