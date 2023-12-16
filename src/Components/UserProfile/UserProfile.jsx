import React, { useRef, useState } from 'react'
import ProfilePic from '../../assets/profilepic.png'
import { InputComponent } from './InputComponent'
function UserProfile() {
    const imageInput=useRef()
    const[image,setImage]=useState(JSON.parse(localStorage.getItem('user_data'))?.profilePic)
    const[isChanged,setIsChanged]=useState(false)
    const loadFile = (e) => {
      let output = document.getElementById("output");
      output.src = URL.createObjectURL(e.target.files[0]);
      output.onload = () => {
        URL.revokeObjectURL(output.src);
      };
    };
  return (
    <div className='UserProfile px-4 py-2 mx-auto'>
    <h1 className='text-3xl font-bold mt-10'>Account Settings</h1>
    <div className="ProfileContainer flex align-center mt-10">
    <div className="ProfileImage my-auto cursor-pointer">
    <input type="file"  accept='image/*' className='hidden' ref={imageInput} onChange={(e)=>{
      loadFile(e)
      setIsChanged(true)
      setImage(e.target.files[0])
    }}/>
    <img src={JSON.parse(localStorage.getItem('user_data'))?.profilePic} id="output" alt="no_prev"  className='w-72 mb-20' onClick={()=>imageInput.current.click()}/>

  
   
    </div>
    <div className="ProfileData ml-20 w-full">
    <InputComponent image={image} changed={isChanged}/>
    </div>
    </div>
    </div>
  )
}

export default UserProfile