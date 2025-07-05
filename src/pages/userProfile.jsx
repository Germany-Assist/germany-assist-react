import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "http://localhost:3000/api";
  const userId = 1; 

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [userRes, serviceRes, reviewRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/user/${userId}`, {
          params: { password: "password123" },
        }),
        axios.get(`${BACKEND_URL}/service/${userId}`),
        axios.get(`${BACKEND_URL}/review/${userId}`),
      ]);

      console.log("User API response:", userRes.data);

      const userData = userRes.data.user;
      if (userData) {
        setUser({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          image: userData.image,
        });
      }
      setServices(serviceRes.data.userService || []);
      setReviews(reviewRes.data.userReviews || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">Failed to load user info.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-6">
        <img
          src={user.image || "/avatar.png"}  // Use 'public/avatar.png' for fallback
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">Name: {user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Services</h3>
        {services.length === 0 ? (
          <p className="text-gray-500">No Services added yet..</p>
        ) : (
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.id} className="p-3 bg-gray-50">
                <h4 className="font-medium">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border p-3 rounded-lg">
                <p className="font-medium">{review.reviewName}</p>
                <p className="text-gray-700">{review.comment}</p>
                <div className="text-yellow-500">Rating: {review.rating} / 5</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
