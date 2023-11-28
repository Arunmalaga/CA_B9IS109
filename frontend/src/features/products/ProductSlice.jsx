import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllBrands, getAllCategories, getProductById, getProducts, getProductsByFilters, updateProductById } from "./ProductApi.";

const initialState={
    status:"idle",
    products:[],
    totalItems:0,
    Brands:[],
    Categories:[],
    Products:[],
    selectedProduct:null,
    filteredProducts:[]
}
 
export const getProductsAsync=createAsyncThunk('products/getProductsAsync',async()=>{
    const fetchedProducts=await getProducts()
    return fetchedProducts
})
export const getAllBrandsAsync=createAsyncThunk('products/getAllBrandsAsync',async()=>{
    const fetchedBrands=await getAllBrands()
    return fetchedBrands
})
export const getAllCateoriesAsync=createAsyncThunk('products/getAllCateoriesAsync',async()=>{
    const fetchedCategories=await getAllCategories()
    return fetchedCategories
})

export const getProductsByFiltersAsync=createAsyncThunk('products/getProductsByFiltersAsync',async({filter,sort,pagination})=>{
    const filteredProducts=await getProductsByFilters(filter,sort,pagination)
    return filteredProducts
})
export const getProductByIdAsync=createAsyncThunk('products/getProductByIdAsync',async(id)=>{
    const product=await getProductById(id)
    return product
})

export const createProductAsync=createAsyncThunk("products/createProductAsync",async(data)=>{
    const createdProduct=await createProduct(data)
    return createdProduct
})

export const updateProductByIdAsync=createAsyncThunk("products/updateProductByIdAsync",async(product)=>{
    const updatedProduct=await updateProductById(product)
    return updatedProduct
})





const productSlice=createSlice({
    name:"productSlice",
    initialState:initialState,
    reducers:{
        clearSelectedProduct:(state)=>{state.selectedProduct=null},
        filterProducts:(state,action)=>{state.filteredProducts=state.products.filter((item)=>item.title.toLowerCase().includes(action.payload))}
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getProductsAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getProductsAsync.rejected,(state)=>{
                state.status='error'
            })
            .addCase(getProductsAsync.fulfilled,(state,action)=>{
                state.products=action.payload
            })


            .addCase(getProductsByFiltersAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getProductsByFiltersAsync.rejected,(state)=>{
                state.status='error'
            })
            .addCase(getProductsByFiltersAsync.fulfilled,(state,action)=>{
                state.products=action.payload.data
                state.totalItems=action.payload.totalItems
            })



            .addCase(getAllBrandsAsync.pending,(state)=>{
                state.status=[]
            })
            .addCase(getAllBrandsAsync.fulfilled,(state,action)=>{
                state.Brands=action.payload
            })
            .addCase(getAllBrandsAsync.rejected,(state)=>{
                state.Brands=[]
            })



            .addCase(getAllCateoriesAsync.pending,(state)=>{
                state.Categoriesstatus=[]
            })
            .addCase(getAllCateoriesAsync.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.Categories=action.payload
            })
            .addCase(getAllCateoriesAsync.rejected,(state)=>{
                state.Categories=[]
            })


            .addCase(getProductByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getProductByIdAsync.fulfilled,(state,action)=>{
                state.selectedProduct=action.payload
            })
            .addCase(getProductByIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(createProductAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(createProductAsync.fulfilled,(state,action)=>{
                state.products.push(action.payload)
            })
            .addCase(createProductAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(updateProductByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateProductByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                const index=state.products.findIndex((item)=>item.id===action.payload.id)
                state.products[index]=action.payload
            })
            .addCase(updateProductByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }

})

export const selectSelectedProduct=(state)=>state.ProductSlice.selectedProduct



export const {clearSelectedProduct,filterProducts}=productSlice.actions
export default productSlice.reducer