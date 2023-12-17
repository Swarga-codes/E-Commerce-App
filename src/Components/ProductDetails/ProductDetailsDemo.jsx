import React from 'react'
import { useParams } from 'react-router-dom'
import { Star, ChevronDown } from 'lucide-react'
function ProductDetailsDemo() {
    const {productID}=useParams()
    const fetchProductData=async()=>{
        
    }
  return (
    <div className='ProductDetails'>
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">Nike</h2>
            <h1 className="my-4 text-3xl font-semibold text-black">Nike Air Max 21A</h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur rem amet repudiandae
              neque adipisci eum enim, natus illo inventore totam?
            </p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
          
             
            </div>
            <div className="flex items-center">
              <span className="title-font text-xl font-bold text-gray-900">$449</span>
              <span className="title-font text-xl font-bold text-gray-400 line-through ml-5">
                $599
              </span>
              <button
                type="button"
                className="ml-auto rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  


    </div>
  )
}

export default ProductDetailsDemo