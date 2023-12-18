import { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Ring } from "@uiball/loaders";

import toast from "react-hot-toast";
export default function ProductEdit({ isOpen, closeModal, details }) {
  const imageRef = useRef(null);
  const [title, setTitle] = useState(details?.title);
  const [description, setDescription] = useState(details?.description);
  const [quantity, setQuantity] = useState(details?.quantity);
  const [price, setPrice] = useState(details?.price);
  const [discountedPrice, setDiscountedPrice] = useState(
    details?.discountedPrice
  );
  const [image, setImage] = useState(details?.image);
  const [loader, setLoader] = useState(false);
  const [hostedUrl, setHostedUrl] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const updateProduct = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}api/products/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("seller_token"),
        },
        body: JSON.stringify({
          title,
          description,
          price,
          discountedPrice,
          quantity,
          image: hostedUrl ? hostedUrl : details?.image,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
    }
    setLoader(false);
  };
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
      updateProduct(details._id);
    }
  }, [hostedUrl]);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center"></div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <section className="overflow-hidden bg-white px-3 rounded-2xl py-3">
                    <div className="mx-auto max-w-5xl pr-5">
                      <div className="mx-auto flex flex-wrap items-center">
                        <input
                          className="hidden h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="file"
                          accept="image/*"
                          id="image"
                          name="image"
                          onChange={(e) => {
                            loadFile(e);
                            setIsChanged(true);
                            setImage(e.target.files[0]);
                          }}
                          ref={imageRef}
                        ></input>
                        <img
                          alt="no prev"
                          className="h-64 w-full rounded object-contain lg:h-96 lg:w-1/2"
                          src={details?.image}
                          id="output"
                          onClick={() => imageRef.current.click()}
                        />

                        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                          <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                            #{details?.category}
                          </h2>
                          <div className="w-full">
                            <label
                              className="float-left mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              for="title"
                            >
                              Title
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your product title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            ></input>
                          </div>

                          <div className="w-full mt-3">
                            <label
                              className="float-left mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              for="desciption"
                            >
                              Description
                            </label>
                            <textarea
                              cols={20}
                              className="flex h-32 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your product description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <p
                            className="leading-relaxed text-left mt-4"
                            style={{ overflowWrap: "anywhere" }}
                          >
                            <b>
                              Number of Stocks:{" "}
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                              />
                            </b>
                          </p>

                          <div className="text-justify mt-3">
                            <p className="title-font text-xl font-bold text-gray-900">
                              Price: $
                              <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              ></input>
                            </p>
                            <p className="title-font text-xl font-bold text-gray-900">
                              Discounted Price: $
                              <input
                                type="number"
                                value={discountedPrice}
                                onChange={(e) =>
                                  setDiscountedPrice(e.target.value)
                                }
                                className="w-[10rem]"
                              ></input>
                            </p>
                          </div>
                          {!loader ? (
                            <button
                              type="button"
                              className="float-right mt-5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                              onClick={async () => {
                                setLoader(true);
                                if (!isChanged) {
                                  await updateProduct(details._id);
                                } else {
                                  await sendImageToCloudinary();
                                }
                              }}
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="float-right mt-5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
