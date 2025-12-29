import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";
import { Timeline } from "./Timeline";
import { useParams } from "react-router-dom";
export const TimelinePage = () => {
  const { serviceId } = useParams();
  const [timeline, setTimeline] = useState(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/service/timeline/serviceProvider/${serviceId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken} ` },
          }
        );
        const data = await response.json();
        setTimeline(data);
      } catch (error) {
        console.error("Failed to fetch timeline", error);
      }
    };
    fetchTimeLine();
  }, [serviceId]);

  if (!timeline) return <p className="text-center">Loading...</p>;
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8 ">Service Timeline</h1>
      <Timeline posts={timeline.posts}></Timeline>
    </div>
  );
};
