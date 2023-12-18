import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchGET, fetchPOSTPUT } from "../../util/useFetch";
import { Ring } from "@uiball/loaders";
import Category from "../CreateProducts/Category";
import toast from "react-hot-toast";
export default function CheckoutPage() {
  const typeOfPayment = ["Cash On Delivery", "UPI"];
  const userInfo = JSON.parse(localStorage.getItem("user_data"));
  const navigator = useNavigate();
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState(typeOfPayment[0]);
  const [loader, setLoader] = useState(true);
  const [placeOrderLoader, setPlaceOrderLoader] = useState(false);
  async function cartData() {
    const data = await fetchGET("/products/cart", "GET", "user_token");
    setLoader(false);
    setCart(data.cartItems);
  }
  async function placeOrder() {
    const orderItems = cart.map((item) => item._id);
    const body = {
      orderItems,
      orderAmount: cart?.reduce((acc, curr) => acc + curr.discountedPrice, 0),
      orderType,
      address: JSON.parse(localStorage.getItem("user_data"))?.address,
    };
    const data = await fetchPOSTPUT(
      "/users/createOrder",
      "POST",
      "user_token",
      body
    );
    if (!data.error) {
      const updateData = JSON.parse(localStorage.getItem("user_data"));
      updateData.cartItems = [];
      localStorage.setItem("user_data", JSON.stringify(updateData));
      navigator("/cart/checkout/orderplaced");
      toast.success("Order placed successfully!");
    } else {
      toast.error(data.error);
    }
    setPlaceOrderLoader(false);
  }
  useEffect(() => {
    cartData();
  }, []);
  return (
    <>
      <h1 className="text-3xl px-4 py-2 mx-auto font-bold mt-5">
        Checkout Page
      </h1>
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden  rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="px-5 py-6 text-gray-900 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                    <form>
                      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div>
                          <h3
                            id="contact-info-heading"
                            className="text-lg font-semibold text-gray-900"
                          >
                            Contact information
                          </h3>

                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              Full Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                              type="text"
                              placeholder="Enter your name"
                              id="name"
                              value={userInfo?.name}
                              disabled
                            ></input>
                          </div>
                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              Email
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                              type="email"
                              placeholder="Enter your email"
                              id="email"
                              value={userInfo?.email}
                              disabled
                            ></input>
                          </div>
                          <button
                            type="button"
                            className="rounded-md mt-6 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => navigator("/user/profile")}
                          >
                            Update Info
                          </button>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Payment details
                          </h3>
                          <div className="w-full mt-6">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="category"
                            >
                              Payment Type
                            </label>
                            <Category
                              selected={orderType}
                              setSelected={setOrderType}
                              productCategories={typeOfPayment}
                            />
                          </div>
                          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                            {orderType === "UPI" && (
                              <div className="col-span-3 sm:col-span-4">
                                <label
                                  htmlFor="cardNum"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  UPI ID
                                </label>
                                <div className="mt-1">
                                  <input
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your UPI ID"
                                    id="cardNum"
                                  ></input>
                                </div>
                              </div>
                            )}
                            {/* <div className="col-span-2 sm:col-span-3">
                            <label
                              htmlFor="expiration-date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Expiration date (MM/YY)
                            </label>
                            <div className="mt-1">
                              <input
                                type="date"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="cvc"
                              className="block text-sm font-medium text-gray-700"
                            >
                              CVC
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="cvc"
                                id="cvc"
                                autoComplete="csc"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
  </div>*/}
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Shipping address
                          </h3>

                          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="street name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Street Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                                  value={userInfo?.address?.streetName}
                                  disabled
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                                  value={userInfo?.address?.city}
                                  disabled
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State / Province
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="region"
                                  name="region"
                                  autoComplete="address-level1"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                                  value={userInfo?.address?.state}
                                  disabled
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Postal code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="postal-code"
                                  name="postal-code"
                                  autoComplete="postal-code"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                                  value={userInfo?.address?.postalCode}
                                  disabled
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Country
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="country"
                                  name="country"
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed"
                                  value={userInfo?.address?.country}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="rounded-md mt-6 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => navigator("/user/profile")}
                          >
                            Update Address
                          </button>
                        </div>
                        {/* <hr className="my-8" />
                     <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                        <div className="mt-6 flex items-center">
                       
                          <input
                            id="same-as-shipping"
                            name="same-as-shipping"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div className="ml-2">
                            <label
                              htmlFor="same-as-shipping"
                              className="text-sm font-medium text-gray-900"
                            >
                              Same as shipping information
                            </label>
                          </div>
                        </div>
  </div>*/}

                        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                          {!placeOrderLoader ? (
                            <button
                              type="button"
                              className="flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                              onClick={() => {
                                setPlaceOrderLoader(true);
                                placeOrder();
                              }}
                            >
                              Place Order
                              <span className="ml-2">
                                <MoveRight />
                              </span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              <Ring
                                size={20}
                                lineWeight={5}
                                speed={2}
                                color="white"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Product List */}
            <div className="bg-gray-100 px-5 py-6 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {loader && (
                    <h1 className="font-bold">Loading cart data...</h1>
                  )}
                  {cart?.map((product) => (
                    <li
                      key={product._id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                            src={product?.image}
                            alt="no preview"
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold">
                              {product?.title}
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              #{product?.category}
                            </p>
                          </div>
                          {/* <p className="mt-4 text-xs font-medium ">x 1</p>*/}
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">
                          ${product?.discountedPrice}
                        </p>
                        {/*  <button
                        type="button"
                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        <span className="sr-only">Remove</span>
                        <X className="h-5 w-5" />
                    </button>*/}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              {/*<form action="#" className="mt-6">
              <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                <div className="flex-grow">
                  <input
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                </div>
                <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
                </form>*/}
              <ul className="mt-6 space-y-3">
                {/*  <li className="flex items-center justify-between text-gray-600">
                <p className="text-sm font-medium">Sub total</p>
                <p className="text-sm font-medium">₹1,14,399</p>
              </li>*/}
                <li className="flex items-center justify-between text-gray-900">
                  <p className="text-sm font-medium ">Total</p>
                  {!loader && (
                    <p className="text-sm font-bold ">
                      $
                      {cart?.reduce(
                        (acc, curr) => acc + curr.discountedPrice,
                        0
                      )}
                    </p>
                  )}
                  {loader && (
                    <p className="text-sm font-bold ">Calculating...</p>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
