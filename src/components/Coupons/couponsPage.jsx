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
    <div className='grid grid-col-1 sm:grid-col-2 md:grid-col-3 gap-6 p-6 '>
        {coupons.map((coupon)=>(
            <div key={coupon.id}
            className='bg-white rounded-2xl shadow-md p-4  border border-blue-400 border-size-5 hover:shadow-lg transition'>
                <h2 className='text-lg font-bold text-gray-800'>{coupon.coupon_code
                }</h2>
                <p className='text-gray-600mt-2'> Discount: <span className='font-semibold'>{coupon.discount_rate * 100}%</span></p>
                 <p className='text-yellow-600'>Expiry: {new Date (coupon.expDate).toLocaleDateString()}</p>
                <p className='text-sm font-medium'>Provider Name: {coupon.ProviderId}</p>
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