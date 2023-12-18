import { useState, useEffect } from "react";
import SellerNavbar from "../SellerNavbar/SellerNavbar";
import AnalyticsCard from "./AnalyticsCard";
import Products from "../../assets/products.json";
import Orders from "../../assets/orders.json";
import OrdersComplete from "../../assets/orders_complete.json";
function SellerAnalytics() {
  const [noOfProducts, setNoOfProducts] = useState("Hang on, loading...");
  const [noOfOrders, setNoOfOrders] = useState("Hang on, loading...");
  const [noOfOrdersCompleted, setNoOfOrdersCompleted] = useState(
    "Hang on, loading..."
  );
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
    setNoOfProducts(data.length);
  };
  async function getSellerOrders() {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}api/sellers/orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("seller_token"),
        },
      }
    );
    const data = await response.json();
    setNoOfOrders(data.length);
    setNoOfOrdersCompleted(
      data.filter((order) => order.isComplete === true)?.length
    );
  }
  useEffect(() => {
    fetchMyProducts();
    getSellerOrders();
  }, []);
  return (
    <div className="SellerAnalytics flex">
      <SellerNavbar />
      <div className="ml-80 p-6">
        <h1 className="text-3xl font-bold mt-10">Seller Analytics.</h1>
        <div className="mt-10 flex flex-wrap">
          <AnalyticsCard
            heading={"Number of Products"}
            count={noOfProducts}
            animationData={Products}
          />
          <AnalyticsCard
            heading={"Orders Received"}
            count={noOfOrders}
            animationData={Orders}
          />
          <AnalyticsCard
            heading={"Orders Delivered"}
            count={noOfOrdersCompleted}
            animationData={OrdersComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default SellerAnalytics;
