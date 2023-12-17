'use client'

import React, { useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Dropdown from './Dropdown'
import { useLocation } from 'react-router-dom'
import layoutException from '../../util/layoutException'
export default function Navbar() {
  const counter=useSelector(state=>state.cart)

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [searchQuery,setSearchQuery]= React.useState("");
  const [productData,setProductData]= React.useState([])
  const navigator=useNavigate()
 const location=useLocation()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  async function getProducts() {
    const response=await fetch('http://localhost:5000/api/products/display')
    const data=await response.json()
    setProductData(data)
    console.log(data)
   
  }
  function getSearchResults(searchQuery){
    const searchResults=productData.filter(item=>item?.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    return searchResults
  }
if(layoutException.includes(location.pathname)) {
return null
}
useEffect(()=>{
getProducts()
},[])
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to='/'><div className="inline-flex items-center space-x-2">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
        
          </span>
          <span className="font-bold text-2xl">MyShop.</span>
        </div>
        </Link>
        <div className="flex m-auto md:w-[250px]">
        <input
          className="w-full h-10 rounded-md border-2 border-black bg-gray-100 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-30 disabled:opacity-50"
          type="text"
          placeholder="Search for products..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // console.log(e.target.value);
          }}
        />
        {searchQuery && (
          <div className="fixed w-[250px] mt-12 z-30 border-solid border-2 rounded-xl shadow-md p-4 bg-white">
            {getSearchResults(searchQuery).length > 0 ? (
              getSearchResults(searchQuery)?.map((result) => (
                <div
                className='flex mt-4'
                  key={result._id}
                  onClick={() => {
                    navigator(`/product/details/${result._id}`);
                    setSearchQuery("");
                  }}
                >
                <img src={result?.image} alt="no_prev" className='w-16 h-16 rounded-md'/>
                <div className='ml-2'>
                  <h1>
                    <b>{result?.title}</b>
                  </h1>
                  <p className="text-sm mt-1 mb-2">
                    ${result?.discountedPrice}
                  </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-semibold">No results found.</p>
            )}
          </div>
        )}
      </div>
      
        <div className='mr-5 flex ml-auto'>
       
        {localStorage.getItem('user_token') &&
          <Link to='/cart'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      </Link>}
      <span>{JSON.parse(localStorage.getItem('user_data'))?.cartItems?.length}</span>
        </div>
        {localStorage.getItem('user_token')?
          <Dropdown/>
        :
        <div className="hidden lg:block ml-3">
        <Link to='/users/login'>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Login
          </button>
          </Link>
        </div>
  }
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                  <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
        
          </span>
                    <span className="font-bold">MyShop.</span>
                  </div>
          
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className='flex mt-3'>
                <Link to='/cart'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              </Link>
              <Link to='/cart'><span>{counter.length}<b>&nbsp;&nbsp;My Cart</b></span></Link>
              </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                 Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
