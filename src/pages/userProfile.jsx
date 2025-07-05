import { React, useState, useEffect } from "react";
import axios from "axios";
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
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
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10"></div>;
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
          <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <h3 className="tex-xl font-semibold mb-4">Services</h3>
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
        </div>
      </div>
    </>
  );
};

export default UserProfile;
