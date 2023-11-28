import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUser, checkAuth, loginUser, logoutUser} from "./authApi";
import { ClassSharp } from "@mui/icons-material";

const initialState={
    loggedInUser:null,
    status:'idle',
    error:null,
    isAuthChecked:false
}

export const createUserAsync=createAsyncThunk('auth/createUser',async(data)=>{
    const newlyCreatedUser=await CreateUser(data)
    return newlyCreatedUser
})

export const loginUserAsync=createAsyncThunk("auth/loggedInUserAsync",async(data)=>{
    const isValidUser=await loginUser(data)
    return isValidUser
})


export const checkAuthAsync=createAsyncThunk('auth/checkAuthAsync',async()=>{
    const res=await checkAuth()
    return res
})
export const logoutUserAsync=createAsyncThunk('auth/logoutUserAsync',async()=>{
    const res=await logoutUser()
    return res
})


const authSlice=createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{
        removeError:(state)=>{
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createUserAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(createUserAsync.fulfilled,(state,action)=>{
                state.loggedInUser=action.payload
            })
            .addCase(createUserAsync.rejected,(state,action)=>{
                state.status='error'
                state.error=action.error
            })


            .addCase(loginUserAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(loginUserAsync.fulfilled,(state,action)=>{
                state.loggedInUser=action.payload
                state.status='idle'
            })
            .addCase(loginUserAsync.rejected,(state,action)=>{
                state.error=action.error
                state.status='error'
            })

            .addCase(logoutUserAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(logoutUserAsync.fulfilled,(state)=>{
                state.status='idle'
                state.loggedInUser=null
            })
            .addCase(logoutUserAsync.rejected,(state,action)=>{
                state.error=action.error
                state.status='idle'
                state.loggedInUser=null
            })


            .addCase(checkAuthAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(checkAuthAsync.fulfilled,(state,action)=>{
                state.loggedInUser=action.payload
                state.isAuthChecked=true
            })
            .addCase(checkAuthAsync.rejected,(state,action)=>{
                state.error=action.error
                state.status='idle'
                state.isAuthChecked=true
            })


    }
})


export const selectLoggedInUser=(state)=>state.authSlice.loggedInUser
export const selectError=(state)=>state.authSlice.error
export const selectAuthStatus=(state)=>state.authSlice.isAuthChecked



export const {removeError}=authSlice.actions

export default authSlice.reducer