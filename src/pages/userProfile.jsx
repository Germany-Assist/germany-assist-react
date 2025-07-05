import { React, useState, useEffect } from "react";
import axios from "axios";
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [service, setServices] = useState([]);
  const [review, setReview] = useState([]);
  // const[error,setError]=useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileDate = async () => {
    try {
      const userAPI = await axios.get(`api/users/${userId}`);
      const serviceAPI = await axios.get(`api/service/${userId}`);
      const reviewAPI = await axios.get(`api/review/${userId}`);

      setUser(userAPI.data);
      setServices(serviceAPI.data);
      setReview(reviewAPI.data);
    } catch (error) {
      console.error(`Failed fetching the error ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        {/* User Profile Info */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-6 mb-6">
          <img
            src={user.picProfile || "/src/assets/avatar.png"}
            alt="Profile"
            className="w-24  h-24 rounded-full object-cover "
          />
          <div>
            <h2 className="text-2xl font-bold ">Name: {user.name}</h2>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">Job: {user.job}</p>
          </div>
          {/* Service section */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
