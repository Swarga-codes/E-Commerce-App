import React, { useEffect, useRef, useState } from "react";
import SellerNavbar from "../SellerNavbar/SellerNavbar";
import Category from "./Category";
import { useNavigate } from "react-router-dom";
import { Ring } from '@uiball/loaders'
import toast from "react-hot-toast";


function CreateProducts() {
  const productCategories = [
    "Electronics",
    "Clothing",
    "Home Appliances",
    "Beauty",
    "Books",
    "Sports",
    "Toys",
    "Furniture",
    "Jewelry",
  ];
  const imageRef = useRef();
  const navigator = useNavigate();
  const [loader,setLoader]=useState(false);
  const [image, setImage] = useState("");
  const [hostedUrl, setHostedUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(productCategories[0]);
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const loadFile = (e) => {
    let output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
  };
  function sendImageToCloudinary() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "e_commerce_app");
    data.append("cloud_name", "markus0509");
    fetch("https://api.cloudinary.com/v1_1/markus0509/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setHostedUrl(data.url);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }
  const createProduct = async () => {
    const response = await fetch("http://localhost:5000/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("seller_token"),
      },
      body: JSON.stringify({
        title,
        description,
        category,
        price,
        discountedPrice,
        quantity,
        image: hostedUrl,
      }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error)
      setLoader(false)
    } else {
      setLoader(false)
      toast.success(data.message)
      navigator("/seller/myproducts");
    }
  };
  useEffect(() => {
    if (hostedUrl) {
      createProduct()
    }
  }, [hostedUrl]);
  return (
    <>
      <div className="CreateProducts flex">
        <SellerNavbar />
        <div className="CreateProductsContainer p-6 ml-80">
          <h1 className="text-3xl font-bold">Create a New Product.</h1>
          <p className="text-red-500 font-bold mt-3">{error}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoader(true)
              sendImageToCloudinary()
            }}
          >
            <div className="w-full mt-6">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Title
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter product title"
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={80}
                rows={10}
              />
            </div>
            <div className="w-full mt-6">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="category"
              >
                Category
              </label>
              {/* <input
    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    type="text"
    placeholder="Enter the category"
    id="category"
    required
 ></input>*/}
              <Category
                selected={category}
                setSelected={setCategory}
                productCategories={productCategories}
              />
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              ></input>
            </div>
            <div className="w-full mt-6">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="quantity"
              >
                Product Image
              </label>
              <input
                className="hidden h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={(e) => {
                  loadFile(e);
                  setImage(e.target.files[0]);
                }}
                ref={imageRef}
              ></input>
              <img
                src="https://img.icons8.com/sf-black-filled/256/image.png"
                width={250}
                height={250}
                onClick={() => imageRef.current.click()}
                alt="no prev"
                id="output"
              />
            </div>
            {!loader?
            <button
              type="submit"
              class="rounded-md bg-black mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Create Product
            </button>
           :
            <button
            type="submit"
            class="rounded-md bg-black mt-6 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
          <Ring 
          size={20}
          lineWeight={5}
          speed={2} 
          color="white" 
         />
          </button>
            }
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProducts;
