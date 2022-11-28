/* eslint-disable no-unused-vars */
import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import moment from 'moment';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckOut = ({ bookingData }) => {
    const { sellprice, title, email, _id } = bookingData;
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [cardError, setCardError] = useState('');
    // const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret',
        );

        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    setMessage('Payment succeeded!');
                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });
    }, [stripe]);
    const saveOrder = () => {
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleTimeString();
        const orderConfig = {
            userId: _id,
            userEmail: email,
            orderDate: date,
            orderTime: time,
            orderAmount: sellprice,
            isPaid: true,
            createdAt: moment().format('MMM Do YY'),
        };
        try {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(orderConfig),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(data.insertedId);
                    }
                });
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);

        const confirmPayment = await stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/dashboard/checkout-success',
                },
                redirect: 'if_required',
            })
            .then((result) => {
                if (result.error) {
                    toast.error(result.error.message);
                    setMessage(result.error.message);
                    return;
                }
                if (result.paymentIntent) {
                    if (result.paymentIntent.status === 'succeeded') {
                        setProcessing(false);
                        toast.success('Payment successful');
                        saveOrder();
                    }
                }
            });
        setProcessing(false);
    };
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="font-semibold text-xl">Payment For {title}</h2>
            </div>
            <h2 className="text-[20px]">Products Price ${bookingData.sellprice}</h2>

            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <PaymentElement id="payment-element" />
                    <button
                        disabled={processing || !stripe || !elements}
                        id="submit"
                        className="mt-5 px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white w-full"
                    >
                        <span id="button-text">{processing ? 'Loading...' : 'Pay now'}</span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </div>
            </form>
        </div>
    );
};

export default CheckOut;
