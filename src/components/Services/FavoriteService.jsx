import axios from "axios";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { API_URL } from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";

export const FavoriteService = ({ serviceId, initiallyFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);
  const { accessToken } = useAuth();

  const toggleFavorite = async () => {
    if (!accessToken) {
      alert("You need to log in to favorite services.");
      return;
    }

    setIsFavorite((prev) => !prev);

    try {
      const url = `${API_URL}/api/service/client/favorite/${serviceId}`;

      if (isFavorite) {
        const res = await axios({
          method: "delete",
          url,
          data: { id: serviceId },
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });

        if (res.status !== 200) throw new Error("Failed removing favorite");
      } else {
        const res = await axios.post(
          url,
          { id: serviceId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );

        if (res.status !== 201) throw new Error("Failed adding favorite");
      }
    } catch (error) {
      console.error(
        "Error toggling favorite:",
        error.response?.data || error.message
      );

      setIsFavorite((prev) => !prev);
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
