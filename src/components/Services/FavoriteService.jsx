import axios from "axios";
import React, { useState } from "react";

export const FavoriteService = ({ serviceId, initiallyFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteList = async () => {
    try {
      const url = isFavorite ? "/api/favorites/remove" : "/api/favorites/add";
      const res = await axios.post(url);
      if (!res.ok) throw new Error("Failed processing");
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error using favorite icon", error);
    }
  };

  return (
    <button
      onClick={favoriteList}
      className={`px-4 py-2 rounded-lg ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {isFavorite ? (
        <span className="bg-red-500">
          <i class="fa-solid fa-heart" />
        </span>
      ) : (
        <span className="bg-gray-200">
          <i class="fa-solid fa-heart" />
        </span>
      )}
    </button>
  );
};
