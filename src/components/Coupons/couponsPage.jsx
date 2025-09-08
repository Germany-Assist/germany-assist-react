import axios from 'axios';
import React, { useEffect, useState } from 'react'

 const CouponsPage = ({userRole}) => {
    const[coupons,setCoupons]=useState([]);
    const fetchCoupons=async()=>{
      try {
          const response = await axios.get("http://localhost:3000/api/coupon/");
          setCoupons(response.data);
          console.log("coupons",response);
      } catch (error) {
        console.error("Failed fetching coupons",error);
      }
        
    }
    const deleteCoupons=async(id)=>{
      try {
         if (!window.confirm("Are you sure you want to delete this coupon?")) return;
         const response =  await axios.delete(`http://localhost:3000/api/coupon/${id}`);
         setCoupons(response.filter((c)=>c.id != id));
      } catch (error) {
        console.error("failed delete this coupons, Try again!",error);
      }
    }
    useEffect(()=>{
       fetchCoupons();
    },[])
  return (
   <div className="flex flex-nowrap gap-6 p-6 overflow-x-auto">
 
        {coupons.slice(0,4).map((coupon)=>(
            <div key={coupon.id}
            className='bg-white rounded-2xl shadow-md p-4 border-2 border-blue-500 hover:shadow-lg transition'>
                <h2 className='text-lg font-bold text-gray-800'>Service Code: {coupon.coupon_code
                }</h2>
                <p className='text-red-600 mt-2'> Discount: <span className='font-semibold'>{coupon.discount_rate * 100}%</span></p>
                 <p className='text-yellow-600'>Expiry: {new Date (coupon.expDate).toLocaleDateString()}</p>
                <p className='text-sm text-gray-600'>Provider Name: {coupon.ProviderId}</p>
                {/* {Action button if the userRole is provider} */}
                {userRole === "provider" &&(
                    <div className='mt-4 flex justify-between'>
                        <a href={`/coupon/edit/${coupon.id}`}
                        className='text-blue-600 font-medium'>
                         Edit
                        </a>
                        <button onClick={()=>deleteCoupons(coupon.id)} className='text-red-600 font-medium'>Delete</button>
                    </div>
                )}
            </div>
        ))}
        {/* {Allow the provider to create coupon} */}
        {(userRole === "provider")&&(
            <a  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center shadow hover:bg-blue-700" href={'/coupons/create'}>
              Add Coupon
            </a>
        )}
    </div>
    
  );
}
export default CouponsPage;