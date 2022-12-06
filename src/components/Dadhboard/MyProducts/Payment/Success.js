import React from "react";
import Lottie from "lottie-react";
import imgData from "./success.json";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="text-center min-h-[80vh]">
      <Lottie animationData={imgData} className="h-[250px]" loop={true} />
      <p className="text-green-500 text-2xl py-3">Thanks for purchasing. </p>
      <div className="flex justify-center items-center gap-3">
        <Link to="/order-history" className="btn text-white btn-warning">
          View Order Status
        </Link>
        <Link to="/" className="btn btn-outline btn-warning">
          back to home
        </Link>
      </div>
    </div>
  );
};

export default Success;
