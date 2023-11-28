import React from 'react'
import { Navbar } from '../features/navbar'
import { ProductCard, ProductList } from '../features/products'

export const HomePage = () => {
  return (
    <>
    <Navbar/>
    <ProductList/>
    </>
  )
}
