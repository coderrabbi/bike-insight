import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import styles from "../../../../styles";
import CheckOut from "./CheckOut";
const stripePromise = loadStripe(
  "pk_test_51M8SDWAdpdqyZqEI3GPyXGXAHFY34VCBkWIZeQFQGDuBk17YHbSiG3LKXRKXMF28VZaJ5dXBJWGRxjEb4RRtH3sQ007LrCOyt9"
);
const Payment = () => {
  const bookingData = useLoaderData();

  return (
    <div className={`${styles.padding}`}>
      <Elements stripe={stripePromise}>
        <div className="grid grid-cols-2">
          <CheckOut bookingData={bookingData} />
          <div></div>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
