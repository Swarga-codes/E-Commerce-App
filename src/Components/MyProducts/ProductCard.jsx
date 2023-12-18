import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import ProductEdit from "../ProductEdit/ProductEdit";

export const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  async function deleteProduct(id) {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}api/products/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("seller_token"),
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
    }
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-5xl py-24">
          <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
            <img
              alt="Nike Air Max 21A"
              className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
              src={product?.image}
            />
            <div
              className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10"
              style={{ overflowWrap: "anywhere" }}
            >
              <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                #{product?.category}
              </h2>
              <h1 className="my-4 text-3xl font-semibold text-black">
                {product?.title}
              </h1>
              {/*<div className="my-4 flex items-center">
                <span className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500" />
                  ))}
                  <span className="ml-3 inline-block text-xs font-semibold">
                    4 Reviews
                  </span>
                </span>
                  </div>*/}
              <p className="leading-relaxed">{product?.description}</p>
              <p className="font-bold mt-3">
                Number of Stocks: {product?.quantity}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="title-font text-xl font-bold text-gray-900">
                  ${product?.discountedPrice}
                </span>
                <button
                  type="button"
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => setOpen(true)}
                >
                  Edit Product
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Do you really wish to delete this product?"
                      )
                    ) {
                      deleteProduct(product._id);
                    }
                  }}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {open && (
        <ProductEdit details={product} isOpen={open} closeModal={closeModal} />
      )}
    </>
  );
};
