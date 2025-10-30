import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { elements } from "chart.js";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (paymentMethod === "card") {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) return;

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
        setIsLoading(false);
        window.location.href = "/confirmation";
      } else {
        alert(`Redirecting to  ${paymentMethod} ...`);
        setTimeout(() => {
          window.location.href = "/confirmation";
        }, 1500);
      }
    }
    setIsLoading(false);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-96 space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          Payment
        </h2>
          {/* Payment methods */}
          <div className="space-y-2">
              <label className="font-medium text-gray-600">Select Payment Method</label>
              <select value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)} className="w-full border border-gray-300 rounded-xl focus:outline-none">
                <option value="card">Credit / Debit Card</option>
                <option value="paypal">Paypal</option>
                <option value="applepay">Apple Pay</option>
                <option value="googlepay">Google Pay</option>
              </select>                  
          </div>
        <div className="border border-gray-300 rounded-xl p-3 bg-gray-50">
          <CardElement />
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 font-medium">Order Total</span>
          <span className="text-gray-500 font-medium">40$</span>
        </div>
        <button
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition ${
            isLoading && "opacity-60 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "ConfirmOrder"}
        </button>
      </form>
    </div>
  );
};
