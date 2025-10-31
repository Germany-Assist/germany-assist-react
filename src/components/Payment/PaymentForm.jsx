import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { 
  FaPaypal, 
  FaApple, 
  FaGoogle, 
  FaCreditCard,
  FaLock,
  FaCheckCircle
} from "react-icons/fa";
import { SiSamsungpay } from "react-icons/si";
import { PaymentOption } from "./PaymentOption";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState("");

  const stripePaymentMethod={
    card:{name: "Credit/Debit Card",icon:<FaCreditCard/>},
    paypal:{name:"PayPal",icon:<FaPaypal/>},
    apple_pay:{name:"Apple Pay",icon:<FaApple/>},
    google_pay:{name:"Google Pay",icon:<FaGoogle/>}

  }


  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            amount: 1999, 
            currency: "gbp",
            payment_method_types: ["card", "paypal"] 
          }), 
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError("Failed to create payment intent");
      }
    };

    createPaymentIntent();
  }, []);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "GB", 
      currency: "gbp",
      total: { 
        label: "Order Total", 
        amount: 1999, 
      },
      requestPayerName: true,
      requestPayerEmail: true,
      displayItems: [
        {
          label: "Product/service",
          amount: 1999,
        }
      ],
    });

    pr.on('paymentmethod', async (ev) => {
     
      setIsLoading(true);
      try {
     
        const {error: confirmError} = await stripe.confirmCardPayment(
          clientSecret,
          {payment_method: ev.paymentMethod.id},
          {handleActions: false}
        );

        if (confirmError) {
          ev.complete('fail');
          setError(confirmError.message);
        } else {
          ev.complete('success');
    
          window.location.href = "/confirmation";
        }
      } catch (err) {
        ev.complete('fail');
        setError("Payment failed");
      }
      setIsLoading(false);
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, clientSecret]);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setError(event.error ? event.error.message : "");
  };


    const handleSubmit=async(e)=>{
       e.preventDefault();
       setIsLoading(true);
       setError("");
       try {
        if(paymentMethod==="card"){
          if(!stripe || !elements){
            return
          }
          if(!cardComplete){
            setError("Please complete your card details");
            setIsLoading(false);
            return;
          }
          const{error:stripeError,paymentIntent}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
              card:elements.getElement(CardElement)
            }
          });
          if(stripeError){
            setError(stripeError.message);
          }
          else if(paymentIntent.status==="succeeded"){
            window.location.href="/confirmation";
          }
          else if(paymentMethod==="paypal"){
            alert ("directing to Paypal....");
             setTimeout(()=>{
              window.location.href="/confirmation"
             },1500)
          }
          else{
            // Handle Apple Pay/Google we use the Payment Request
            if(paymentRequest){
              paymentRequest.show();
            }
          }
        }
       } catch (error) {
       setError("An unexpected error occurred",error); 
       }
       setIsLoading(false);
    }


  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px 12px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
     
    </div>
  );
};