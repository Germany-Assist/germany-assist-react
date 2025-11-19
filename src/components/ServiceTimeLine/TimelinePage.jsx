import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config/api";
import { useAuth } from "../../pages/AuthProvider";
import { Timeline } from "./Timeline";
export const TimelinePage = ({ timelineId }) => {
  const [timeline, setTimeline] = useState(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/service/timeline/client/${timelineId}`,
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
  }, [timelineId]);

  if (!timeline) return <p className="text-center">Loading...</p>;
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8 ">Service Timeline</h1>
      <Timeline posts={timeline.posts}></Timeline>
    </div>
  );
};
