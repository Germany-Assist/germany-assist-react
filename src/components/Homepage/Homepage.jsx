import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

      
  const categories = [
    { id: "all", name: "All Services", icon: "🌟" },
    { id: "translation", name: "Translation", icon: "📝" },
    { id: "paperwork", name: "Paperwork", icon: "📋" },
    { id: "career-coaching", name: "Career Coaching", icon: "💼" },
    { id: "language", name: "Language Learning", icon: "🗣️" },
    { id: "relocation", name: "Relocation", icon: "🏠" },
  ];

 const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/service");
      const data = await response.json();
      console.log("data", data);
      setServices(data);
      setFilteredServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    // Simply set filtered services to all services for homepage
    // Featured services will be filtered in the component rendering
    setFilteredServices(services);
  }, [services]);

  const ServiceCard = ({ service }) => (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        service.views ? "ring-2 ring-blue-500 ring-opacity-50" : ""
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
        {service.views && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full shadow-md">
            <span className="text-xs font-bold">✨{service.views} Views</span>
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
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {/* {service.badges.map((badge, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))} */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              ⭐ {service.rating} ({service.reviewCount} reviews)
            </span>
          </div>
          <Link
            to={`/serviceDetails/${service.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Gateway to Working in Germany
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100 leading-relaxed">
            We connect ambitious professionals with trusted experts who make
            relocating to Germany seamless
          </p>
          <p className="text-lg md:text-xl mb-10 text-blue-200 max-w-3xl mx-auto">
            From visa applications and document translation to career coaching
            and housing assistance — everything you need to start your new life
            in Germany, all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Link
              to="/services"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Services
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Learn Our Story
            </Link>
          </div>

          {/* Quick Access for Testing */}
          <div className="mt-6">
            <Link
              to="/onboarding"
              className="text-blue-200 hover:text-white text-sm underline"
            >
              Test Candidate Onboarding
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-200">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Vetted Professionals</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Transparent Pricing</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Germany Assist Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get connected with trusted professionals in just three simple
              steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Browse Services
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore our curated list of trusted service providers across
                different categories like translation, visa assistance, and
                career coaching.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Connect & Compare
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Review profiles, ratings, and pricing. Contact providers
                directly to discuss your specific needs and get personalized
                quotes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Start Your Journey
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Work with your chosen provider to complete your documents,
                applications, or coaching sessions and move closer to your
                German dream.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Views Services
            </h2>
            <p className="text-gray-600">
              Handpicked by Germany Assist experts
            </p>
          </div>
          <Link
            to="/services"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            View All Services
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Show only featured services (limit to 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {
    filteredServices
      .filter((service) => service.views)
      .slice(0, 6)
      .map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
        </div>

        {filteredServices.filter((service) => service.views).length ===
          0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Views of services are available
            </h3>
            <p className="text-gray-500">
              Check back soon for curated recommendations
            </p>
          </div>
        )}
      </div>

      {/* Quick Categories Preview */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most requested services to jumpstart your German
              journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(1, 5).map((category) => {
              const categoryServices = services.filter(
                (service) => service.category === category.id
              );
              const avgRating =
                categoryServices.length > 0
                  ? (
                      categoryServices.reduce(
                        (sum, service) => sum + service.rating,
                        0
                      ) / categoryServices.length
                    ).toFixed(1)
                  : 0;

              return (
                <Link
                  key={category.id}
                  to={`/services?category=${category.id}`}
                  className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-center transition-all duration-200 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {categoryServices.length} providers
                  </p>
                  {avgRating > 0 && (
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <span>⭐ {avgRating} avg rating</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Browse All Categories
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your German Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Join thousands of professionals who have successfully moved to
              Germany with our help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started Today
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Service Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                2,500+
              </div>
              <div className="text-gray-300">Successful Placements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">4.9</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
