import React from 'react'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <div className='ErrorPage text-center flex flex-col justify-center items-center h-[100vh]'>
    <h1 className='font-bold text-9xl'>404</h1>
    <h2 className='font-bold text-3xl my-5'>The requested page is not found.</h2>
    <Link to='/'><span className='underline text-lg'>Get Back to Home Page?</span></Link>
    </div>
  )
}

export default ErrorPage