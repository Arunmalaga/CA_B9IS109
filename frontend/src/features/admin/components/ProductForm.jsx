
import {Button,Paper,Stack,TextField,Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, getProductByIdAsync, selectSelectedProduct, updateProductByIdAsync } from '../../products/ProductSlice'
import { Navigate, useParams } from 'react-router-dom'

export const ProductForm = () => {


    const {id}=useParams()

    const dispatch=useDispatch()

    const handleDelete=()=>{
        const product={...selectedProduct,['deleted']:true}
        dispatch(updateProductByIdAsync(product))
    }

    const Brands=useSelector((state)=>state.ProductSlice.Brands)
    const Categories=useSelector((state)=>state.ProductSlice.Categories)
    const {register,handleSubmit,watch,reset,setValue,formState : {errors}}=useForm()

    const selectedProduct=useSelector(selectSelectedProduct)
    console.log(selectedProduct)

    useEffect(()=>{
        if(id){
            dispatch(getProductByIdAsync(id))
        }
    },[id])

    useEffect(()=>{
        if(selectedProduct && id){
            setValue("title",selectedProduct.title)
            setValue("description",selectedProduct.description)
            setValue("price",selectedProduct.price)
            setValue("rating",selectedProduct.rating)
            setValue("discountPercentage",selectedProduct.discountPercentage)
            setValue("thumbnail",selectedProduct.thumbnail)
            setValue("stock",selectedProduct.stock)
            setValue("image1",selectedProduct.images[0])
            setValue("image2",selectedProduct.images[1])
            setValue("image3",selectedProduct.images[2])
            setValue("brand",selectedProduct.brand)
            setValue("category",selectedProduct.category)
        }
    },[selectedProduct])

  return (
    <Stack component={Paper} elevation={4} sx={{width:"70vw",mt:4,marginRight:'auto',marginLeft:"auto"}}>
        
    <Stack spacing={4}  p={2} noValidate component={'form'} onSubmit={handleSubmit((data)=>{
        const product={...data,images:[data.image1,data.image2,data.image3,data.thumbnail]}
        delete product['image1']
        delete product['image2']
        delete product['image3']

        product.price=+product.price
        product.stock=+product.stock
        product.discountPercentage=+product.discountPercentage


        if(id){
            product.rating=product.rating || 0
            product._id=selectedProduct._id
            dispatch(updateProductByIdAsync(product))
            dispatch(clearSelectedProduct())
            reset()
        }
        else{
            dispatch(createProductAsync(product))
            dispatch(clearSelectedProduct())
            reset()
        }

        reset()
    })}>
        <Typography variant='h5' fontWeight={300}>Add Product</Typography>
        <Stack>
            <Typography>Product name</Typography>
            <TextField {...register("title",{required:'name is required'})}/>
        </Stack>
  
        <Stack>
            <Typography >Description</Typography>
            <TextField {...register("description",{required:'description is required'})}/>
        </Stack>
        
        <Stack>
            <Typography>Brand</Typography>
            <select style={{padding:"1rem",fontSize:"1.1rem",fontFamily:"Roboto, sans-serif"}}  {...register("brand",{required:'brand is required'})}  >
                <option selected disabled value="select"></option>
                {
                    Brands.map((brand)=><option value={brand.value}><Typography sx={{fontWeight:100}}>{brand.label}</Typography></option>)
                }
            </select>
        </Stack>

        <Stack>
            <Typography gutterBottom>Category</Typography>
            <select style={{padding:"1rem",fontSize:"1.1rem",fontFamily:"Roboto, sans-serif"}} {...register("category",{required:'category is required'})} >
                <option selected disabled value="select"></option>
                {
                    Categories.map((brand)=><option value={brand.value}><Typography sx={{fontWeight:100}}>{brand.label}</Typography></option>)
                }
            </select>
        </Stack>

        <Stack flexDirection={'row'} width={'100%'} justifyContent={'space-around'} alignItems={'center'}>
                
                <Stack width={'100%'}>
                    <Typography>Price</Typography>
                    <TextField {...register("price",{required:'price is required'})}/>
                </Stack>

                <Stack width={'100%'}>
                    <Typography >Discount Percentage</Typography>
                    <TextField {...register("discountPercentage",{required:'discount is required'})}/>
                </Stack>

                <Stack width={'100%'}>
                    <Typography>Stock</Typography>
                    <TextField {...register("stock",{required:'stock is required'})}/>
                </Stack>

        </Stack>

        <Stack>
            <Typography>Thumbnail</Typography>
            <TextField {...register("thumbnail",{required:'thumbnail is required'})}/>
        </Stack>
        <Stack>
            <Typography>Image 1</Typography>
            <TextField {...register("image1",{required:'image 1 is required'})}/>
        </Stack>
        <Stack>
            <Typography>Image 2</Typography>
            <TextField {...register("image2",{required:'image 2 is required'})}/>
        </Stack>
        <Stack>
            <Typography>Image 3</Typography>
            <TextField {...register("image3",{required:'image 3 is required'})}/>
        </Stack>
        
        <Stack flexDirection={'row'} >
        
        <Button fullWidth type='submit' variant='contained'>{id?'Save Changes':"Add product"}</Button>

        {id && <Button onClick={handleDelete} fullWidth color='error' variant='contained'>Delete</Button>}

        </Stack>
        
    </Stack>





    </Stack>
  )
}
