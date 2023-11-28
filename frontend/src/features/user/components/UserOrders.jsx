import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderbyUserIdAsync, selectUserInfo, selectUserOrders } from '../UserSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import { selectCartItems } from '../../cart/CartSlice'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Navbar } from '../../navbar'

export const UserOrders = () => {
    
    const dispatch=useDispatch()

    const user=useSelector(selectUserInfo)
    const userOrders=useSelector(selectUserOrders)

    useEffect(()=>{
        if(user?._id){
            dispatch(getOrderbyUserIdAsync(user._id))
        }
    },[user])

  return (
    <>
        <Navbar/>

        <Stack justifyContent={'center'} p={2} alignItems={'center'} ml={"auto"} mr={"auto"}>
        {
            userOrders && user &&  userOrders.map((order)=>(
                <Stack mt={3} width={"100%"} >
                    <Typography variant='h4' sx={{wordBreak:"break-all"}} fontWeight={300}>Order #{order._id}</Typography>
                    <Typography variant='h6' color={'text.secondary'} >Status {order.status}</Typography>
                <Stack justifyContent={'space-between'} flexDirection={'column'} p={1}>
        
                {/* shows image and product info*/}
                
                    <Stack spacing={2}>
                        {
                    order.items.map((item)=>(
                        <Stack flexDirection={"row"}>
                                {/* product image container */}
                                <Box sx={{width:"100px",height:"100px"}}>
                                    <img style={{width:"100%",height:"100%",objectFit:"cover"}} src={item.thumbnail} alt="cart item image" />
                                </Box>
                    
                                <Stack ml={1} justifyContent={'space-between'}>
                                    <Stack>
                                        <Typography>{item.title}</Typography>
                                        <Typography color={'text.secondary'}>{item.brand}</Typography> 
                                    </Stack>
                    
                                    {/* <Typography color={'text.secondary'}>Qty: {item.quantity}</Typography> */}
                                </Stack>
                        </Stack>
                    ))
            }
                    </Stack>
                
                <Stack width={'100%'}>


                        <Stack mt={2} width={'100%'}>
                            <Typography>Subtotal ${order.totalAmount}</Typography>
                            <Typography>Total Items in this Cart {order.totalItems}</Typography>
                        </Stack>
                        
                        <Typography mt={2}>Address</Typography>
                        <Stack mt={1} flexDirection={'row'} p={2}  component={Paper} elevation={6} justifyContent={'space-between'}>
                            <Stack>
                                <Typography>{order.selectedAddress.name}</Typography>
                                <Typography>{order.selectedAddress.street}</Typography>
                                <Typography>{order.selectedAddress.postalCode}</Typography>
                            </Stack>
                            <Stack>
                                <Typography>Phone {order.selectedAddress.phone}</Typography>
                                <Typography>{order.selectedAddress.state}</Typography>
                            </Stack>
                        </Stack>
                </Stack>        
            </Stack>
            </Stack>
            ))
        }
        </Stack>
    
    </>
  )
}
