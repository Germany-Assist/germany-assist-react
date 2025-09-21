import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { reviews as fetchReviews } from "../Reviews/reviews.jsx";
import { BACKEND_URL } from "../../config/api.js";
import { ReviewSection } from "../Reviews/ReviewSection.jsx";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/service/${id}`);
      const serviceData = Array.isArray(res.data) ? res.data[0] : res.data;
      setService(serviceData);
      setReviews(res.data[0].Reviews);
      console.log("service data", res.data);
    } catch (error) {
      console.error("failed fetching data of this service", error);
    }
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  if (error) return <div className="text-red-500 p-5">Error ${error}</div>;
  if (!service) return <div className="p-4">Service not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl text-blue-800 p-4 mb-8 font-bold text-center">
        Service Details
      </h1>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Service Image */}
        <div className="md:w-1/2">
          <img
            src={service.image || defaultImage}
            alt={service.title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Service Info */}
        <div className="md:w-1/2 space-y-4 flex flex-col items-start">
          <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
          <p className="text-lg text-gray-700">{service.description}</p>

          <div className="text-blue-900 font-semibold">
            Type:{" "}
            <span className="text-gray-700 font-normal">{service.type}</span>
          </div>

          <div className="text-lg font-bold text-green-700">
            Price: ${service.price}
          </div>

          <div className="flex items-center space-x-2 text-yellow-600">
            <i className="fas fa-star" />
            {service.rating} ({service.total_reviews} reviews)
          </div>

          <div className="flex gap-2 flex-wrap">
            {service.categories?.map((cat, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <hr className="my-8 border-gray-300" />
      <h3 className="text-3xl font-bold mb-6 text-blue-800">Reviews</h3>
      {service.Reviews?.length == 0 ? (
        <p className="text-gray-500 text-xl">No Reviews yet</p>
      ) : (
        <ul className="space-y-6">
          {service.Reviews.map((r, i) => (
            <li
              key={i}
              className="flex flex-col md:flex-row items-start md:items-center border border-gray-200 rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full  bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                {r.userName?.[0] || "U"}
              </div>

              {/* Review Content */}
              <div className="mt-3 md:mt-0 md:ml-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-blue-800">{r.userName}</h2>
                  <span className="text-yellow-500 font-semibold text-sm">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                    <span className="text-gray-400 font-normal">
                      ({r.rating})
                    </span>
                  </span>
                </div>
              <p className="text-gray-700">
                {r.body || <i>"No text body review yet"</i>}
              </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Review Form */}
      <div className="mt-12 rounded-xl shadow-lg ">
        <ReviewSection serviceId={service.id} />
      </div>
    </div>
  );
}

export default ServiceDetails;
