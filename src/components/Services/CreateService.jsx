import axios from "axios";
import React, { useState } from "react";

export const CreateService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    ContractId: 1,
    image: "",
    categories: [],
    publish: false,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesList = [
    "visa-paperwork",
    "translation",
    "language-learning",
    "web-development",
    "design",
  ];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setFormData((prev) => ({
      ...prev,
      categories: selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/service`);
      setFormData(response.data);
    } catch (error) {
      console.error("Failed create the service", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a New Service</h2>
      <form submit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Service Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          ></input>
        </div>
        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write a detailed description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            rows={4}
          />
        </div>
        {/* Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="4999.99"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>
        {/* Image */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/service.jpg"
            value={formData.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>
        {/* Categories */}
        <div>
          <label className="block font-medium">Categories</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {categoriesList.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryToggle(category)}
                />
                ;
              </label>
            ))}
            ,
          </div>
          {/* Publish */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="publish"
              checked={formData.publish}
              onChange={handleChange}
            />
            <label>Publish instantly (Service Provider only)</label>
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};
