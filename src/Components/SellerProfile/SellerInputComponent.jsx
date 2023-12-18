import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Ring } from "@uiball/loaders";

export function SellerInputComponent({ image, changed }) {
  const sellerData = JSON.parse(localStorage.getItem("seller_details"));
  const [shopName, setShopName] = useState(sellerData?.shopName);
  const [email, setEmail] = useState(sellerData?.email);
  const [phoneNumber, setPhoneNumber] = useState(sellerData?.phoneNumber);
  const [upiId, setUpiId] = useState(sellerData?.upiId);
  const [loader, setLoader] = useState(false);
  const [hostedUrl, setHostedUrl] = useState("");
  let body = {
    shopName,
    email,
    phoneNumber,
    upiId,
    profilePic: hostedUrl
      ? hostedUrl
      : JSON.parse(localStorage.getItem("seller_details"))?.profilePic,
  };
  const updateSeller = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}api/sellers/updateseller/${
        JSON.parse(localStorage.getItem("seller_details"))?.id
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("seller_token"),
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (!data.error) {
      toast.success(data.message);
      localStorage.setItem("seller_details", JSON.stringify(data.sellerData));
    } else {
      toast.error(data.error);
    }
    setLoader(false);
  };
  function sendImageToCloudinary() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    fetch(import.meta.env.VITE_CLOUDINARY_API, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setHostedUrl(data.url);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (hostedUrl) {
      updateSeller();
    }
  }, [hostedUrl]);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoader(true);
        if (!changed) {
          await updateSeller();
        } else {
          await sendImageToCloudinary();
        }
      }}
    >
      <div className="border-b border-gray-900/10 pb-12">
        <p className="mt-1 text-sm leading-6 text-gray-600 font-semibold">
          Note: Your data will only be updated when you click the update button.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Shop Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={shopName}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={phoneNumber}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              UPI ID
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                value={upiId}
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
      Cancel
  </button>*/}
          {!loader ? (
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Ring size={20} lineWeight={5} speed={2} color="white" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
