import React, { useState } from 'react'
import {Stack} from '@mui/material'
import {Typography} from '@mui/material'
import { TextField ,Divider,Button} from '@mui/material'
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import { Link, Navigate } from 'react-router-dom';
import { CartItem } from '../../cart';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/CartSlice';
import { useForm } from 'react-hook-form';
import { addOrderAsync} from '../../order/OrderSlice';
import { selectUserInfo, updateUserAsync } from '../../user/UserSlice';

export const Checkout = () => {
    const [orientation, setOrientation] = React.useState('vertical');
    const { register,handleSubmit,reset,watch,formState : {errors}}=useForm()
    
    const dispatch=useDispatch()
    
    
    const currentOrder=useSelector((state)=>state.OrderSlice.currentOrder)
    const user=useSelector(selectUserInfo)
    const item=useSelector(selectCartItems)

    const [selectedAddress,setSelectedAddress]=useState(null)
    const [paymentMethod,setPaymentMethod]=useState(null)

    const handleOrder=()=>{
      const products=item.map((item)=>{
        return item.product
      })
      dispatch(addOrderAsync({items:products,totalAmount,totalItems,user:user._id,paymentMethod,selectedAddress,status:"pending"}))
    }


    const totalAmount=item.reduce((amount,item)=>item.product.price*item.quantity+amount,0)
    const totalItems=item.reduce((total,item)=>item.quantity+total,0)

  return (
    <>
    {!item.length && <Navigate to={'/'} replace={true}/>}
    {currentOrder?._id && <Navigate to={`/order-success/${currentOrder._id}`} replace={true}/>}
    <Stack width={'100vw'} flexDirection={'row'} justifyContent={'center'} alignItems={"flex-start"} flexWrap={"wrap"} >

            {/* billing details */}
            <Stack  component="form" noValidate method='patch' onSubmit={handleSubmit((data)=>{
                dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}))
                reset()
            }
            )}

              bgcolor={'white'} height={'100%'} mt={10} mb={10} boxShadow={'0 0 1rem 1px rgba(0,0,0,0.05)'} width={'40rem'} p={2} spacing={5}>

                    <Stack>
                        <Typography variant='h6'>Personal Information</Typography>
                        <Typography color={'text.secondary'}>Use a permanent address where you can receive mail</Typography>
                    </Stack>

                    <Stack direction={'column'}>
                        <TextField fullWidth placeholder='Name' {...register('name',{required:"name is required"})}/>
                        <FormHelperText>{errors.name?.message}</FormHelperText>
                    </Stack>

                    <Stack>
                    <TextField placeholder='Email address' {...register('email',{required:"Email is required"})}/>
                    <FormHelperText>{errors.email?.message}</FormHelperText>
                    </Stack>
                    
                    <Stack>
                    <TextField  type='tel' placeholder='Phone' {...register('phone',{required:"phone is required"})}/>
                    <FormHelperText>{errors.phone?.message}</FormHelperText>
                    </Stack>

                    <Stack>
                      <TextField placeholder='Street address' {...register('street',{required:"street address is required"})}/>
                      <FormHelperText>{errors.street?.message}</FormHelperText>
                    </Stack>

                    <Stack direction={'row'}>

                        <Stack>
                          <TextField fullWidth placeholder='City' {...register('city',{required:"City is required"})}/>
                            <FormHelperText>{errors.city?.message}</FormHelperText>
                        </Stack>

                        <Stack>
                          <TextField fullWidth placeholder='State / Province' {...register('state',{required:"State is required"})}/>
                          <FormHelperText>{errors.state?.message}</FormHelperText>
                        </Stack>

                        <Stack>
                          <TextField fullWidth placeholder='Zip / Postal code' {...register('postalCode',{required:"Postal Code is required"})}/>
                          <FormHelperText>{errors.postalCode?.message}</FormHelperText>
                        </Stack>
                        
                        
                    </Stack>
                    <Divider/>

                    {/* ADDRESS SECTION START-->> */}
                    <Stack direction={'row'} alignSelf={'flex-end'}>
                        <Button variant='outlined' onClick={()=>reset()}>Reset</Button>
                        <Button type='submit' variant='contained'>Add Address</Button>
                    </Stack>


                    <Stack>
                        <Typography variant='h6'>Address</Typography>
                        <Typography color={'text.secondary'}>Choose from existing addresses</Typography>
                    </Stack>

                    {
                      user?.addresses?.length!==0?(

                      user?.addresses?.map((address,index)=>

                        (<FormControl sx={{ p: 2, flexDirection: 'row', gap: 2 }}>
                        <Radio overlay key={index} checked={selectedAddress===address} name='addressRadioGroup' value={selectedAddress} onChange={()=>setSelectedAddress(user.addresses[index])} />
                        <div>
                                    <Typography>{address.name}</Typography>
                                    <Typography>{address.street}</Typography>
                                    <Typography>{address.pinCode}</Typography>
                                    <Typography>{address.phone}</Typography>
                                    <Typography>{address.state}</Typography>
                        </div>
                      </FormControl>)
                      )
                      ):null
                    }
                    
                    {/* PAYMENT SECTION STARTS--->>>>> */}
                    <Stack>
                        <Typography variant='h6'>Payments Methods</Typography>
                        <Typography color={'text.secondary'}>Choose One</Typography>
                    </Stack>

                    <Box sx={{ minWidth: 240 }}>
                          <List component="div" variant="outlined" orientation={orientation} sx={{ borderRadius: 'sm', boxShadow: 'sm', }}>
                            <Radio sx={{padding:"1rem .2rem"}} name='paymentRadio' label={'Cash'} checked={paymentMethod==='Cash'} value={'Cash'} onChange={(e)=>setPaymentMethod(e.target.value)}/>
                            <Divider></Divider>
                            <Radio sx={{padding:"1rem .2rem"}} name='paymentRadio' label={'Card'} checked={paymentMethod==='Card'} value={'Card'}  onChange={(e)=>setPaymentMethod(e.target.value)}/>
                          </List>
                      </Box>
            </Stack>

            {/* cart details */}
            <Stack mt={10} p={2} spacing={4} boxShadow={'0 0 1rem 1px rgba(0,0,0,0.05)'} width={'30rem'}>

                <Typography variant='h4' fontWeight={900}>Cart</Typography>

                <Stack mt={4} spacing={2}>
                        {
                          item.length>0 && item.map((item)=><CartItem item={item}/>)
                        }
                        
                </Stack>

                <Stack mt={4}>
                        <Typography variant='h6'>Subtotal $ {totalAmount}</Typography>
                        <Typography variant='body2' color={'text.primary'} fontWeight={300}>Total items in cart {totalItems}</Typography>
                        <Typography color={'text.secondary'}>Shipping and taxes calculated at checkout</Typography>
                </Stack>

                <Button disabled={!selectedAddress || !paymentMethod} onClick={handleOrder} variant='contained' sx={{height:'3rem'}}>Pay and Order</Button>
                {(!selectedAddress || !paymentMethod) && <Typography color={'text.secondary'}>Please select address and payment method to place an order</Typography>}
                <Button component={Link} to={"/"} variant='text'>or continue Shopping</Button>
            </Stack>

    </Stack>
    
    </>
  )
}
