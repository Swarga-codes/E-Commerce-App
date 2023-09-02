import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import { fetchGET } from '../../util/useFetch';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      setProducts(await fetchGET('/products/display','GET'));
    }
    getProducts();
  }, []);

  return (
    <div className='mx-auto max-w-12xl px-4 py-2 sm:px-6 lg:px-8 mt-5'>
      <h1 className='font-bold text-2xl mx-10 mb-4'>Products</h1>
      <div className='flex flex-wrap gap-4 justify-left'>
        {products?.map((pro, idx) => (
          <Products details={pro} key={pro.id} idx={idx} />
        ))}
      </div>
    </div>
  );
}

export default Home;
