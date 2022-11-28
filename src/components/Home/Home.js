import React from "react";
import AdvertiseProduct from "../AdvertiseProduct/AdvertiseProduct";
import BikesCategory from "../BikesCategory/BikesCategory";
import Hero from "../Hero/Hero";
import SellYourMotorBike from "../SellYourMotorBike/SellYourMotorBike";

const Home = () => {
  return (
    <div>
      <Hero />
      <AdvertiseProduct />
      <BikesCategory />
      <SellYourMotorBike />
    </div>
  );
};

export default Home;
