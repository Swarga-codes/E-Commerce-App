import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { actions } from '../../util/Store'
export default function ProductDetails({isOpen,closeModal,details,remove,add}) {
  const cart=useSelector(state=>state.cart)
  const dispatch=useDispatch()
  // const addToCart=()=>{
  //  dispatch(actions.addToCart(details))
  // }
  // const removeFromCart=()=>{
  //   dispatch(actions.removeFromCart(details.title))
  // }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
            <Dialog.Panel>
                <section className="overflow-hidden bg-white px-3 rounded-2xl py-3">
      <div className="mx-auto max-w-5xl pr-5">
        <div className="mx-auto flex flex-wrap items-center">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-contain lg:h-96 lg:w-1/2"
        src={details?.image}
            />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
  <h2 className="text-sm font-semibold tracking-widest text-gray-500">#{details?.category}</h2>
            <h1 className="my-4 text-3xl font-semibold text-black text-left">{details?.title}</h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
</svg>
<p class="ml-2 text-sm font-bold text-gray-900 dark:text-black">2.5</p>
<span class="w-1 h-1 mx-1.5 bg-black rounded-full dark:text-black"></span>
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-black">10 reviews</p>
              </span>
            </div>
            <p className="leading-relaxed text-left" style={{'overflowWrap':'anywhere'}}>
              {details?.description}
            </p>
            <div className="flex items-center justify-between mt-10">
              <span className="title-font text-xl font-bold text-gray-900">${details.price}</span>
              {!JSON.parse(localStorage.getItem('user_data'))?.cartItems?.includes(details._id)?
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
             onClick={()=>add()} >
                Add to Cart
              </button>
              :
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
             onClick={()=>remove()} >
                Remove from Cart
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
    </Dialog.Panel>
                 
                
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
