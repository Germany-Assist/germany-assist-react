import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

export const CreateCoupon = () => {
    
    // Generate Auto coupon code
    const generateCouponCode=()=>{
       const prefix = "Save";
       const random= Math.random().toString(36).substring(2,6).toUpperCase();
       const number = Math.floor(Math.random()* 90 +10);
       return `${prefix}${number}-${random}`;
    }
    
    const [coupon,setCoupon]=useState({
        coupon_code:generateCouponCode,
        discount_rate:"",
        expDate:"",
        ProviderId:"",
    });
    
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setCoupon({...coupon,[name]:value});
    };

   const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/api/coupon", coupon);
             toast.success("Coupon Card created  successfully");
             setCoupon(response);
    } catch (error) {
       console.error("Failed created the coupon card, Try Again!!",error);
       toast.error("Failed created the coupon card, Try Again!!"); 
    }
   }

  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-blue-500 '>
    <h2 className='text-2xl font-bold mb-4 text-center text-blue-600'>Create Coupon</h2>
   <form onSubmit={handleSubmit} className='space-y-4'>
    <div>
        <label className='block text-sm font-medium text-gray-700'>Coupon Code</label>
        <input type="text" name="coupon_code" value={coupon.coupon_code} readOnly className='w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed'/>
    </div>
    
   </form>
    </div>
  )
}
