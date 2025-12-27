import React, { useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
export const TimelineForm = () => {
  const { id: serviceId } = useParams();
  const { accessToken } = useAuth();
  const [label, setLabel] = useState("");
  const createServiceTimeline = async () => {
    return await axios.post(
      `${API_URL}/api/service/timeline/${serviceId}`,
      { label },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
  const handleCreate = async () => {
    try {
      await createServiceTimeline(serviceId, label);
      alert("Timeline created successfully!");
      setLabel("");
    } catch (error) {
      console.error(error);
      alert("Failed to create timeline");
    }
  };
  return (
    <div className="p-4 border-rounded">
      <input
        type="text"
        className="border p-2 w-full mb-3 "
        placeholder="Timeline Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      ></input>
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Timeline
      </button>
    </div>
  );
};
