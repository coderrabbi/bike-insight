import React from "react";
import styles, { layout } from "../../styles";
import bike from "../../assets/kawasaki-ninja-h2r-removebg-preview.png";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
const SellYourMotorBike = () => {
  return (
    <div>
      <section className={`${layout.section} bg-red-500 ${styles.padding}`}>
        <div className={`${layout.sectionInfo} flex flex-col gap-5`}>
          <h2 className={styles.heading2}>
            Sell Your Motorcycle <br /> With Resonable Price
          </h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Millions of buyers are looking for their next motorcycle on Cycle
            Trader this month.
          </p>
          <div className="flex items-center  gap-3">
            <AiOutlineCheck className="font-bold text-[18px]" />
            <span className="text-[20px]">
              We're Fast! Post your Motorcycle in just a few minutes.
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <AiOutlineCheck className="font-bold text-[18px]" />
            <span className="text-[20px]">
              We're Safe! We have a team of professionals ready to help.
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <AiOutlineCheck className="font-bold text-[18px]" />
            <span className="text-[20px]">
              We're Affordable! Sell your Motorcycle online with a basic
              package.
            </span>
          </div>
          <Link to="/dashboard/addproducts">
            <button className="btn ">Sell your Motorcycle</button>
          </Link>
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
          <img src={bike} alt="" />
        </div>
      </section>
    </div>
  );
};

export default SellYourMotorBike;
