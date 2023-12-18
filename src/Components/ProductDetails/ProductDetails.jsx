import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { Share } from "lucide-react";
import toast from "react-hot-toast";
import { fetchPOSTPUT } from "../../util/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../util/Store";
function ProductDetails() {
  const { productID } = useParams();
  const [details, setDetails] = useState();
  const [loader, setLoader] = useState(true);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fetchProductData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}api/products/details/${productID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      setDetails(data);
    }
    setLoader(false);
  };
  const addToCart = async () => {
    const updateCart = await fetchPOSTPUT(
      "/products/addToCart",
      "PATCH",
      "user_token",
      { productId: details._id }
    );

    if (updateCart.message == "Token has expired, Please login") {
      navigator("/users/login");
      toast.error(updateCart.message);
    }
    if (!updateCart.error) {
      const updatedCart = JSON.parse(localStorage.getItem("user_data"));
      updatedCart?.cartItems.push(details._id);
      localStorage.setItem("user_data", JSON.stringify(updatedCart));
      toast.success(updateCart.message);
    }

    dispatch(actions.addToCart(details));
  };
  const removeFromCart = async () => {
    const removeFromCart = await fetchPOSTPUT(
      "/products/removeFromCart",
      "PATCH",
      "user_token",
      { productId: details._id }
    );
    if (removeFromCart.message == "Token has expired, Please login") {
      return navigator("/users/login");
    }
    if (removeFromCart.message) {
      let updatedCart = JSON.parse(localStorage.getItem("user_data"));
      updatedCart.cartItems = updatedCart?.cartItems?.filter(
        (item) => item !== details._id
      );
      localStorage.setItem("user_data", JSON.stringify(updatedCart));
      toast.success(removeFromCart.message);
    }
    dispatch(actions.removeFromCart(details));
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <div className="ProductDetails" style={{ overflowWrap: "anywhere" }}>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-24">
          <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
            <img
              alt="no_prev"
              className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
              src={details?.image}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <div className="flex">
                <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                  #{loader ? "Loading..." : details?.category}
                </h2>
                <h2
                  className="ml-auto cursor-pointer"
                  onClick={() => {
                    copy(
                      `http://e-commerce-app-ten-lime.vercel.app/product/details/${details._id}`
                    );
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  <Share />
                </h2>
              </div>
              <h1 className="my-4 text-3xl font-semibold text-black">
                {loader ? "Loading..." : details?.title}
              </h1>
              <p className="my-4 text-lg font-semibold text-black">
                Sold by {loader ? "Loading..." : details?.createdBy?.shopName}
              </p>
              {/*<div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
              </span>
                </div>*/}
              <p className="leading-relaxed">
                {loader ? "Loading..." : details?.description}
              </p>
              <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5"></div>
              <div className="flex items-center">
                <span className="title-font text-xl font-bold text-gray-900">
                  ${loader ? "Loading..." : details?.discountedPrice}
                </span>
                <span className="title-font text-xl font-bold text-gray-400 line-through ml-5">
                  ${loader ? "Loading..." : details?.price}
                </span>
                {!JSON.parse(
                  localStorage.getItem("user_data")
                )?.cartItems?.includes(details?._id) ? (
                  details?.quantity > 0 ? (
                    <button
                      type="button"
                      className="ml-auto rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => addToCart()}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <p className="text-lg text-red-600 font-bold text-center">
                      Out of Stock
                    </p>
                  )
                ) : (
                  <button
                    type="button"
                    className="ml-auto rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => removeFromCart()}
                  >
                    Remove from Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
