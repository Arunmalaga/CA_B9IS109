import axios from 'axios'

export const axiosi=axios.create({withCredentials:true})

export const CreateUser=async(userData)=>{
    try {
        const res=await axiosi.post("http://localhost:8000/auth/signup",userData)
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}
export const loginUser=async(userData)=>{

    try {
        const res=await axiosi.post(`http://localhost:8000/auth/login`,userData)

        if(res.status===200){
            return res.data
        }
    } catch (error) {
        throw error.response.data
    }
}

export const checkAuth=async()=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/auth/checkauth`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const logoutUser=async()=>{
    try {
        const res=await axiosi.get('http://localhost:8000/auth/logout')
        return res.data
    } catch (error) {
        console.log(error)
    }
}