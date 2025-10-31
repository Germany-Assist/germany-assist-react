import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaPaypal, FaApplePay, FaGooglePay, FaCreditCard } from "react-icons/fa";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (paymentMethod === "card") {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        "CLIENT_SECRET_FROM_BACKEND",
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Test User",
              email: "test@test.com",
            },
          },
        }
      );

      if (error) {
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        window.location.href = "/confirmation";
      }
    } else {
      alert(`Redirecting to ${paymentMethod}...`);
      setTimeout(() => {
        window.location.href = "/confirmation";
      }, 1500);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f2f7ff]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-96 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Payment
        </h2>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="block text-gray-600 font-medium">
            Select Payment Method
          </label>
          <div className="space-y-3">
            {/* Card */}
            <div
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                paymentMethod === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-center space-x-3">
                <FaCreditCard
                  className={`text-xl ${
                    paymentMethod === "card" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-gray-700">Credit / Debit Card</span>
              </div>
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
            </div>

            {/* PayPal */}
            <div
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                paymentMethod === "paypal"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="flex items-center space-x-3">
                <FaPaypal
                  className={`text-xl ${
                    paymentMethod === "paypal"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-gray-700">PayPal</span>
              </div>
              <input
                type="radio"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
            </div>

            {/* Apple Pay */}
            <div
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                paymentMethod === "applepay"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("applepay")}
            >
              <div className="flex items-center space-x-3">
                <FaApplePay
                  className={`text-xl ${
                    paymentMethod === "applepay"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-gray-700">Apple Pay</span>
              </div>
              <input
                type="radio"
                checked={paymentMethod === "applepay"}
                onChange={() => setPaymentMethod("applepay")}
              />
            </div>

            {/* Google Pay */}
            <div
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                paymentMethod === "googlepay"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("googlepay")}
            >
              <div className="flex items-center space-x-3">
                <FaGooglePay
                  className={`text-xl ${
                    paymentMethod === "googlepay"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-gray-700">Google Pay</span>
              </div>
              <input
                type="radio"
                checked={paymentMethod === "googlepay"}
                onChange={() => setPaymentMethod("googlepay")}
              />
            </div>
          </div>
        </div>

        {/* Card Input for Credit/Debit */}
        {paymentMethod === "card" && (
          <div className="border border-gray-300 rounded-2xl p-4 bg-gray-50">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        )}

        {/* Order total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 font-medium">Order Total</span>
          <span className="text-gray-700 font-semibold text-lg">$40.00</span>
        </div>

        {/* Confirm Button */}
        <button
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition ${
            isLoading && "opacity-60 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
};
