import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const couponsPage = () => {
    const[coupons,setCoupons]=useState([]);
    const fetchCoupons=async()=>{
      try {
          const response = await axios.get("http://localhost:3000//api/coupon/");
          setCoupons(response);
          console.log("coupons",response);
      } catch (error) {
        console.error("Failed fetching coupons",error);
      }
        
    }
    const deleteCoupons=async(id)=>{
      try {
         if (!window.confirm("Are you sure you want to delete this coupon?")) return;
         const response =  await axios.delete(`http://localhost:3000//api/coupon/${id}`);
         setCoupons(response.filter((c)=>c.id != id));
      } catch (error) {
        console.error("failed delete this coupons, Try again!",error);
      }
    }
    useEffect(()=>{
       fetchCoupons();
    },[])
  return (
    <div>couponsPage</div>
  )
}
