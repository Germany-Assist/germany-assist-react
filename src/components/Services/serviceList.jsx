import { services } from "./services.jsx";
// import { ServiceCard } from './serviceCard.jsx';
import { ServicesCarousel } from "./serviceCard.jsx";

export const ServiceList = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-500">
        Popular Services
      </h2>
      <ServicesCarousel services={services} />
    </div>
  );
};
