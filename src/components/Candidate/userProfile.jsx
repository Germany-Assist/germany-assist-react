import React, { useState, useEffect } from "react";
import axios from "axios";
import { CandidateSideBar } from "./CandidateSideBar";
import { useAuth } from "../../pages/AuthProvider";
import { BACKEND_URL } from "../../config/api";
import {usePagination} from "../hooks/usePagination";
import {Pagination} from "../../pages/Pagination.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
const UserProfile = () => {
  const { userId, accessToken } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  //Pagination uses
  const servicePagination = usePagination(services, 4);
  const reviewPagination = usePagination(reviews, 4);
  const favoritePagination = usePagination(favoriteServices.favorite, 3);

  useEffect(() => {
    if (userId && accessToken) {
      fetchAllData();
    }
  }, [userId, accessToken]);
  useEffect(() => {
    if (user) {
      console.log("User state updated:", user);
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      const [userRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          // withCredentials: true,
        }),
      ]);

      const userData = userRes.data;
      console.log("User API response:", userRes.data);
      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        image: userData.image,
        isVerified: userData.isVerified,
        createdAt: userData.createdAt,
      });
      setFavoriteServices(userData);

      console.log("User  Rs API response:", userRes.data);

      console.log("User state after set:", user);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  // if (!user)
  //   return (
  //     <div className="text-center mt-10 text-red-500">
  //       Failed to load user info.
  //     </div>
  //   );

  return (
    // Profile Section

    <div className="flex min-h-screen bg-gray-100">
      <CandidateSideBar />

      {/* MainContent */}
      <div className="flex-1 p-6 space-y-6 ">
        {/* Profile Card */}

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md flex items-center space-x-6 hover:shadow-3xl transition transform hover:scale-[1.01]">
          <img
            src={user?.image || "../assets/avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
          />

          <div className="flex-1 space-y-2 text-2xl text-blue-800 font-medium">
            <h2>
              {user?.firstName} {user?.lastName}
            </h2>
            <h2 className="text-xl font-extrabold text-blue-800"></h2>

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
                <span>
                  {new Date(user?.createdAt).toLocaleDateString() || ""}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            Services
          </h3>
          {servicePagination?.currentData?.length === 0 ? (
            <p className="text-gray-500">No Services added yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicePagination?.currentData?.map((service) => (
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
                  totalPages={servicePagination.totalPages}
                  currentPage={servicePagination.currentPage}
                  onPageChange={servicePagination.setCurrentPage}
                />
              </div>
            </>
          )}
        </div>

        {/* Favorite Services */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            Favorite Services <i className="fa-solid fa-heart text-red-500"></i>
          </h3>
          {favoritePagination?.currentData?.length === 0 ? (
            <p className="text-gray-500">No Services added yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 text-align-left">
                {favoritePagination?.currentData?.map((service) => (
                  <div
                    key={service.favoriteId}
                    className="border p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex flex-col space-y-2 text-sm text-gray-900">
                      <span>Favorite Service: {service.favoriteId}</span>
                      <span> Thumbnail: {service.thumbnail}</span>
                      <span>Item Title: {service.itemId}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Pagination
                  totalPages={favoritePagination.totalPages}
                  currentPage={favoritePagination.currentPage}
                  onPageChange={favoritePagination.setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
        {/* Reviews Sections */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Reviews</h3>

          {reviewPagination?.currentData?.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviewPagination?.currentData?.map((review) => (
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

                    <p className="mt-3 text-gray-700 flex-grow">
                      {review.body}
                    </p>

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
                  totalPages={reviewPagination.totalPages}
                  currentPage={reviewPagination.currentPage}
                  onPageChange={reviewPagination.setCurrentPage}
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
