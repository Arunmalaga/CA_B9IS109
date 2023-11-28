import { axiosi } from "../auth/authApi"

export const addToCart=async(newItem)=>{
    const res=await axiosi.post("http://localhost:8000/cart",newItem)
    return res.data
}

export const getCartItemsByUserId=async(userid)=>{
    const res=await axiosi.get(`http://localhost:8000/cart/${userid}`)
    return res.data
}

export const updateCardItemById=async(update)=>{
    const res=await axiosi.patch(`http://localhost:8000/cart/${update._id}`,update)
    return res.data
}


export const deleteCartItembyId=async(id)=>{
    const res=await axiosi.delete(`http://localhost:8000/cart/${id}`)
    return res.data
}


export const resetCart=async(userid)=>{

    const allCartItemForUserId=await getCartItemsByUserId(userid)

    for(let item of allCartItemForUserId){
        await deleteCartItembyId(item._id)
    }
    return {status:"success"} 

}