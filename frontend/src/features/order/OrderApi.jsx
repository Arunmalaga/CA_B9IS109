import { axiosi } from "../auth/authApi"

export const addOrder=async(order)=>{
    try {
        const res=await axiosi.post("http://localhost:8000/orders",order)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrders=async(sort,pagination)=>{
    try {
        let queryString=''
        let filterString=''

        for(let key in pagination){
            queryString+=`${key}=${pagination[key]}&`
        }
        for(let key in sort){
            filterString+=`${key}=${sort[key]}&`
        }

        const res=await axiosi.get(`http://localhost:8000/orders?${queryString}${filterString}`)

        const data=res.data
        const totalItems=res.headers.get("X-Total-Count")

        return {"data":data,"totalItems":+totalItems}

    } catch (error) {
        console.log(error)
    }
}

export const updateOrderById=async(order)=>{
    try {
        const res=await axiosi.patch(`http://localhost:8000/orders/${order.id}`,order)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

