import axios from "axios";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BACKEND_URL } from "../../config/api";
import { useAuth } from "../../pages/AuthProvider";

export const FavoriteService = ({ serviceId, initiallyFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);
  const { accessToken } = useAuth();
const toggleFavorite = async () => {
  if (!accessToken) {
    alert("You need to log in.");
    return;
  }

  // 1. Determine the NEW state locally
  const nextFavoriteStatus = !isFavorite;
  
  // 2. Optimistic Update
  setIsFavorite(nextFavoriteStatus);

  try {
    const url = `${BACKEND_URL}/service/client/favorite/${serviceId}`;

    if (!nextFavoriteStatus) {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
   
      });
    
      if (res.status < 200 || res.status >= 300) throw new Error();
    } else {
   
      const res = await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
   
      });
      if (res.status < 200 || res.status >= 300) throw new Error();
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);

    setIsFavorite(!nextFavoriteStatus);
  }
};

  return (
    <button
      onClick={toggleFavorite}
      
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <i
        className={`fa-solid fa-heart text-sm transition-all duration-300 ${
          isFavorite ? "text-red-500 scale-110" : "text-gray-400 "
        }`}
      />
    </button>
  );
};
