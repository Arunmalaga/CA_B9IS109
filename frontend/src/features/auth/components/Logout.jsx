import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, selectLoggedInUser } from '../authSlice'
import {Navigate} from 'react-router-dom'

export const Logout = () => {

    const dispatch=useDispatch()

    const user=useSelector(selectLoggedInUser)
    
    useEffect(()=>{
        dispatch(logoutUserAsync())
    },[user])


  return (
    <>
    {!user && <Navigate to={'/login'} replace={true}></Navigate>}
    </>
  )
}
