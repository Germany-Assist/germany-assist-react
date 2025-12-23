import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../../config/api';
import { useParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  FileText, 
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { useAuth } from '../../pages/AuthProvider';
export const ServiceTimelineClient = () => {
    const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {serviceId}=useParams();
  const {  accessToken } = useAuth();
useEffect(() => {
  console.log("DEBUG serviceId:", serviceId);
console.log("DEBUG accessToken:", accessToken);
console.log("DEBUG localStorage accessToken:", localStorage.getItem("accessToken"));

  if (!accessToken || !serviceId) {
    console.warn("Waiting for accessToken or serviceId");
    return;
  }

  const controller = new AbortController();

  const fetchTimeLine = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BACKEND_URL}/service/timeline/client/${serviceId}`,
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setTimelineData(response.data);
      setError(null);
    } catch (error) {
      if (axios.isCancel(error)) return;

      const message =
        error.response?.data?.message || error.message;

      setError(message);
      console.error("Timeline fetch failed:", message);
    } finally {
      setLoading(false);
    }
  };

  fetchTimeLine();

  return () => controller.abort();
}, [serviceId, accessToken]);


if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Updating timeline...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-10 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <div>
          <h3 className="text-red-800 font-bold">Unable to load service timeline</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }
 return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-4 h-4" />
          Active Service
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Service Timeline</h1>
        <p className="text-gray-500">
          Tracking updates for Order ID: <span className="font-mono font-bold text-gray-700">{timelineData?.id}</span>
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 space-y-12">
        {timelineData?.posts.map((post, index) => (
          <div key={post.id} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white" />
            
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Update ID: {post.id}</span>
                </div>
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full border border-gray-100">
                  Step {timelineData.posts.length - index}
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {post.description}
              </p>

              {/* Attachments & Links */}
              {post.attachments?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Deliverables & Resources
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {post.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-gray-50 hover:bg-blue-600 hover:text-white border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200"
                      >
                        <div className="bg-white group-hover:bg-blue-500 p-2 rounded-lg">
                          <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-white" />
                        </div>
                        <span className="text-sm font-semibold">Access Resource</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Start Point Marker */}
        <div className="relative pl-8 md:pl-12">
           <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white" />
           <p className="text-gray-400 text-sm font-medium italic">Service initiated...</p>
        </div>
      </div>
    </div>
  );
};