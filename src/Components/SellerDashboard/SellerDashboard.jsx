import { useEffect, useState } from 'react'
import SellerNavbar from '../SellerNavbar/SellerNavbar'
import dateFormatter from '../../util/dateFormatter'
function SellerDashboard() {
  const [orders,setOrders]=useState([])
  async function getSellerOrders(){
    const response=await fetch('http://localhost:5000/api/sellers/orders',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('seller_token')
      }
    })
    const data=await response.json()
    setOrders(data)
    console.log(data)
  }
  function addressFormatter(address){
    return address?.streetName+", "+address?.city+", "+address?.state+", "+address?.country+", "+address?.postalCode
  }
  useEffect(()=>{
getSellerOrders()
  },[])
  return (
    <>
    <div className="Seller_Dashboard flex">
    <SellerNavbar/>
    <div className='ml-80 p-6'>
    <h1 className="text-3xl font-bold">Dashboard.</h1>
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-lg font-semibold text-black">My Orders</h2>
        <p className="mt-1 text-sm text-gray-700">
          Below is a list of items ordered by you that are delivered already or yet to be delivered.
        </p>
      </div>
      <div>
       {/* <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add new employee
    </button>*/}
      </div>
    </div>
    <div className="mt-6 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span>Order Item</span>
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Sold By
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                     Delivery Address
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Ordered On
                  </th>
                  <th scope="col" className="relative px-4 py-3.5">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {orders.length===0 && <h2 className='p-10 text-xl'>No Order History!</h2>}
               
    {orders?.map(order=>(

   
              <>
                 <tr className="border-t border-gray-200">
                  <th
                    colSpan="5"
                    scope="col"
                    className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500"
                  >
                    Order ID : {"ORDER"+order._id}
                  </th>
                  <th
                  colSpan="5"
                  scope="col"
                  className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-medium text-gray-500 float-right"
                >
                <button
                type="button"
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
               
                >
               Complete Order
              </button>
                </th>
                
                </tr>
             
 { order?.orderItems?.filter(item=>item.createdBy===JSON.parse(localStorage.getItem('seller_details'))?.id)?.map((item,idx)=>(

 
              <tr>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={item?.image}
                          alt="no_product_image"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 ">
                          {item?.title}
                        </div>
                        {/*<div className="text-sm text-gray-500">john@devui.com</div>*/}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-12 py-4">
                    <div className="text-sm text-gray-900">{order?.sellersID[idx]?.shopName}</div>
                    {/*<div className="text-sm text-gray-500">Engineering</div>*/}
                  </td>
                 
                
                    <td className="whitespace-nowrap px-4 py-4">
                    <div className="text-sm text-gray-900">{addressFormatter(order?.address)}</div>
                  </td>
                 
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 font-bold">
                    {dateFormatter(order?.createdAt)}
                  </td>
                  {/*<td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                    <a href="#" className="text-gray-500">
                      Edit
                    </a>
  </td>*/}
                </tr>
               
                ))}
                </>
              
                ))}
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
 
  </section>
    </div>
    </div>
    </>
  )
}

export default SellerDashboard