import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "../components/pagination";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicePage,setServicePage]=useState(1);
  const[reviewPage,setReviewsPage]=useState(1);

  const servicePerPage=3;
  const reviewPerPage=3;
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


    // Define the pagination Logic 
    const totalServicesPages=Math.ceil(services.length/servicePerPage);
    const totalReviewPages=Math.ceil(reviews.length/reviewPerPage);
   
   
    const currentServices = services.slice(
    (servicePage - 1) * servicePerPage,
    servicePage * servicePerPage
  );

  const currentReviews = reviews.slice(
    (reviewPage - 1) * reviewPerPage,
    reviewPage * reviewPerPage
  );
    if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load user info.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-6">
        <img
          src={user.image || "/avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">Name: {user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>
     
    {/* Services */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Services</h3>
        {services.length === 0 ? (
          <p className="text-gray-500">No Services added yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentServices.map((service) => (
                <div
                  key={service.id}
                  className="border p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-40 w-full object-cover mb-3 rounded"
                    />
                  )}
                  <h4 className="font-bold text-lg mb-1 text-blue-700">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <div className="flex justify-between text-sm text-gray-900">
                    <span>Type: {service.type}</span>
                    <span>Price: ${service.price}</span>
                  </div>
                  <div className="mt-2 text-yellow-500">
                    ⭐ {service.rating} / 5 ({service.total_reviews} reviews)
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Pagination
                totalPages={totalServicesPages}
                currentPage={servicePage}
                onPageChange={setServicePage}
              />
            </div>
          </>
        )}
      </div>

       {/* Reviews Section! */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {currentReviews.map((review) => (
                <li key={review.id} className="border p-3 rounded-lg shadow hover:shadow-md transition">
                  <p className="font-medium">{review.reviewName}</p>
                  <p className="text-gray-700">{review.comment}</p>
                  <div className="text-yellow-500">
                    Rating: {review.rating} / 5
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center mt-6">
              <Pagination
                totalPages={totalReviewPages}
                currentPage={reviewPage}
                onPageChange={setReviewsPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
