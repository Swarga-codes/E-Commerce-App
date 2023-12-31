import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../util/Store";
import { ArrowRight } from "lucide-react";
import { fetchGET, fetchPOSTPUT } from "../../util/useFetch";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigator = useNavigate();
  const [cart, setCart] = useState([]);
  async function cartData() {
    const data = await fetchGET("/products/cart", "GET", "user_token");
    setCart(data.cartItems);
  }
  const dispatch = useDispatch();
  const removeFromCart = async (prod) => {
    const removeFromCart = await fetchPOSTPUT(
      "/products/removeFromCart",
      "PATCH",
      "user_token",
      { productId: prod._id }
    );
    if (removeFromCart.message == "Token has expired, Please login") {
      return navigator("/users/login");
    }
    if (removeFromCart.message) {
      let updatedCart = JSON.parse(localStorage.getItem("user_data"));
      updatedCart.cartItems = updatedCart?.cartItems?.filter(
        (item) => item !== prod._id
      );
      localStorage.setItem("user_data", JSON.stringify(updatedCart));
    }
    dispatch(actions.removeFromCart(prod));
  };
  useEffect(() => {
    cartData();
  }, [cart]);
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="cart-heading"
            className="rounded-lg bg-white lg:col-span-8"
          >
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {JSON.parse(localStorage.getItem("user_data"))?.cartItems
                ?.length > 0 ? (
                cart?.map((product, productIdx) => (
                  <div key={product._id} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={"no preview"}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href="#"
                                  className="font-semibold text-black"
                                >
                                  {product.title}
                                </a>
                              </h3>
                            </div>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              #{product?.category}
                            </p>
                            {/*<div className="mt-1 flex text-sm">
                          <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
</svg>
                            <p className="text-sm text-gray-500">2.6{product?.rating?.rate}</p>
                           
                              <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                               59 {product?.rating?.count} Reviews
                              </p>
                       
                </div>*/}
                            <div className="mt-1 flex items-end">
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp;${product?.discountedPrice}
                              </p>
                              &nbsp;&nbsp;
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      {/*<div className="min-w-24 flex">
                      <button type="button" className="h-7 w-7">
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        defaultValue={1}
                      />
                      <button type="button" className="flex h-7 w-7 items-center justify-center">
                        +
                      </button>
                </div>*/}
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          onClick={() => removeFromCart(product)}
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                        >
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-3xl">The cart is empty</p>
              )}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">
                    Price ({cart?.length} item)
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $
                    {cart
                      ?.reduce((acc, curr) => acc + curr.discountedPrice, 0)
                      .toFixed(2)}
                  </dd>
                </div>
                {/*<div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
          </div>*/}
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${cart.reduce((acc, curr) => acc + curr.discountedPrice, 0)}
                  </dd>
                </div>
              </dl>
              {/*<div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
        </div>*/}
              {cart.length > 0 && (
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                  onClick={() => navigator("/cart/checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
