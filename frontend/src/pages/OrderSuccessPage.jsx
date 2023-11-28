import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/CartSlice'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { resetOrder } from '../features/order/OrderSlice'


export const OrderSuccessPage = () => {
    const dispatch=useDispatch()
    const user=useSelector(selectLoggedInUser)

    const {id}=useParams()


    useEffect(()=>{
        dispatch(resetCartAsync(user._id))
        dispatch(resetOrder())
    },[user])

    return (
        <>
        {!id && <Navigate to={'/'} replace={true}/>}
    <Stack justifyContent={'center'} height={'100vh'} alignItems={'center'}>
      <Stack spacing={4} alignItems={'center'} p={2} justifyContent={'center'}>
        <Typography variant='h5'>Order succesfully placed✅</Typography>
        <Typography sx={{wordBreak:"break-all"}} variant='h5'>order id #{id}</Typography>
        <Button variant='contained' component={Link} to={"/orders"}>Your can check your order in my account</Button>
      </Stack>
    </Stack>
    </>
  )
}
