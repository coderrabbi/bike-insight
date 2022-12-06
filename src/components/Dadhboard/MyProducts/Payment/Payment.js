import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/AuthProvider";
import styles from "../../../../styles";
import CheckOut from "./CheckOut";
const stripePromise = loadStripe(
  "pk_test_51M8SDWAdpdqyZqEI3GPyXGXAHFY34VCBkWIZeQFQGDuBk17YHbSiG3LKXRKXMF28VZaJ5dXBJWGRxjEb4RRtH3sQ007LrCOyt9"
);
const Payment = () => {
  const bookingData = useLoaderData();
  const { sellprice, email } = bookingData;
  const [message, setMessage] = useState("Initializing Checkout");
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");

  const description = `Bike insight payment: Name:${user?.displayName}, Email: ${email}, Amount: ${sellprice}`;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sellprice, description }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to Initializing checkout");
        toast.error("Failed to Initializing checkout!!!");
      });
  }, [description, sellprice]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className={`${styles.padding}`}>
      <div>{!clientSecret && <h3>{message}</h3>}</div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <div className="grid grid-cols-2">
            <CheckOut bookingData={bookingData} />
          </div>
        </Elements>
      )}
    </div>
  );
};

export default Payment;
