import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {ITEMS_PER_PAGE } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import {getAllBrandsAsync, getAllCateoriesAsync, getProductsByFiltersAsync } from '../../products/ProductSlice'
import { Navbar } from '../../navbar'
import { ProductCard, ProductFilter, ProductPagination, SortDropdown } from '../../products'
import { Link} from 'react-router-dom'

export const AdminProductHome = () => {

    const dispatch=useDispatch()

    const [sort,setSort]=useState({})
    const [filter,setFilter]=useState([])
    const [page,setPage]=useState(1)

    const handleFilter=(e,section,option)=>{
      const existingFilter={...filter}
  
      if(e.target.checked){
        if(existingFilter[section]?.length===0){
          existingFilter[section].push(section)
        }
        else{
          existingFilter[section]=[option]
        }
      }
      else{
        const index=existingFilter[section]?.findIndex(el=>el===option)
        existingFilter[section].splice(index,1)
      }
      setFilter(existingFilter)
      dispatch(getProductsByFiltersAsync(filter,existingFilter));
    }

    const handleSort=(option)=>{
      console.log(option)
      const newSort={_sort:option.sort,_order:option.order}
      setSort(newSort)
    }

    const products=useSelector((state)=>state.ProductSlice.products)
    const totalItems=useSelector((state)=>state.ProductSlice.totalItems)
    const Brands=useSelector((state)=>state.ProductSlice.Brands)
    const Categories=useSelector((state)=>state.ProductSlice.Categories)

    useEffect(()=>{
      console.log("dispatched")

      const pagination={_page:page,_limit:ITEMS_PER_PAGE}

      dispatch(getProductsByFiltersAsync({filter,sort,pagination}))
    },[sort,filter,page,dispatch])

    useEffect(()=>{
      dispatch(getAllBrandsAsync())
      dispatch(getAllCateoriesAsync())
    },[])

    useEffect(()=>{
      setPage(1)
    },[totalItems,sort])

  return (

    <>
    <Navbar/>
    <Stack justifyContent={'center'} alignItems={'center'}>

        <Stack mt={5} width={"80vw"} justifyContent={'flex-start'} alignItems={'flex-start'} flexDirection={'row'}>

            {/* PRODUCT FILTERS ✅*/}
            <Stack flex={'20%'}  justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} p={2}>

                    {/* heading */}
                    <Typography variant='h4' fontWeight={400}>New Arrivals</Typography>

                    {/* trendingg options filters */}
                    <Stack spacing={2} mt={2} width={'100%'} p={2}>
                        <Typography sx={{cursor:"pointer"}}>Totes</Typography>
                        <Typography sx={{cursor:"pointer"}}>Backpacks</Typography>
                        <Typography sx={{cursor:"pointer"}}>Travel Bags</Typography>
                        <Typography sx={{cursor:"pointer"}}>Laptop Sleeves</Typography>

                        {/* Product filters rendering here---- */}
                        <Stack >
                            <ProductFilter title={'Brand'} handleFilter={handleFilter} value={Brands}/>
                            <ProductFilter title={'Category'} handleFilter={handleFilter} value={Categories}/>
                        </Stack>
                    </Stack>
            </Stack>

            {/* PRODUCT DISPLAY AND DROPDOWN */}
            <Stack flex={'80%'}>
                

                <Box alignSelf={'flex-end'} pr={2}>
                <Button component={Link} to='/admin/product-form' variant='contained' color='success' sx={{mr:"1rem"}}>Add new Product</Button>
                  <SortDropdown handleSort={handleSort}/>
                </Box>

                {/* product display LIST */}
                <Grid  container columns={4} justifyContent={'flex-start'} alignContent={'flex-start'}>
                  {products && products.map((product)=>(<Grid item key={product.id}>
                    <>
                    <ProductCard product={product}/>
                    {product.deleted && <Typography color={'red'}>product deleted</Typography>}
                    <Button sx={{marginLeft:"1rem"}} component={Link} to={`/admin/product-form/edit/${product._id}`} variant='contained'>Edit</Button>
                    </>
                    </Grid>))}
                </Grid> 
                
                {/* PAGINATION ---- */}
                <Box alignSelf={'flex-end'} pr={2}>
                  <ProductPagination page={page} totalItems={totalItems} handlePagination={(page)=>setPage(page)}/>
                </Box>   
            </Stack>
            
        </Stack>

    </Stack>
    </>
  )
}


