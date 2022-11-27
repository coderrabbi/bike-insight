import React, { useEffect, useState } from "react";
import {
  BsTelephoneFill,
  BsCurrencyDollar,
  BsFillGearFill,
  BsFillAlarmFill,
} from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FcAdvertising } from "react-icons/fc";
import BuyModal from "../BuyModal/BuyModal";
import styles from "../../styles";
import { useLoaderData } from "react-router-dom";

const AdvertiseProduct = () => {
  const [adItems, setAdItems] = useState([]);
  const [details, setDetails] = useState(null);
  const [productsLength, setProductsLength] = useState(null);
  console.log(productsLength);
  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setAdItems(data));
  }, []);
  return (
    <div className={`grid md:grid-cols-3 grid-cols-1${styles.padding}`}>
      {details && <BuyModal details={details} />}
    </div>
  );
};

export default AdvertiseProduct;
