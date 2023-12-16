import React, { useRef, useState } from 'react'
import ProfilePic from '../../assets/profilepic.png'
import { SellerInputComponent } from './SellerInputComponent'
import SellerNavbar from '../SellerNavbar/SellerNavbar'
function SellerProfile() {
    const imageInput=useRef()
    const[image,setImage]=useState(JSON.parse(localStorage.getItem('seller_details'))?.profilePic)
  return (
    <div className='SellerProfile flex'>
    <SellerNavbar/>
    <div className='px-4 py-2 mx-auto'>
    <h1 className='text-3xl font-bold mt-10'>Account Settings</h1>
    <div className="ProfileContainer flex align-center mt-10">
    <div className="ProfileImage my-auto cursor-pointer">
    <img src={image?image:ProfilePic} alt=""  className='w-72 mb-20' onClick={()=>imageInput.current.click()}/>
    <input type="file"  accept='image/*' className='hidden' ref={imageInput}/>
    </div>
    <div className="ProfileData ml-20 w-full">
    <SellerInputComponent image={image}/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default SellerProfile