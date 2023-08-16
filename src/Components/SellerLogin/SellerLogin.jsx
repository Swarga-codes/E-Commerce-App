import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SellerAuthLogo from '../../assets/shopkeeperauth.png'
export default function SellerLogin() {
  return (
    <section className="p-2">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2">
          <img src={SellerAuthLogo} alt="auth logo" width={100} height={100} className='m-auto'/>
            
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black text-center">Log in to your seller account</h2>
          <p className="mt-2text-sm text-gray-600 text-center">
            Don&apos;t have an account?{' '}
            <Link
              to={"/seller/register"}
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Start selling with us
            </Link>
          </p>
          <form className="mt-8">
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
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Log In <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
              <p className="mt-2text-sm text-gray-600 ">
              Are you a customer?{' '}
              <Link
                to={"/users/login"}
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Login here
              </Link>
            </p>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  )
}