import React from 'react'

function Products({details}) {
  return (
    <div className="mx-auto flex max-w-xs items-center px-2 py-10">
    <div className="rounded-md border shadow-lg">
      <img
        src={details.image}
        alt="no preview"
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] px-2"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {details.title}
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          {details.description}
        </p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[16px] font-semibold text-gray-900">
            #{details.category}
          </span>
        
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <span className="block text-sm font-semibold">Colors : </span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
        </div>
        <div className="mt-5 flex items-center space-x-2">
          <span className="block text-3xl font-semibold">${details.price}</span>
        
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add to Cart
        </button>
      </div>
    </div>
    </div>
   
  )
}

export default Products