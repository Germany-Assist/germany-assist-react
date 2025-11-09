import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe("pk_test_51SQZUqGUoCcxGdK4P8kWALVaQpmIHZofBowgUmL6sQ5AGsMyKR8qTUJpSLfFJ9M0DZnZwbkn88tGsTtkzEZfJHP500URUVTi77");
export const StripeContainer = () => {

  return (
  <Elements stripe={stripePromise}>
    <PaymentForm/>
  </Elements>
  )
}
