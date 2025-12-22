import React, { useEffect } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../../config/api';
import { useParams } from 'react-router-dom';
export const ServiceTimelineClient = () => {
    const [timelineData, setTimelineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {serviceId}=useParams();
  useEffect(()=>{
const controller =  AbortController();
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
  },[serviceId])
  return (
    <div>ServiceTimelineClient</div>
  )
}
