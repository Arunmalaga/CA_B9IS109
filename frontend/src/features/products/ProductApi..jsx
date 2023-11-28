import { axiosi } from "../auth/authApi"

export const getProducts=async()=>{
    try {
        const res=await axiosi.get("http://localhost:8000/products?limit=100")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getProductsByFilters=async(filter,sort,pagination)=>{

    // filter = {"category":['smartphones','laptops]}
    // sort= [_sort:"price",_order='desc']
    // pageination = {_page:1,_limit=10}

    let queryString=''
    for(let key in filter){

        const categoryValues=filter[key];

        if(categoryValues.length){
            const lastCategoryValue=categoryValues[categoryValues.length-1]
            queryString+=`${key}=${lastCategoryValue}&`
        }

    }

    for(let key in sort){
        queryString+=`${key}=${sort[key]}&`
    }

    for(let key in pagination){
        queryString+=`${key}=${pagination[key]}&`
    }

    try {
        const res=await axiosi.get(`http://localhost:8000/product?${queryString}`)
        const totalItems=await res.headers.get("X-Total-Count")
        console.log(`http://localhost:8000/products?${queryString}`)
        return {data:res.data,totalItems:+totalItems}
    } catch (error) {
        console.error(error)
    }
}

export const getAllCategories=async()=>{
    try {
        const res=await axiosi.get("http://localhost:8000/category")
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getAllBrands=async()=>{
    try {
        const res=await axiosi.get("http://localhost:8000/brand")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getProductById=async(id)=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/product/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateProductById=async(product)=>{
    console.log(product)
    try {
        const res=await axiosi.patch(`http://localhost:8000/product/${product._id}`,product)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createProduct=async(data)=>{
    try {
        const res=await axiosi.post("http://localhost:8000/product",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}