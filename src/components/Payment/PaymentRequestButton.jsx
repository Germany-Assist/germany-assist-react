import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

export const PaymentRequestButton = () => {
    const stripe = useStripe();
    const [ paymentRequest,setPaymentRequest]=useState(null);

   useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: { label: "Demo Payment", amount: 4000 },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) setPaymentRequest(pr);
      });
    }
  }, [stripe]);
  if(!paymentRequest){
    return null;
  }
  return <PaymentRequestButtonElement options={{ paymentRequest }} />;

}
