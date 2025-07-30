import { StarIcon } from "@heroicons/react/24/solid";
import { services } from "./services";
import { Link } from "react-router-dom";
import { slugify } from "./utils.jsx";
export const ServiceCard = ({ service }) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  const backgroundImage = service.img || defaultImage;

  return (
    <div className="flex-shrink-0 w-72 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white mx-2">
      {/* Image section */}
      <div
        className="w-full h-40 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
          {service.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(service.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              ({service.total_reviews || 250})
            </span>
          </div>
          <span className="text-red-500 font-bold">
            ${service.price?.toFixed(2) || "49.99"}
          </span>
        </div>

        {service && (
          <div className="mt-3"key={service.id}>
           <Link to={`/serviceDetails/${slugify(service.title)}`}>
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
                {service.type?.replace("-", " ") || "Web Development"}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export const ServicesCarousel = () => {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto py-4 px-2 scrollbar-hide">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};
