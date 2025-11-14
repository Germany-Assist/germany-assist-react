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
import { BACKEND_URL } from "../../config/api";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../pages/AuthProvider";
export const PaymentForm = () => {
  const stripe = useStripe();
  const { serviceId } = useParams();
  const location = useLocation();
  const { accessToken } = useAuth();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);
  const [error, setError] = useState("");

  const { price, serviceName } = location.state || {};
  const displayPrice = price > 0 ? price : 4000;
  const stripePaymentMethod = {
    card: { name: "Credit/Debit Card", icon: <FaCreditCard /> },
    paypal: { name: "PayPal", icon: <FaPaypal /> },
    apple_pay: { name: "Apple Pay", icon: <FaApple /> },
    google_pay: { name: "Google Pay", icon: <FaGoogle /> },
  };

  useEffect(() => {
     console.log("GET CLIENT SECRET useEffect RUNNING...");
     console.log("serviceId =", serviceId);
console.log("accessToken =", accessToken);
console.log("FULL URL:", `${BACKEND_URL}/order/pay/${serviceId}`);

    const getClientSecret = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/order/pay/${serviceId}`, {

          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(BACKEND_URL)


        const data = await response.json();
        console.log("Payment Intent Response:", data);

        if (data.success && data.message.clientSecret) {
          setClientSecret(data.message.clientSecret);
        } else {
          throw new Error("Failed to get client secret");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to create payment intent");
      }
    };

    getClientSecret();
  }, [serviceId, accessToken]);
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe is not loaded yet.");
      setIsLoading(false);
      return;
    }

    try {
      const cardNumber = elements.getElement(CardNumberElement);

      const { paymentMethod, error: pmError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumber,
        });

      if (pmError) {
        console.error("PaymentMethod creation failed:", pmError);
        setError(pmError.message);
        setIsLoading(false);
        return;
      }

      console.log(" PaymentMethod created:", paymentMethod);

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      console.log(" Full Stripe Response:", {
        clientSecret,
        paymentMethod,
        paymentIntent,
        confirmError,
      });

      if (confirmError) {
        console.error("Payment failed:", confirmError);
        setError(confirmError.message);
      } else if (paymentIntent?.status === "succeeded") {
        console.log(" Payment successful:", paymentIntent);
      }
    } catch (err) {
      console.error("Unexpected error confirming payment:", err);
      setError("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  // Handle payment with Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe) return;

    const priceInCents = Math.max(Math.round((displayPrice || 0) * 100), 1);

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: serviceName || "Service Payment",
        amount: priceInCents, 
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.on("paymentmethod", async (event) => {
      try {
        const res = await fetch(`${BACKEND_URL}/order/pay/${serviceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
        const secret = data?.message?.clientSecret;

        if (!secret) {
          throw new Error("Client secret not found.");
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          secret,
          {
            payment_method: event.paymentMethod.id,
          }
        );

        if (error) {
          event.complete("fail");
          console.error(" Payment failed:", error.message);
          alert(`Payment failed: ${error.message}`);
        } else if (paymentIntent?.status === "succeeded") {
          event.complete("success");
          console.log("Payment succeeded:", paymentIntent);
          alert("Payment successful!");
        } else {
          event.complete("fail");
          console.warn(" Unexpected payment status:", paymentIntent?.status);
        }
      } catch (err) {
        console.error("Error confirming payment:", err);
        event.complete("fail");
        alert("An unexpected error occurred while processing your payment.");
      }
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        console.log("Google Pay / Apple Pay available", result);
      } else {
        console.log("No payment methods available");
      }
    });
  }, [stripe, serviceName, displayPrice, serviceId, accessToken]);

 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl w-full max-w-lg p-8 space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
            Complete Your Payment
          </h2>
          <p className="text-gray-600">
            Choose a method and securely pay for your service
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600 bg-green-50 border border-green-100 py-2 rounded-xl">
          <FaLock className="text-green-600 text-sm" />
          <span>Secure SSL Encryption</span>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-semibold text-lg">
            Select Payment Method
          </label>

          <div className="grid gap-3">
            {/* Credit/Debit Card */}
            <PaymentOption
              icon={<FaCreditCard className="text-blue-600 text-lg" />}
              label="Credit / Debit Card"
              description="Pay securely with Visa, Mastercard, or American Express"
              selected={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            />

            {/* Wallet Payment (Apple / Google Pay) */}
            {paymentRequest && (
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <FaApple className="text-gray-800 text-lg" />
                      <FaGoogle className="text-gray-800 text-lg" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
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

                {paymentMethod === "wallet" && (
                  <div className="mt-2">
                    <PaymentRequestButtonElement
                      options={{
                        paymentRequest,
                        style: {
                          paymentRequest: { theme: "dark", height: "48px" },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-4">
            {/* Card Number */}
            <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:border-blue-400 transition">
              <label className="block text-gray-700 font-semibold mb-1">
                Card Number
              </label>
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1a1a1a",
                      "::placeholder": { color: "#a0a0a0" },
                    },
                  },
                }}
                onChange={(event) => setCardComplete(event.complete)}
              />
            </div>

            {/* Expiry + CVC */}
            <div className="flex space-x-4">
              <div className="flex-1 border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:border-blue-400 transition">
                <label className="block text-gray-700 font-semibold mb-1">
                  Expiry Date
                </label>
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1a1a1a",
                        "::placeholder": { color: "#a0a0a0" },
                      },
                    },
                  }}
                />
              </div>
              <div className="flex-1 border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:border-blue-400 transition">
                <label className="block text-gray-700 font-semibold mb-1">
                  CVC
                </label>
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1a1a1a",
                        "::placeholder": { color: "#a0a0a0" },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Confirm the Order */}
        <button
          type="submit"
          disabled={isLoading || (paymentMethod === "card" && !cardComplete)}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all flex justify-center items-center gap-2 ${
            isLoading || (paymentMethod === "card" && !cardComplete)
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>Pay ${(displayPrice / 100).toFixed(2)} Now</>
          )}
        </button>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-4">
          Powered by{" "}
          <span className="font-semibold text-blue-600">Stripe Payments</span>
        </div>
      </form>
    </div>
  );
};
