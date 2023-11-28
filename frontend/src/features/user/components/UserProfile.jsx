import { Button, Divider, FormHelperText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, updateUserAsync } from '../UserSlice'
import { useForm } from 'react-hook-form'


export const UserProfile = () => {
  
  const [selectedEditIndex,setSelectedEditIndex]=useState(-1)
  const [showAddressForm,setShowAddressForm]=useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState : {errors}}=useForm()

  const user=useSelector(selectUserInfo)
  const dispatch=useDispatch()

  const handleEdit=(addressUpdate,index)=>{
    const newUser={...user,addresses:[...user.addresses]};
    newUser.addresses.splice(index,1,addressUpdate)
    dispatch(updateUserAsync(newUser))
  }
  const handleRemove=(index)=>{
    const newUser={...user,addresses:[...user.addresses]}
    newUser.addresses.splice(index,1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEditForm=(index)=>{
    setSelectedEditIndex(index)
    setValue("name",user.addresses[index].name)
    setValue("email",user.addresses[index].email)
    setValue("phone",user.addresses[index].phone)
    setValue("street",user.addresses[index].street)
    setValue("city",user.addresses[index].city)
    setValue("state",user.addresses[index].state)
    setValue("postalCode",user.addresses[index].postalCode)
  }

  const handleAdd=(address)=>{
    const newUser={...user,addresses:[...user.addresses,address]}
    dispatch(updateUserAsync(newUser))
    setShowAddressForm(false)
  }


  return (
    <>
    {user && 
    <Stack padding={'0rem 4vw'} mt={5} mr={'auto'} ml={'auto'} spacing={2}>

    <Typography variant='h4'>
      {user.name}'s Profile😃
    </Typography>
    
    <Typography>Name -{user.name}</Typography>
    <Typography>Email - {user.email}</Typography>
    {
      user.role==='admin' && <Typography variant='h6'>Role - {user.role}</Typography>
    }


    <Stack>
          {
            showAddressForm &&  <Stack  component="form" noValidate method='patch' onSubmit={handleSubmit((data)=>
            {
              try {
                handleAdd(data)
                reset()
                
              } catch (error) {
                console.log(error)
              }
            }
            )}
      
              bgcolor={'white'} height={'100%'} mt={10} mb={10} boxShadow={'0 0 1rem 1px rgba(0,0,0,0.05)'}  p={2} spacing={5}>
      
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
                        <Button onClick={()=>setShowAddressForm(false)} variant='outlined'>Cancel</Button>
                        <Button type='submit' variant='contained'>Add Address</Button>
                    </Stack>
            </Stack>
          }
      <Typography gutterBottom variant='h6'>Your Addresses</Typography>
      <Button sx={{mb:3}} onClick={()=>{setSelectedEditIndex(-1);setShowAddressForm(!showAddressForm);}} variant='contained'>Add Address</Button>
        {
          !user.addresses.length?(
            <>
            {/* <Typography>no address availabe, please add one</Typography>
            <Button variant='contained'>Add Address</Button> */}
            </>
          ):(
          user.addresses.map((item,index)=>(
            <>
            {/* FORM */}
            {selectedEditIndex===index && <Stack  component="form" noValidate method='patch' onSubmit={handleSubmit((data)=>
            {
              try {
                console.log('sending data from frontend',user)
                handleEdit(data,index)
                setSelectedEditIndex(-1)
                reset()
                
              } catch (error) {
                console.log(error)
              }
            }
            )}
              bgcolor={'white'} height={'100%'} mt={10} mb={10} boxShadow={'0 0 1rem 1px rgba(0,0,0,0.05)'} p={2} spacing={5}>
      
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
                        <Button onClick={()=>setSelectedEditIndex(-1)} variant='outlined'>Cancel</Button>
                        <Button type='submit' variant='contained'>Save Changes</Button>
                    </Stack>
            </Stack>
            
            }
            
            
            <Stack mt={1} flexDirection={'row'} p={2}  component={Paper} elevation={6} justifyContent={'space-between'}>
                        <Stack>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.street}</Typography>
                            <Typography>{item.postalCode}</Typography>
                        </Stack>
                        <Stack>
                            <Typography>Phone {item.phone}</Typography>
                            <Typography>{item.state}</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Button onClick={()=>handleEditForm(index)} variant='outlined'>Edit</Button>
                            <Button onClick={()=>handleRemove(index)} variant='outlined'>Remove</Button>
                        </Stack>
                    </Stack>
                    </>
          )))            
        }
    </Stack>
    </Stack>}
    </>
  )
}
