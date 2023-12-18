import React from "react";
import { BarChart, Boxes, LogIn, PackagePlus, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
export default function SellerNavbar() {
  const navigator = useNavigate();
  return (
    <aside className="fixed flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <Link to="/">
        <div className="inline-flex items-center space-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </span>
          <span className="font-bold text-2xl">Seller.</span>
        </div>
      </Link>

      <div className="mt-10 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-6 ">
            <Link
              to={"/seller/dashboard"}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              to={"/seller/products/create"}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <PackagePlus className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Create</span>
            </Link>

            <Link
              to={"/seller/myproducts"}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Boxes className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">My Products</span>
            </Link>
            <Link
              to={"/seller/analytics"}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Activity className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Analytics</span>
            </Link>
            {/* <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Paperclip className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Checklists</span>
  </a>*/}
          </div>
        </nav>
        <div className="mt-6">
          <div className="mt-6 flex items-center justify-between">
            <Link to="/seller/profile">
              <div className="flex items-center gap-x-2">
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src={
                    JSON.parse(localStorage.getItem("seller_details"))
                      .profilePic
                  }
                  alt="avatar"
                />
                <span className="text-sm font-medium text-gray-700">
                  {JSON.parse(localStorage.getItem("seller_details")).shopName}
                </span>
              </div>
            </Link>
            <a
              onClick={() => {
                if (window.confirm("Do you really wish to logout?")) {
                  localStorage.clear();
                  navigator("/seller/login");
                }
              }}
              className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
            >
              <LogIn className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
