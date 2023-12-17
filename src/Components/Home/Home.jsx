import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import { fetchGET } from '../../util/useFetch';
import { Ring } from '@uiball/loaders';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [products, setProducts] = useState([]);
const [loader,setLoader]=useState(true)
const [searchQuery,setSearchQuery]= React.useState("");
const navigator=useNavigate()
function getSearchResults(searchQuery){
  const searchResults=products.filter(item=>item?.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  return searchResults
}
  useEffect(() => {
    async function getProducts() {
      setProducts(await fetchGET('/products/display','GET'));
      setLoader(false)
    }
    getProducts();
  }, []);

  return (
    <div className='mx-auto max-w-12xl px-4 py-2 sm:px-6 lg:px-8 mt-5'>
    <div className="flex ml-6 mr-10 md:w-[250px]">
            <input
              className="w-full h-10 rounded-full bg-gray-100 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-30 disabled:opacity-50"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // console.log(e.target.value);
              }}
            />
            {searchQuery && (
              <div className="fixed w-[250px] mt-12 z-30 border-solid border-2 rounded-xl shadow-md p-4 bg-white">
                {getSearchResults(searchQuery).length > 0 ? (
                  getSearchResults(searchQuery)?.map((result) => (
                    <div
                    className='flex'
                      key={result._id}
                      onClick={() => {
                        navigator(`/product/details/${result._id}`);
                        setSearchQuery("");
                      }}
                    >
                    <img src={result?.image} alt="no_prev" className='w-16 h-16 rounded-md'/>
                    <div className='ml-2'>
                      <h1>
                        <b>{result?.title}</b>
                      </h1>
                      <p className="text-sm mt-1 mb-2">
                        ${result?.discountedPrice}
                      </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="font-semibold">No results found.</p>
                )}
              </div>
            )}
          </div>
      <h1 className='font-bold text-2xl mx-10 mb-4'>Products</h1>
     {loader &&
      <>
       <div className='flex justify-center mt-20'>
      <Ring 
      size={100}
      lineWeight={5}
      speed={2} 
      color="black" 
     />
     </div>
     <h1 className='text-2xl font-bold text-center mt-5'>Fetching products, please wait...</h1>
     </>
    }
      <div className='flex flex-wrap gap-4 justify-left'>
        {products?.map((pro, idx) => (
          <Products details={pro} key={pro.id} idx={idx} />
        ))}
      </div>
    </div>
  );
}

export default Home;
