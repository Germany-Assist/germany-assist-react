import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe("pk_value_publish_key");
export const StripeContainer = () => {

  return (
  <Elements stripe={stripePromise}>
    <PaymentForm/>
  </Elements>
  )
}
