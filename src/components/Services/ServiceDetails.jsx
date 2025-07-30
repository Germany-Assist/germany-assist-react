import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentSection from "../comments/CommentSection";
import ServiceInfo from "./ServiceInfo.jsx";

import { services } from "./services.jsx";
import { slugify } from "./utils.jsx";
function ServiceDetails() {
const { slug } = useParams();
 
  const [service, setService] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  
useEffect(() => {
  const foundService = services.find((s) => slugify(s.title) === slug);
  setService(foundService || null);
  setLoading(false);
}, [slug]);


 
const handleAddServiceReview=()=>{
  if(newReview.trim()){   
    setReviews((prev)=>[
      ...prev,
      {
        body:newReview,
        rating:service.rating,
        userId:1,
         serviceSlug: slug,
      }
    ]);

    setNewReview("");
  }
}


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error) return <div className="text-red-500 p-5">Error ${error}</div>;
  if (!service) return <div className="p-4">Service not found</div>;

   return (
    <div className="p-6 max-w-3xl mx-auto">
        <div className="md:w-1/2">
             <Img
              src={service.image}
              alt={service.title}
              className="w-full h-auto rounded-lg shadow-md"
             />
        </div>


      <h2 className="text-2xl font-bold">{service.title}</h2>
      <p className="text-gray-600 mt-2">{service.description}</p>
      <p className="mt-2 text-sm text-blue-800 font-semibold">{service.type}</p>
      <p className="mt-2 text-lg font-bold">${service.price}</p>
    
      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r, i) => (
            <li
              key={i}
              className="border border-gray-200 rounded p-3 bg-gray-50"
            >
              <p>{r.body || <i>No text provided.</i>}</p>
              <span className="text-sm text-yellow-600">Rating: {r.rating}⭐</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Leave a Review</h4>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-2"
          placeholder="Write your review here..."
        />
        <button
          onClick={handleAddServiceReview}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default ServiceDetails;
