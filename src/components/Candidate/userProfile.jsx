import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "../pagination";
import { CandidateSideBar } from "./CandidateSideBar";
import { useAuth } from "../../pages/AuthProvider";

const UserProfile = () => {
  const {userId}=useAuth();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicePage, setServicePage] = useState("");
  const [reviewPage, setReviewsPage] = useState("");

  const servicePerPage = 3;
  const reviewPerPage = 3;
  const BACKEND_URL = "http://localhost:3000/api";

 useEffect(() => {
    console.log("Current userId:", userId);
    if (userId) {
      fetchAllData();
    }
  }, [userId]);

  const fetchAllData = async () => {
    try {
      const [userRes, serviceRes, reviewRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/user/profile`, {
          params: { userId },
          withCredentials: true, 
        }),
        axios.get(`${BACKEND_URL}/service/${userId}`, { withCredentials: true }),
        axios.get(`${BACKEND_URL}/review/${userId}`, { withCredentials: true }),
      ]);

      console.log("User API response:", userRes.data);

      const userData = userRes.data.user;
      if (userData) {
        setUser({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          image: userData.image,
          isVerified: userData.isVerified,
          createdAt: userData.createdAt,
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

  // if (loading) return <p>Loading profile...</p>;

  // Define the pagination Logic
  const totalServicesPages = Math.ceil(services.length / servicePerPage);
  const totalReviewPages = Math.ceil(reviews.length / reviewPerPage);

  const currentServices = services.slice(
    (servicePage - 1) * servicePerPage,
    servicePage * servicePerPage
  );

  const currentReviews = reviews.slice(
    (reviewPage - 1) * reviewPerPage,
    reviewPage * reviewPerPage
  );
 
  // if (!user)
  //   return (
  //     <div className="text-center mt-10 text-red-500">
  //       Failed to load user info.
  //     </div>
  //   );

  return (
    // Profile Section
   
    <div className="flex min-h-screen bg-gray-100">

       <CandidateSideBar/>
          
          {/* MainContent */}
      <div className="flex-1 p-6 space-y-6 ">
        {/* Profile Card */}
       
     
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md flex items-center space-x-6 hover:shadow-3xl transition transform hover:scale-[1.01]">
        <img
          src={user?.image || "../assets/avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
        />

        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-extrabold text-blue-800">{user?.name || ""}</h2>

          <div className="text-gray-600">
            <p className="flex items-center">
              <span className="font-semibold w-24">Email:</span>
              <span>{user?.email || ""}</span>
            </p>

            <p className="flex items-center">
              {/* <span className="font-semibold w-24">Verified:</span>
              <span
                className={
                  user.isVerified
                    ? "text-green-600 font-medium"
                    : "text-red-500"
                }
              >
                {user.isVerified ? "Yes" : "No"}
              </span> */}
            </p>

            <p className="flex items-center">
              <span className="font-semibold w-24">Joined:</span>
              <span>{new Date(user?.createdAt).toLocaleDateString() || ""}</span>
            </p>
          </div>
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
 {/* Reviews Sections */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentReviews.map((review) => (
                <div
                  key={review.id}
                  className="border p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50 flex flex-col h-full"
                >
                  <div className="mb-2">
                    <h4 className="font-semibold text-blue-700 text-lg">
                      {review.service?.title || "Service Not Found"}
                    </h4>

                    <a
                      href={`/service/${review.service?.id}`}
                      className="text-blue-500 underline text-sm hover:text-blue-700"
                    >
                      View Service
                    </a>
                  </div>

                  <p className="mt-3 text-gray-700 flex-grow">{review.body}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-yellow-500 font-medium">
                      ⭐ {review.rating} / 5
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

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
    </div>
  );
};

export default UserProfile;
