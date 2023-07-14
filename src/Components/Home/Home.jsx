import React, { useEffect, useState } from 'react'
import Products from '../Products/Products'

function Home() {

  const[products,setProducts]=useState([])
  const fetchProducts=async()=>{
    const response=await fetch('https://fakestoreapi.com/products')
    const data=await response.json()
    console.log(data)
    setProducts(data)
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div className='mx-auto max-w-12xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 mt-5'>
    <h1 className='font-bold text-2xl mx-10'>Products</h1> 
    <div className='flex flex-wrap'>
    {products?.map((pro,idx)=>(
 
      <Products details={pro} key={pro.id} idx={idx}/>

    ))
    
    }

    </div>
    </div>
  )
}

export default Home