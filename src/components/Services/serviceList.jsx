import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // TODO: Replace with actual API endpoint
  // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  // Germany Assist service categories
  const categories = [
    { id: "all", name: "All Services", icon: "🌟" },
    { id: "translation", name: "Translation", icon: "📝" },
    { id: "paperwork", name: "Paperwork", icon: "📋" },
    { id: "career-coaching", name: "Career Coaching", icon: "💼" },
    { id: "language", name: "Language Learning", icon: "🗣️" },
    { id: "relocation", name: "Relocation", icon: "🏠" },
    { id: "legal", name: "Legal Services", icon: "⚖️" },
    { id: "financial", name: "Financial Advisory", icon: "💰" },
  ];

  // TODO: Replace with actual API call
  const fetchServices = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/api/services`);
      // if (!response.ok) throw new Error('Failed to fetch services');
      // const data = await response.json();

      // Demo data matching Germany Assist context
      const demoServices = [
        {
          id: 1,
          title: "German Document Translation",
          category: "translation",
          provider: "LinguaGermany",
          rating: 4.8,
          reviewCount: 156,
          price: "€25/page",
          priceNumeric: 25,
          location: "Berlin",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
          description:
            "Professional translation of official documents for visa and work permit applications.",
          badges: ["Certified", "Fast Delivery"],
          experience: "5+ years",
          featured: true,
          views: 1250,
          type: "translation",
        },
        {
          id: 2,
          title: "Visa Application Assistance",
          category: "paperwork",
          provider: "GermanyVisa Pro",
          rating: 4.9,
          reviewCount: 203,
          price: "€150/application",
          priceNumeric: 150,
          location: "Munich",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
          description:
            "Complete assistance with German visa applications, from document preparation to submission.",
          badges: ["Government Approved", "Success Rate 98%"],
          experience: "10+ years",
          featured: true,
          views: 2100,
          type: "paperwork",
        },
        {
          id: 3,
          title: "Career Coaching for Tech Professionals",
          category: "career-coaching",
          provider: "TechCareer Germany",
          rating: 4.7,
          reviewCount: 89,
          price: "€80/hour",
          priceNumeric: 80,
          location: "Hamburg",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
          description:
            "Specialized career coaching for software developers and IT professionals seeking jobs in Germany.",
          badges: ["Tech Specialist", "Interview Prep"],
          experience: "8+ years",
          featured: false,
          views: 890,
          type: "career-coaching",
        },
        {
          id: 4,
          title: "German Language Tutoring",
          category: "language",
          provider: "SpeakGerman Now",
          rating: 4.6,
          reviewCount: 124,
          price: "€30/hour",
          priceNumeric: 30,
          location: "Online",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
          description:
            "One-on-one German language tutoring focused on professional communication and job interviews.",
          badges: ["Native Speaker", "Business German"],
          experience: "7+ years",
          featured: true,
          views: 1560,
          type: "language",
        },
        {
          id: 5,
          title: "Housing Search Assistant",
          category: "relocation",
          provider: "HomeSeeker Germany",
          rating: 4.5,
          reviewCount: 67,
          price: "€200/search",
          priceNumeric: 200,
          location: "Frankfurt",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
          description:
            "Help finding suitable accommodation in major German cities with local expertise.",
          badges: ["Local Expert", "Quick Results"],
          experience: "6+ years",
          featured: false,
          views: 780,
          type: "relocation",
        },
        {
          id: 6,
          title: "Tax Registration & Setup",
          category: "paperwork",
          provider: "TaxPro Germany",
          rating: 4.8,
          reviewCount: 91,
          price: "€120/setup",
          priceNumeric: 120,
          location: "Düsseldorf",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=face",
          description:
            "Complete tax registration and setup for new residents and workers in Germany.",
          badges: ["Tax Certified", "Multilingual"],
          experience: "12+ years",
          featured: false,
          views: 920,
          type: "paperwork",
        },
        {
          id: 7,
          title: "Legal Consultation for Expats",
          category: "legal",
          provider: "LegalEase Germany",
          rating: 4.9,
          reviewCount: 145,
          price: "€100/hour",
          priceNumeric: 100,
          location: "Berlin",
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&crop=face",
          description:
            "Legal advice for residence permits, employment contracts, and German law compliance.",
          badges: ["Bar Certified", "Expat Specialist"],
          experience: "15+ years",
          featured: false,
          views: 1120,
          type: "legal",
        },
        {
          id: 8,
          title: "Financial Planning for Newcomers",
          category: "financial",
          provider: "FinanceWise DE",
          rating: 4.6,
          reviewCount: 73,
          price: "€90/session",
          priceNumeric: 90,
          location: "Munich",
          image:
            "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop",
          description:
            "Financial planning services including banking setup, insurance, and investment advice for expats.",
          badges: ["Certified Advisor", "Multilingual"],
          experience: "9+ years",
          featured: false,
          views: 650,
          type: "financial",
        },
      ];

      setServices(demoServices);
      setFilteredServices(demoServices);
    } catch (err) {
      setError("Failed to load services. Please try again later.");
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort the filtered results
    const sortedFiltered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low-high":
          return a.priceNumeric - b.priceNumeric;
        case "price-high-low":
          return b.priceNumeric - a.priceNumeric;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredServices(sortedFiltered);
  }, [selectedCategory, searchTerm, services, sortBy]);

  const ServiceCard = ({ service, onEdit, onDelete, isProvider = false }) => (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        service.featured ? "ring-2 ring-blue-500 ring-opacity-50" : ""
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
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {service.badges.map((badge, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))}
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
          {isProvider && (
            <div className="flex gap-3 ">
              <button
                onClick={() => onEdit(service)}
                className="p-2 rounded-lg hover:bg-red-500"
              >
                {" "}
                <Pencil size={18} className="text-gray-600" />
              </button>

              <button
                onClick={() => onDelete(service.id)}
                className="p-2 rounded-lg hover:bg-red-100"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Services...
            </h2>
            <p className="text-gray-600">
              Finding the best service providers for your German journey
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Services
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchServices}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">All Services</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover trusted professionals to help you succeed in Germany
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-gray-900 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Categories Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any Price</option>
                <option value="0-50">€0 - €50</option>
                <option value="50-100">€50 - €100</option>
                <option value="100-200">€100 - €200</option>
                <option value="200+">€200+</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Locations</option>
                <option value="berlin">Berlin</option>
                <option value="munich">Munich</option>
                <option value="hamburg">Hamburg</option>
                <option value="frankfurt">Frankfurt</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.0">4.0+ ⭐</option>
                <option value="3.5">3.5+ ⭐</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any Experience</option>
                <option value="10+">10+ years</option>
                <option value="5+">5+ years</option>
                <option value="3+">3+ years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <svg
            className="w-4 h-4"
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
          <span className="text-gray-900 font-medium">Services</span>
          {selectedCategory !== "all" && (
            <>
              <svg
                className="w-4 h-4"
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
              <span className="text-gray-900 font-medium">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </>
          )}
        </nav>

        {/* Results Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory === "all"
                ? "All Services"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h1>
            <p className="text-gray-600">
              {filteredServices.length} service
              {filteredServices.length !== 1 ? "s" : ""} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md bg-blue-600 text-white">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Best Rating</option>
                <option value="featured">Featured First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
