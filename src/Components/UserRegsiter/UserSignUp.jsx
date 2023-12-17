import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageLogo from '../../assets/userauthlogo.png'
import { Ring } from '@uiball/loaders'
export default function UserSignup() {
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  const userRegister=async()=>{
    const response=await fetch('http://localhost:5000/api/auth/user/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        name,
        phoneNumber,
        password
      })
    })
    const data=await response.json()
    if(data.error){
      setError(data.error)
    }
    else{
      navigate('/users/login')
    }
    setLoader(false)
  }
  return (
    <section className="p-2">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2">
          <img src={AuthPageLogo} alt="auth logo" width={100} height={100} className='m-auto'/>
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black text-center">Create a New Account</h2>
          <p className="mt-2text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link
             to={'/users/login'}
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Log In
            </Link>
          </p>
          <p className='text-center text-red-500 font-semibold'>{error}</p>
          <form className="mt-8" onSubmit={(e)=>{
            e.preventDefault();
            setLoader(true)
            userRegister();
          }}>
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    onChange={(e)=>setName(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Phone Number{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="tel"
                    placeholder="Phone Number"
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div>
                {!loader?
                  <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              :
              <button
                type='button'
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                <Ring 
      size={30}
      lineWeight={5}
      speed={2} 
      color="white" 
     />
     </button>
              }
              </div>
              <p className="mt-2text-sm text-gray-600 ">
              Want to become a seller?{' '}
              <Link
                to={"/seller/register"}
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Register here
              </Link>
            </p>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  )
}
