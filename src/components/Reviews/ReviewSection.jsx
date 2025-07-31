import React, { useState } from "react";
import axios from "axios";
import AuthInputs from "../AuthInputs";
import InputFields from "../InputFields";

export const ReviewSection = ({ serviceId }) => {
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const response = await axios.post(
        `/api/services/${serviceId}/Reviews`,
        {
          text: newReview,
          author: "currentUser",
          date: new Date().toISOString(),
          rating: 5,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNewReview("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to post Review"
      );
    }
  };

  return (
    <div className="bg-blue-50  rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Customer Reviews
      </h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <label
          id="userName"
          className='className=" text-left block text-xl font-medium text-blue-700 mb-1 "'
        >
          User Name
        </label>
        <InputFields type="text" id="userName" placeholder="User Name" />
        <label
          id="userName"
          className='className=" text-left block text-xl font-medium text-blue-700 mb-1 p-3 "'
        >
          User Review
        </label>
        <textarea
          value={newReview}
          onChange={(e) => setReviews(e.value.target)}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <AuthInputs
          label="Submit"
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 w-fit"
        >
          Post Review
        </AuthInputs>
      </form>
    </div>
  );
};
