import React, { useEffect, useState } from 'react'
import SellerNavbar from '../SellerNavbar/SellerNavbar'
import { ProductCard } from './ProductCard'

function MyProducts() {
    const [productData,setProductData]=useState([])
    const fetchMyProducts=async()=>{
        const response=await fetch('http://localhost:5000/api/products/myProducts',
        {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('seller_token')
            }
        })
        const data=await response.json()
        setProductData(data)
        console.log(data)
    }
    useEffect(()=>{
        fetchMyProducts()
    },[])
  return (
    <div className="My_Products flex">
    <SellerNavbar/>
    <div className='ml-80 p-6'>
    <h1 className="text-3xl font-bold">My Products.</h1>
    {productData?.map(product=>
    <ProductCard product={product}/>
    )
    }
    </div>
    </div>
  )
}

export default MyProducts