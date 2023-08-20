import React from 'react'
import SellerNavbar from '../SellerNavbar/SellerNavbar'

function CreateProducts() {
  return (
    <>
    <div className="CreateProducts flex">
    <SellerNavbar/>
    <div className="CreateProductsContainer p-6 ml-80">
    <h1 className='text-3xl font-bold'>Create a New Product.</h1>
    <form>
    <div className="w-full mt-6">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="name"
      >
        Name
      </label>
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Enter your name"
        id="name"
        required
      ></input>
    </div>
    <div className="w-full mt-6">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor="description"
    >
      Description
    </label>
    <textarea
      className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      type="text"
      placeholder="Enter your product description"
      id="description"
      cols={80} rows={10}/>
  </div>
  <div className="w-full mt-6">
  <label
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    htmlFor="category"
  >
    Category
  </label>
  <input
    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    type="text"
    placeholder="Enter the category"
    id="category"
    required
  ></input>
</div>
<div className="w-full mt-6">
<label
  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  htmlFor="price"
>
  Price
</label>
<input
  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  type="number"
  placeholder="Enter the price"
  id="price"
  required
></input>
</div>
<div className="w-full mt-6">
<label
  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  htmlFor="discount_price"
>
  Discounted Price
</label>
<input
  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  type="number"
  placeholder="Enter the discounted price"
  id="discount_price"
></input>
</div>
<div className="w-full mt-6">
<label
  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  htmlFor="quantity"
>
 Quantity
</label>
<input
  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  type="number"
  placeholder="Enter the quantity"
  id="quantity"
  required
></input>
</div>
<button
type="submit"
class="rounded-md bg-black mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
>
Create Product
</button>
    </form>
    </div>
    </div>
   
    
    </>
  )
}

export default CreateProducts