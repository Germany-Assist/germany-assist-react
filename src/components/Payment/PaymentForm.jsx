import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import {
  FaPaypal,
  FaApple,
  FaGoogle,
  FaCreditCard,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { SiSamsungpay } from "react-icons/si";
import { PaymentOption } from "./PaymentOption";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState("");

  const stripePaymentMethod = {
    card: { name: "Credit/Debit Card", icon: <FaCreditCard /> },
    paypal: { name: "PayPal", icon: <FaPaypal /> },
    apple_pay: { name: "Apple Pay", icon: <FaApple /> },
    google_pay: { name: "Google Pay", icon: <FaGoogle /> },
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 1999,
            currency: "gbp",
            payment_method_types: ["card", "paypal"],
          }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError("Failed to create payment intent");
      }
    };

    createPaymentIntent();
  }, []);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "GB",
      currency: "gbp",
      total: {
        label: "Order Total",
        amount: 1999,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      displayItems: [
        {
          label: "Product/service",
          amount: 1999,
        },
      ],
    });

    pr.on("paymentmethod", async (ev) => {
      setIsLoading(true);
      try {
        const { error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          ev.complete("fail");
          setError(confirmError.message);
        } else {
          ev.complete("success");

          window.location.href = "/confirmation";
        }
      } catch (err) {
        ev.complete("fail");
        setError("Payment failed");
      }
      setIsLoading(false);
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, clientSecret]);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (price === 0) {
      alert("No payment needed. Redirecting...");
      window.location.href = "/confirmation";
      return;
    }

    setIsLoading(true);
    setError("");

    const cardElement = elements.getElement(CardElement);

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      window.location.href = "/confirmation";
    }

    setIsLoading(false);
  };

 const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-gray-100"
      >
        <div className="text-center ">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 ">
            Payment Method
          </h2>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>
        {/* Securely  badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 py-2 rounded-lg ">
          <FaLock className="text-xs" />
          <span>Secure SSL Encryption</span>
        </div>
        {/* Payment Method Options */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-semibold text-lg">
            Select Payment Method
          </label>
          <div className="grid gap-3">
            <PaymentOption
              icon={<FaCreditCard className="text-blue-600" />}
              label="Credit/Debit Card"
              description="Pay with Visa, Mastercard, or American Express"
              selected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            />
            {/* Paypal */}
            <PaymentOption
              icon={<FaPaypal className="text-bue-600" />}
              label="PayPal"
              description="Pay with your PayPal account"
              selected={paymentMethod === "paypal"}
              onClick={() => setPaymentMethod("paypal")}
            />

            {/* Handling Apple Pay && Google Pay */}
            {paymentRequest && (
              <div className="space-y-2">
                <div
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <div className="flex items-center justify-content">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <FaApple className="text-gray-800" />
                        <FaGoogle className="text-gray-800" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Apple Pay / Google Pay
                        </div>
                        <div className="text-sm text-gray-500">
                          Fast and secure payment
                        </div>
                      </div>
                    </div>
                    {paymentMethod === "wallet" && (
                      <FaCheckCircle className="text-blue-600 text-lg" />
                    )}
                  </div>
                </div>
                {paymentMethod === "wallet" && (
                  <div className="mt-2">
                    <PaymentRequestButtonElement
                      option={{
                        paymentRequest,
                        style: {
                          paymentRequest: {
                            theme: "dark",
                            height: "44px",
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Card Input Numbers */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            {/* Card Number */}
            <div className="border-2 border-gray-200 rounded-xl p-3 bg-white shadow-sm hover:border-blue-400 transition-colors">
              <label className="block text-gray-700 font-medium mb-1">
                Card Number
              </label>
              <CardNumberElement options={cardStyle} />
            </div>

        
            <div className="flex space-x-3">
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-3 bg-white shadow-sm hover:border-blue-400 transition-colors">
                <label className="block text-gray-700 font-medium mb-1">
                  Expiry Date
                </label>
                <CardExpiryElement options={cardStyle} />
              </div>

              <div className="flex-1 border-2 border-gray-200 rounded-xl p-3 bg-white shadow-sm hover:border-blue-400 transition-colors">
                <label className="block text-gray-700 font-medium mb-1">
                  CVC
                </label>
                <CardCvcElement options={cardStyle} />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Confirm Order Button */}
        <button
          type="submit"
          disabled={isLoading || (paymentMethod === "card" && !cardComplete)}
          className={`w-full py-4 rounded-xl  font-semibold text-lg transition-all ${
            isLoading || (paymentMethod === "card" && !cardComplete)
              ? "bg-gray-400 cursor-not-allowed text-gray-200"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl "
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin">
                Processing Payment...
              </div>{" "}
            </div>
          ) : (
            `Pay £19.99 ${
              paymentMethod !== "card"
                ? `with ${
                    stripePaymentMethod[paymentMethod]?.name ||
                    "selected method"
                  }`
                : "Now"
            }`
          )}
        </button>
      </form>
    </div>
  );
};
