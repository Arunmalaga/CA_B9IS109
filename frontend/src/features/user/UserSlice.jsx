import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, getOrderbyUserId, updateUser } from "./UserApi";

const initialState={
    status:"",
    userInfo:null,
    userOrders:[],
}


export const fetchLoggedInUserAsync=createAsyncThunk('user/fetchLoggedInUserAsync',async(userid)=>{
    const userData=await fetchLoggedInUserInfo(userid)
    return userData
})

export const getOrderbyUserIdAsync=createAsyncThunk('user/getOrderbyUserIdAsync',async(userid)=>{
    const userOrders=await getOrderbyUserId(userid)
    return userOrders
})

export const updateUserAsync=createAsyncThunk('auth/updateUserAsync',async(update)=>{
    const updatedUser=await updateUser(update)
    return updatedUser
})

const userSlice=createSlice({
    name:"userSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchLoggedInUserAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
                state.status='idle'

                //* this information can be more from the loggedInUser Info
                state.userInfo=action.payload
            })
            .addCase(fetchLoggedInUserAsync.rejected,(state)=>{
                state.status='error'
            })



            .addCase(getOrderbyUserIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getOrderbyUserIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                //* this information can be more from the loggedInUser Info
                state.userOrders=action.payload
            })
            .addCase(getOrderbyUserIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(updateUserAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateUserAsync.fulfilled,(state,action)=>{
                state.userInfo=action.payload
            })
            .addCase(updateUserAsync.rejected,(state,action)=>{
                state.status='idle'
            })

    }
})

export const selectUserOrders=(state)=>state.UserSlice.userOrders
export const selectUserInfo=(state)=>state.UserSlice.userInfo


export default userSlice.reducer