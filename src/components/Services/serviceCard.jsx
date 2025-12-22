import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const ServiceCard = ({ service, onDelete, isProvider = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        service.rating ? "ring-2 ring-blue-500 ring-opacity-50" : ""
      }`}
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.provider}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-sm font-semibold text-gray-800">
            ⭐ {service.rating}
          </span>
        </div>
        <div className="absolute top-4 left-2 bg-white rounded-full px-3 py-1 shadow-md">
          {isProvider && (
            <div className="flex gap-3">
              {/* Edit the service */}
              <button
                onClick={() => navigate("/provider/services/:id/edit")}
                className="p-2 rounded-lg hover:bg-red-500"
              >
                <Pencil size={18} className="text-gray-600" />
              </button>

              {/* Create New Timeline */}
              <button
                onClick={() =>
                  navigate(`/provider/services/${service.id}/timeline/new`)
                }
                className="p-2 rounded-lg hover:bg-green-100"
                title="Create New Timeline"
              >
                <PlusCircle size={18} className="text-green-600" />
              </button>
              {/* Delete the service */}
              <button
                onClick={() => onDelete(service.id)}
                className="p-2 rounded-lg hover:bg-red-100"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          )}
        </div>
        {service.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full shadow-md">
            <span className="text-xs font-bold">✨ FEATURED</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {service.title}
          </h3>
          <span className="text-lg font-bold text-blue-600">
            {service.price}
          </span>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-500">by</span>
          <span className="text-sm font-semibold text-gray-900 ml-1">
            {service.provider}
          </span>
          <span className="text-gray-300 mx-2">•</span>
          <span className="text-sm text-gray-500">{service.location}</span>
          <span className="text-sm text-gray-500">
            ⭐ {service.rating} ({service.reviewCount} reviews)
          </span>
        </div>

        {/* <div className="flex flex-wrap gap-2 mb-4">
        {service.badges.map((badge, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {badge}
          </span>
        ))}
      </div> */}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to={`/serviceDetails/${service.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              View Details
            </Link>
          </div>

          <button
            onClick={() =>
              navigate(`/provider/services/${service.id}/post`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            // title="New Post"
          >
          New Post 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
