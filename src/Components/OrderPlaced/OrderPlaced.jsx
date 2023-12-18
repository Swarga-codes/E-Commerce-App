import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import OrderPlaceAnim from "../../assets/placed_order.json";
import { Link } from "react-router-dom";
function OrderPlaced() {
  return (
    <div className="Orderplaced">
      <Player
        autoplay
        loop
        src={OrderPlaceAnim}
        style={{ height: "300px", width: "300px" }}
      ></Player>
      <h1 className="text-center text-3xl font-semibold">
        Order Placed Successfully!
      </h1>
      <p className="text-center text-m text-blue-600 cursor-pointer underline">
        <Link to={"/users/myorders"}>Check My Orders</Link>
      </p>
    </div>
  );
}

export default OrderPlaced;
