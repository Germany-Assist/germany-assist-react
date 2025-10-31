import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "./PaymentForm";

const stripePromise = loadStripe("pk_test_51PB0qOExyylvHUrWpZQtSZKFnnUxlSianPwSwYyeEnFyUn1pb1nDWbSLVnTpDimHcXwNELk1MBzJgJSwH53Hb5wq00jFpTa1Ri");
export const StripeContainer = () => {

  return (
  <Elements stripe={stripePromise}>
    <PaymentForm/>
  </Elements>
  )
}
