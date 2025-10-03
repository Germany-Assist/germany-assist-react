import axios from "axios";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BACKEND_URL } from "../../config/api";
export const FavoriteService = ({ serviceId, initiallyFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);

  const toggleFavorite = async () => {
    try {
        const url = `${BACKEND_URL}/service/client/favorite`;
    
    if (isFavorite) {
      const res = await axios.delete(url, { data: { id: serviceId } });
      if (res.status !== 200) throw new Error("Failed removing favorite");
    } else {
      const res = await axios.post(url, { id: serviceId });
      if (res.status !== 201) throw new Error("Failed adding favorite");
    }

    setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error using favorite icon", error);
    }
  };

  return (
    <button onClick={toggleFavorite} className="focus:outline-none">
      <i
        className={`fa-solid fa-heart text-sm transition-colors duration-300 ${
          isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }`}
      />
    </button>
  );
};
