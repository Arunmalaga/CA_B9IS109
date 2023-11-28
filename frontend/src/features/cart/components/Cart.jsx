import React from 'react';
import {useSelector} from 'react-redux';
import {Stack,Button,Typography, useTheme, useMediaQuery} from '@mui/material'
import { Link, Navigate } from 'react-router-dom';
import { CartItem } from './CartItem';
import { Navbar } from '../../navbar';
import { deleteCartItembyIdAsync, selectCartItems } from '../CartSlice';


export const Cart=()=>{
  const items=useSelector(selectCartItems)
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down('900'))

  const totalAmount=items.reduce((amount,item)=>item.product.price*item.quantity+amount,0)
  const totalItems=items.reduce((total,item)=>item.quantity+total,0)



  return (
    <>
    {!items.length && <Navigate to={'/'} replace={true}/>}
    <Navbar/>

    {/* parent stack */}
    <Stack width={'100vw'} height={'calc(100vh - 5rem)'} justifyContent={'center'} alignItems={'center'}>

        {/* cart itme container */}
        <Stack width={is900?'97%':'70%'} height={'400px'} >


          <Stack>
          {
            items.length>0 && items.map((item)=>{
              return <CartItem item={item}/>
            })
          }
          </Stack>


          <Stack mt={3}>
            <Typography variant='h6' fontWeight={500}>Subtotal ${totalAmount}</Typography>
            <Typography variant='body2' color={'text.primary'} fontWeight={300}>Total items in cart {totalItems}</Typography>
            <Typography  color={'text.secondary'}>Shipping and Taxes calculated at Checkout</Typography>
            <Button sx={{mt:2}} component={Link} to={'/checkout'} variant='contained'>Checkout</Button>

            <Typography sx={{mt:4}} component={Link} to={'/'} textAlign={'center'}>or continue Shopping</Typography>
          </Stack>

        </Stack>
    </Stack>


    </>
  );
}
