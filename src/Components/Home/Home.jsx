import React, { useEffect, useState } from 'react'
import Products from '../Products/Products'
import fetchProducts from '../../util/useFetch'
function Home() {
  const[products,setProducts]=useState([])
  
  useEffect(()=>{
   async function getProducts(){
    setProducts(await fetchProducts('/products/display'))
   }
   getProducts()
  
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