import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function serviceDetails() {
  const { serviceId } = useParams();
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/api/service/${serviceId}`);
      setService(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed get service details"
      );
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error) return <div className="text-red-500 p-5">Error ${error}</div>;
  if (!service) return <div className="p-4">Service not found</div>;
  return (
    <>
      <div className="container mx-auto px-4 py-8  max-w-xl">
        <ServiceInfo service={service} />
        <CommentSection serviceId={serviceId} />
      </div>
    </>
  );
}

export default serviceDetails;
