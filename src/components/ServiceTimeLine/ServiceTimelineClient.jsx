import React, { useEffect } from 'react'
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
export const ServiceTimelineClient = () => {
    const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {serviceId}=useParams();
  useEffect(()=>{
const controller =new  AbortController();
const fetchTimeLine= async()=>{
try {
    setLoading(true);
    const response = await axios.get(`BACKEND_URL/service/timeline/client/${serviceId}`,
        {signal:controller.signal}
    );
    setTimelineData(response.data);
    setError(null);
} catch (error) {
    if(axios.isCancel(error)){
        console.log("Request canceled",error);
    }else{
        const message=  error.response?.data?.message || error.message;
        setError(message);
        console.error("Timeline fetch failed:", message);
    }
}
}
if (serviceId) {
    fetchTimeLine();
  }
  return () => controller.abort();
  },[serviceId]);

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
   {/* Header section */}
    <div className="mb-12">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4"/>

        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2 ">Service Timeline</h1>
        <p className="text-gray-500">Tracking updates for Order ID: <span className="font-mono font-bold text-gray-700">{timelineData?.id}</span></p>
    </div>
 </div>
  )
}
