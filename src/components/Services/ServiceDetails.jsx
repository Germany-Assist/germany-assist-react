import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { reviews as fetchReviews } from "../Reviews/reviews.jsx";
import { services } from "./services.jsx";
import { slugify } from "./utils.jsx";
import {ReviewSection} from "../Reviews/ReviewSection.jsx"
function ServiceDetails() {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const foundService = services.find((s) => slugify(s.title) === slug);

    setService(foundService || null);
    console.log("service", foundService);
    setLoading(false);
    if (foundService) {
      const serviceWithReviews = fetchReviews.filter(
        (review) => review.serviceId === foundService.id
      );
      setReviews(serviceWithReviews);
      console.log("reviews", serviceWithReviews);
    }
  }, [slug]);


  const defaultImage =
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error) return <div className="text-red-500 p-5">Error ${error}</div>;
  if (!service) return <div className="p-4">Service not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className=" text-3xl  text-blue-800 p-8 mb-10 font-bold">Service Details</h1>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Service Image */}
        <div className="md:w-1/2">
          <img
            src={defaultImage}
            alt={service.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Service Details*/}
        <div className="md:w-1/2 space-y-4 flex flex-col items-start">
          <h2 className="text-2xl font-bold">{service.title}</h2>
          <p className="text-xl text-gray-800">
            description: {service.description}
          </p>
          <p className="text-lg text-blue-800 font-semibold">
            Service_Type: {service.type}
          </p>
          <p className="text-lg font-bold">Price: ${service.price}</p>
        </div>
      </div>

      <hr className="my-6 " />

      <h3 className="text-3xl font-bold mb-4 text-blue-800">Reviews:</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-3 ">
          {reviews.map((r, i) => (
            <li
              key={i}
              className="border border-gray-200 rounded-xl bg-blue-50 p-4  shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 font-semibold text-blue-700 w-1/4">
                  {r.userId}
                </div>
                <div className="w-3/4">
                  <p className="text-left">
                    {r.body || <i>No text provided.</i>}
                  </p>
                </div>
              </div>

              <span className="mt-8 text-sm text-yellow-600 font-medium">
                Rating: {r.rating}⭐
              </span>
            </li>
          ))}
        </ul>
      )}
       <div className="mt-12 rounded-xl shadow:xl ">
        <ReviewSection  serviceId={services.id}/>
       </div>
      
    </div>
  );
}

export default ServiceDetails;
