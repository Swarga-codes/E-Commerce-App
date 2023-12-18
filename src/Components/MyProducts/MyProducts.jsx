import { useEffect, useState } from "react";
import SellerNavbar from "../SellerNavbar/SellerNavbar";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
import EmptyProduct from '../../assets/empty_product.json'
import Lottie from "lottie-react";
import { Ring } from "@uiball/loaders";
function MyProducts() {
  const [productData, setProductData] = useState([]);
  const [loader,setLoader]=useState(true)
  const fetchMyProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}api/products/myProducts`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("seller_token"),
        },
      }
    );
    const data = await response.json();
    setProductData(data);
    setLoader(false)
  };
  useEffect(() => {
    fetchMyProducts();
  }, [productData]);
  return (
    <div className="My_Products flex">
      <SellerNavbar />
      <div className="ml-80 p-6">
        <h1 className="text-3xl font-bold">My Products.</h1>
        {productData.length===0 && !loader && 
        <div className="flex flex-col justify-center items-center">
        <Lottie
        animationData={EmptyProduct}
        loop={false}
        autoplay
        className="w-fit rounded-md object-cover"
      />
        <h1 className="text-2xl font-bold mt-10">Woah! it's empty here!</h1>
        <Link to='/seller/products/create'><span className="underline">Would you like to create some?</span></Link>
        </div>
        }
        {
            loader && 
            <div className="flex flex-col justify-center items-center mt-20">
            <Ring 
          size={80}
          lineWeight={5}
          speed={2} 
          color="black" 
         />
            <h1 className="text-2xl font-bold mt-10">Hang On, Your Products are loading...</h1>
            </div>
        }
        {productData?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
