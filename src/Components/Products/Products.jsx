import React from 'react'
import LimitPara from '../../util/LimitPara'
import { useSelector,useDispatch } from 'react-redux'
import { actions } from '../../util/Store'
import ProductDetails from '../ProductDetails/ProductDetails'
import { fetchGET, fetchPOSTPUT } from '../../util/useFetch'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function Products({details,idx}) {
 const navigator=useNavigate()
 const cart=useSelector(state=>state.cart)
 const dispatch=useDispatch()
 const addToCart=async()=>{
  const updateCart=await fetchPOSTPUT('/products/addToCart','PATCH','user_token',{productId:details._id})
  console.log(updateCart)
 
  if(updateCart.message=="Token has expired, Please login"){
    navigator('/users/login')
    toast.error(updateCart.message)
   
  }
  if(!updateCart.error){
    const updatedCart=JSON.parse(localStorage.getItem('user_data'))
    updatedCart?.cartItems.push(details._id)
    localStorage.setItem('user_data',JSON.stringify(updatedCart))
    toast.success(updateCart.message)
  }
 
  dispatch(actions.addToCart(details))
 }
 const removeFromCart=async()=>{
  const removeFromCart=await fetchPOSTPUT('/products/removeFromCart','PATCH','user_token',{productId:details._id})
  console.log(removeFromCart)
  if(removeFromCart.message=="Token has expired, Please login"){
    return navigator('/users/login')
  }
  if(removeFromCart.message){
    let updatedCart = JSON.parse(localStorage.getItem('user_data'));
    updatedCart.cartItems = updatedCart?.cartItems?.filter(item => item !== details._id);
    localStorage.setItem('user_data', JSON.stringify(updatedCart));

  }
   dispatch(actions.removeFromCart(details))
 }
 
  return (
    <>
    <div className="m-0 mr-5 flex-shrink-0 flex-grow max-w-xs items-center px-2 py-10" style={{'overflowWrap':'anywhere'}}>
    <div className="rounded-md border shadow-lg">
      <img
        src={details?.image}
        alt="no preview"
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] px-2"
        onClick={()=>navigator(`product/details/${details?._id}`)}/>
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold" onClick={()=>navigator(`product/details/${details?._id}`)}>
          {details?.title}
        </h1>
        <p className="mt-3 text-sm text-gray-600" onClick={()=>navigator(`product/details/${details?._id}`)}>
          {LimitPara(details?.description,20)}
        </p>
        <div className="mt-4" onClick={()=>navigator(`product/details/${details?._id}`)}>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[16px] font-semibold text-gray-900">
            #{details?.category}
          </span>
        
        </div>
        <div className="mt-3 flex items-center space-x-2" onClick={()=>navigator(`product/details/${details?._id}`)}>
         
{/*<div class="flex items-center">
<svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
</svg>
<p class="ml-2 text-sm font-bold text-gray-900 dark:text-black">{details?.rating?.rate}</p>
<span class="w-1 h-1 mx-1.5 bg-black rounded-full dark:text-black"></span>
<a class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-black">{details?.rating?.count} reviews</a>
  </div>*/}

        </div>
        <div className="mt-5 flex items-center space-x-2">
          <span className="block text-3xl font-semibold">${details?.price}</span>
        
        </div>
        {/*{!cart.find(obj=>obj.title===details.title)?*/}
          {!(JSON.parse(localStorage.getItem('user_data'))?.cartItems)?.includes(details?._id)?
       details?.quantity > 0?
          <button
        type="button"
        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      onClick={addToCart}
        >
        Add to Cart
      </button>
      :
   <p className='text-lg text-red-600 font-bold text-center'>Out of Stock</p>
       :
       <button
       type="button"
       className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
     onClick={()=>removeFromCart()}
       >
       Remove from Cart
     </button>
      }
      </div>
    </div>
 
    </div>
    
   </>
  )
}

export default Products