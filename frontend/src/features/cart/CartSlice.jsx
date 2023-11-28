import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteCartItembyId, getCartItemsByUserId, resetCart, updateCardItemById } from "./CartApi";

const initialState={
    state:'',
    items:[],
}



export const addToCartAsync=createAsyncThunk("cart/addToCartAsync",async(newItem)=>{
    const addedItem=await addToCart(newItem)
    return addedItem
})
export const getCartItemByUserIdAsync=createAsyncThunk("cart/getCartItemByUserIdAsync",async(userid)=>{
    const cartItems=await getCartItemsByUserId(userid)
    console.log('cart Items',cartItems)
    return cartItems
})

export const updateCardItemByIdAsync=createAsyncThunk('cart/updateCardItemByIdAsync',async(update)=>{
    const updatedCartItem=await updateCardItemById(update)
    return updatedCartItem
})

export const deleteCartItembyIdAsync=createAsyncThunk("cart/deleteCartItembyIdAsync",async(id)=>{
    const deletedItemId=await deleteCartItembyId(id)
    console.log('deleted Item',deletedItemId)
    return deletedItemId
})

export const resetCartAsync=createAsyncThunk('cart/resetCartAsync',async(userid)=>{
    const res=await resetCart(userid)
    return res
})

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

            .addCase(addToCartAsync.pending,(state)=>{
                state.state='loading'
            })
            .addCase(addToCartAsync.fulfilled,(state,action)=>{
                state.items.push(action.payload)
                state.state='idle'
            })
            .addCase(addToCartAsync.rejected,(state)=>{
                state.state='error'
            })


            .addCase(getCartItemByUserIdAsync.pending,(state)=>{
                state.state='loading'
            })
            .addCase(getCartItemByUserIdAsync.fulfilled,(state,action)=>{
                state.items=action.payload
                state.state='idle'
            })
            .addCase(getCartItemByUserIdAsync.rejected,(state)=>{
                state.state='error'
            })


            .addCase(updateCardItemByIdAsync.pending,(state)=>{
                state.state='loading'
            })
            .addCase(updateCardItemByIdAsync.fulfilled,(state,action)=>{
                const index=state.items.findIndex(item=>item._id===action.payload._id)
                state.items[index]=action.payload
            })
            .addCase(updateCardItemByIdAsync.rejected,(state)=>{
                state.state='error'
            })


            .addCase(deleteCartItembyIdAsync.pending,(state)=>{
                state.state='loading'
            })
            .addCase(deleteCartItembyIdAsync.fulfilled,(state,action)=>{
                state.items = state.items.filter(item => item._id !== action.payload._id);
            })
            .addCase(deleteCartItembyIdAsync.rejected,(state)=>{
                state.state='error'
            })


            .addCase(resetCartAsync.pending,(state)=>{
                state.state='loading'
            })
            .addCase(resetCartAsync.fulfilled,(state)=>{
                state.state='idle'
                state.items=[]
            })
            .addCase(resetCartAsync.rejected,(state)=>{
                state.state='error'
            })
    }
})


export const selectCartItems=(state)=>state.CartSlice.items


export default cartSlice.reducer