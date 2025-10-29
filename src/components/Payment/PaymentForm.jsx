import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { elements } from "chart.js";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "CLIENT_SECRET_FROM_BACKEND",
      {
        payment_method: { card: elements.getElement(CardElement) },
      }
    );
    if (!error && paymentIntent.status === "succeeded") {
      window.location.href = "/confirmation";
    }
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
