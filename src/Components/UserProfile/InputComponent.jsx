import React, { useState,useEffect } from 'react'
import { fetchPOSTPUT } from '../../util/useFetch'
import toast from 'react-hot-toast'
import { Ring } from '@uiball/loaders'
export function InputComponent({image,changed}) {
    const userData=JSON.parse(localStorage.getItem('user_data'))
    const [name,setName]=useState(userData?.name)
    const [email,setEmail]=useState(userData?.email)
    const [phoneNumber,setPhoneNumber]=useState(userData?.phoneNumber)
    const [streetName,setStreetName]=useState(userData?.address?.streetName)
    const [city,setCity]=useState(userData?.address?.city)
    const [state,setState]=useState(userData?.address?.state)
    const [country,setCountry]=useState(userData?.address?.country)
    const [postalCode,setPostalCode]=useState(userData?.address?.postalCode)
    const [loader,setLoader]=useState(false)
    const [hostedUrl,setHostedUrl]=useState("")
    let body={
        email,
        name,
        phoneNumber,
        address:{
            streetName:streetName?streetName:userData?.address?.streetName,
            city:city?city:userData?.address?.city,
            state:state?state:userData?.address?.state,
            country:country?country:userData?.address?.country,
            postalCode:postalCode?postalCode:userData?.address?.postalCode
        },
        profilePic:hostedUrl?hostedUrl:JSON.parse(localStorage.getItem('user_data'))?.profilePic
    }

//     async function updateUser(){
//         setUpdate(await fetchPOSTPUT('/users/updateUser','PATCH','user_token',body))
        
// }

const updateUser=async()=>{
const response=await fetch('http://localhost:5000/api/users/updateUser',{
    method:'PATCH',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+localStorage.getItem('user_token')
        },
        body:JSON.stringify(
          body
        )
      })
      const data=await response.json()
      
      if(!data.error){
        toast.success(data.message)
        localStorage.setItem('user_data',JSON.stringify(data.userData))

      }
      else{
        toast.error(data.error)
      }
      setLoader(false)
}
function sendImageToCloudinary() {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "e_commerce_app");
  data.append("cloud_name", "markus0509");
  fetch("https://api.cloudinary.com/v1_1/markus0509/image/upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      setHostedUrl(data.url);
    })
    .catch((err) => console.log(err));
}
useEffect(()=>{
  if(hostedUrl){
updateUser()
  }
},[hostedUrl])

  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        setLoader(true)
        if(!changed){
      updateUser()
        }
        else{
          sendImageToCloudinary()
        }
}}>
    <div className="border-b border-gray-900/10 pb-12">
    <p className="mt-1 text-sm leading-6 text-gray-600 font-semibold">Note: Your data will only be updated when you click the update button.</p>
    
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
          Full Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="first-name"
            id="first-name"
            value={name}
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          onChange={(e)=>setName(e.target.value)}
            />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="last-name"
            id="last-name"
            value={phoneNumber}
            autoComplete="family-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            onChange={(e)=>setPhoneNumber(e.target.value)}
            />
        </div>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
          Street address
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="street-address"
            id="street-address"
            value={streetName}
            autoComplete="street-address"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            onChange={(e)=>setStreetName(e.target.value)}
            />
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
          City
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            autoComplete="address-level2"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            onChange={(e)=>setCity(e.target.value)}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
          State / Province
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="region"
            id="region"
            value={state}
            autoComplete="address-level1"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            onChange={(e)=>setState(e.target.value)}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
        Country
      </label>
      <div className="mt-2">
        <input
          id="country"
          name="country"
          value={country}
          autoComplete="country-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6"
          onChange={(e)=>setCountry(e.target.value)}
          />
          
      </div>
    </div>
      <div className="sm:col-span-2">
        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
          ZIP / Postal code
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="postal-code"
            id="postal-code"
            value={postalCode}
            autoComplete="postal-code"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            onChange={(e)=>setPostalCode(e.target.value)}
          />
        </div>
      </div>
   
    </div>
    <div className="mt-6 flex items-center justify-end gap-x-6">
   {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
      Cancel
  </button>*/}
  {!loader?
    <button
      type="submit"
      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Update
    </button>
    :
    <button
    type="submit"
    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
  <Ring 
  size={20}
  lineWeight={5}
  speed={2} 
  color="white" 
 />
  </button>
  }
  </div>
  </div>
  </form>
  )
}
