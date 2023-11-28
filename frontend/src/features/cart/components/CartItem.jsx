import React from 'react'
import {Stack,Typography,Box,Button} from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteCartItembyIdAsync, updateCardItemByIdAsync } from '../CartSlice'

export const CartItem = ({item,handleCartItemDelete}) => {

    const dispatch=useDispatch()

    const handleQuantityChange=(e,item)=>{
        dispatch(updateCardItemByIdAsync({...item,quantity:e.target.value}))
    }


  return (
    <>
    <Stack justifyContent={'space-between'} flexDirection={'row'} p={1}>
        
        {/* shows image and product info*/}
        <Stack flexDirection={"row"}>

            {/* product image container */}
            <Box sx={{width:"100px",height:"100px"}}>
                <img style={{width:"100%",height:"100%",objectFit:"cover"}} src={item.product.thumbnail} alt="cart item image" />
            </Box>

            <Stack ml={1} justifyContent={'space-between'}>
                <Stack>
                    <Typography>{item.product.title}</Typography>
                    <Typography color={'text.secondary'}>{item.product.brand}</Typography> 
                </Stack>

                <Typography color={'text.secondary'}>Qty</Typography>

                <select name="" id="" value={item.quantity} onChange={(e)=>{
                    handleQuantityChange(e,item)
                    }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

            </Stack>

        </Stack>


        {/* shows price and remove option */}
        <Stack justifyContent={'space-between'}>

            <Typography>$ {item.product.price}</Typography>
            <Button onClick={()=>dispatch(deleteCartItembyIdAsync(item._id))} variant='text' size='small'>Remove</Button>
        </Stack>

    </Stack>
    </>
  )
}
