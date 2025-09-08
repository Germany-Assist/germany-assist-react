import React from 'react'

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
  return (
    <div>CreateCoupon</div>
  )
}
