import axios from 'axios';
import React, { useState } from 'react'

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

   const[selectedCategories,setSelectedCategories]=useState([]);
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

    const handleSubmit=async(e)=>{
    try {
       const response =  await axios.post(`http://localhost:3000/api/service`);
       setFormData(response.data);
       
    } catch (error) {
      console.error("Failed create the service",error);
    }
    }

  return (
    <div>CreateService</div>
  )
}