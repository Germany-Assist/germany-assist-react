import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
export const PaymentRequestButton = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Test Payment",
        amount: 1099,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.on("paymentmethod", async (event) => {
      try {
        const res = await fetch(`${API_URL}/api/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 4000 }),
        });

        const { clientSecret } = await res.json();

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: event.paymentMethod.id,
          }
        );

        if (error) {
          event.complete("fail");
          console.error("Payment failed:", error.message);
        } else {
          event.complete("success");
          console.log("Payment succeeded:", paymentIntent);
        }
      } catch (err) {
        console.error("Error confirming payment:", err);
        event.complete("fail");
      }
    });

    pr.canMakePayment().then((result) => {
      if (result) setPaymentRequest(pr);
    });
  }, [stripe]);

  if (!paymentRequest) return null;

  return (
    <div className="p-4">
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: { paymentRequest: { theme: "dark", height: "44px" } },
        }}
      />
    </div>
  );
};
