import React from "react";
import AdvertiseProduct from "../AdvertiseProduct/AdvertiseProduct";
import BikesCategory from "../BikesCategory/BikesCategory";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <AdvertiseProduct />
      <BikesCategory />
    </div>
  );
};

export default Home;
