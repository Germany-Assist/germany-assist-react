import { StarIcon } from "@heroicons/react/24/solid";
export const ServiceCard = ({ service }) => {
  return (
    <div className="max-w-screen rounded overflow-hidden shadow-lg bg-white  hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-8 object-cover"
        src={service.img}
        // alt={service.title}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/400x200?text=Service+Image";
        }}
      />
      <div className="px-4 py-6 ">
        <div className="font-bold text-xl mb-2">{service.title}</div>
        <p className="text-gray-700 text-base line-clamp-3">
          {service.description}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2 ">
        <div className="flex items-center mb-2 ">
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(service.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />;
            })}
          </div>
          <span className="text-gray-600 ml-1 ">({service.total_reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${service.price.toFixed(2)}</span>
          <span className="text-gray-600 ">{service.views}Views</span>
        </div>
        <div className="mt-4 mb-2 ">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
            {service.type.replace("-", "")}
          </span>
        </div>
      </div>
    </div>
  );
};
