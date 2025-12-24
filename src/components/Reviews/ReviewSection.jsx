import React, { useState } from "react";
import axios from "axios";
import AuthInputs from "../AuthInputs";
import InputFields from "../InputFields";
import { BACKEND_URL } from "../../config/api";
import { useAuth } from "../../pages/AuthProvider";
export const ReviewSection = ({ serviceId }) => {
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId, user, accessToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    if (!serviceId) {
      setError("Service ID is missing!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        `${BACKEND_URL}/api/review`,
        {
          body: newReview,
          id: serviceId,
          author: user.userName || userId,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      setReviews((prev) => [...prev, response.data]);
      setNewReview("");
      setRating(0);
      if (response.status === 201) {
        window.alert("successful added new review ");
      }
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
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label
            htmlFor="rating"
            className="block text-xl font-medium text-blue-700 mb-1"
          >
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-xl font-medium text-blue-700 mb-1"
          >
            Your Review
          </label>
          <textarea
            id="review"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Write your review..."
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          label={loading ? "Posting..." : "Submit Review"}
          type="submit"
          disabled={loading}
          className={`mt-3 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 w-fit 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg active:scale-95"
    }`}
        >
          {loading ? "Posting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};
