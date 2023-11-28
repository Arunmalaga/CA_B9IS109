import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, getAllOrders, updateOrderById } from "./OrderApi";


const initialState={
    status:"idle",
    orders:[],
    totalOrders:null,
    currentOrder:[]
}


export const addOrderAsync=createAsyncThunk("order/addOrderAsync",async(order)=>{
    const createdOrder=await addOrder(order)
    return createdOrder
})

export const getAllOrdersAsync=createAsyncThunk("order/getAllOrdersAsync",async({sort,pagination})=>{
    const orders=await getAllOrders(sort,pagination)
    return orders
})

export const updateOrderByIdAsync=createAsyncThunk("order/updateOrderByIdAsync",async(order)=>{
    const updatedOrder=await updateOrderById(order)
    return updatedOrder
})

const orderSlice=createSlice({
    name:"orderSlice",
    initialState:initialState,
    reducers:{
        resetOrder:(state)=>{
            state.currentOrder=[]
        }
    },
    extraReducers:(builder)=>{
        builder

            .addCase(addOrderAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(addOrderAsync.fulfilled,(state,action)=>{
                state.currentOrder=action.payload
                state.orders.push(action.payload)
                state.status='idle'
            })
            .addCase(addOrderAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(getAllOrdersAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getAllOrdersAsync.fulfilled,(state,action)=>{
                state.orders=action.payload.data
                state.totalOrders=+action.payload.totalItems
                state.status='idle'
            })
            .addCase(getAllOrdersAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(updateOrderByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateOrderByIdAsync.fulfilled,(state,action)=>{
                const index=state.orders.findIndex((order)=>order.id===action.payload.id)

                state.orders[index]=action.payload

                state.status='idle'
            })
            .addCase(updateOrderByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectCurrentOrder=(state)=>state.OrderSlice.currentOrder
export const selectOrders=(state)=>state.OrderSlice.orders
export const selectTotalOrders=(state)=>state.OrderSlice.totalOrders


export const {resetOrder}=orderSlice.actions

export default orderSlice.reducer