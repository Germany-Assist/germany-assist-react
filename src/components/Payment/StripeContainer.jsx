import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe("pk_test_51SScMFEuJKnu9VDam6S8DaZfyjBzd2kUzsLgf9FUOkZOaDXoljiRe1FuViMJ4NYKuoqlxz2zST2unKujiMWspDNl00XJWCVERl");
export const StripeContainer = () => {

  return (
  <Elements stripe={stripePromise}>
    <PaymentForm/>
  </Elements>
  )
}
