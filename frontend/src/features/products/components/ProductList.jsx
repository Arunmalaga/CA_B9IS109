import { Box, Grid, Pagination, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import {ITEMS_PER_PAGE } from '../../../constants'
import { ProductFilter } from './ProductFilter'
import { useDispatch, useSelector } from 'react-redux'
import {filterProducts, getAllBrandsAsync, getAllCateoriesAsync, getProductsByFiltersAsync } from '../ProductSlice'
import { SortDropdown } from './SortDropDown'
import { ProductPagination } from './ProductPagination'
import Carousel from './Carousel'

export const ProductList = () => {

    const dispatch=useDispatch()

    const theme=useTheme()

    const is900=useMediaQuery(theme.breakpoints.down('900'))

    const [sort,setSort]=useState({})
    const [filter,setFilter]=useState([])
    const [page,setPage]=useState(1)



    const [searchValue,setSearchValue]=useState('')

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
      // dispatch(getProductsByFiltersAsync(filter,existingFilter));
    }

    const handleSort=(option)=>{
      console.log(option)
      const newSort={_sort:option.sort,_order:option.order}
      setSort(newSort)
    }

    let products=useSelector((state)=>state.ProductSlice.products)
    let filteredProducts=useSelector((state)=>state.ProductSlice.filteredProducts)
    const totalItems=useSelector((state)=>state.ProductSlice.totalItems)
    const Brands=useSelector((state)=>state.ProductSlice.Brands)
    const Categories=useSelector((state)=>state.ProductSlice.Categories)

    useEffect(()=>{
      const pagination={_page:page,_limit:ITEMS_PER_PAGE}

      dispatch(getProductsByFiltersAsync({filter,sort,pagination}))
    },[sort,filter,page])


    useEffect(()=>{
      console.log('running')
      dispatch(filterProducts(searchValue))
    },[searchValue])

    useEffect(()=>{
      dispatch(getAllBrandsAsync())
      dispatch(getAllCateoriesAsync())
    },[])

    useEffect(()=>{
      setPage(1)
    },[totalItems,sort])


  return (

    <>

     {
     products && Brands && Categories && <Stack justifyContent={'center'} alignItems={'center'}>

        {/* <Carousel items={demoBanners} autoPlayInterval={5000} /> */}
        <Stack mt={5} width={is900?'95vw':"80vw"} justifyContent={'flex-start'} alignItems={'flex-start'} flexDirection={'row'}>


            {/* PRODUCT FILTERS ✅*/}
            {
              is900?(""):<Stack flex={'20%'}  justifyContent={'flex-start'} alignItems={'flex-start'} width={'100%'} p={2}>

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
            }


            {/* PRODUCT DISPLAY AND DROPDOWN */}
            <Stack flex={is900?"100%":'80%'}>

                <Box alignSelf={'flex-end'} pr={is900?0:2} mb={is900?4:0}>
                  <SortDropdown handleSort={handleSort}/>
                  <TextField placeholder='Search products' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                </Box>


                {/* product display LIST */}
                <Grid  container columns={4} justifyContent={'center'} alignContent={'center'}>
                  {
                    searchValue===''?
                    (products && products.map((product)=>(
                    <Grid justifyContent={'center'} alignContent={'center'} item key={product.id}><ProductCard product={product}/></Grid>))
                    ):(
                      filteredProducts.length!==0?(filteredProducts && filteredProducts.map((product)=>(
                      <Grid item key={product.id}><ProductCard product={product}/></Grid>))
                      ):(
                        <Typography>No Search Results😓</Typography>
                      )
                    )
                  }

                </Grid> 
                
                {/* PAGINATION ---- */}
                <Box alignSelf={'flex-end'} pr={2}>
                  <ProductPagination page={page} totalItems={totalItems} handlePagination={(page)=>setPage(page)}/>
                </Box>   
            </Stack>
            
        </Stack>

    </Stack>
}
    </>
  )
}


