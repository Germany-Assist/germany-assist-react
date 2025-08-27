import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { SideBarBusiness } from "./SideBarBusiness";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function BusinessProvider() {
 
const [IsBarActive,SetIsBarActive] = useState(false);

const chartData = {
    labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    dataset:[
        {
            label:"New Users",
            data:[120,150,180,210,280,350,400],
            borderColor: "#205781",
            backgroundColor: "rgba(32, 87, 129, 0.2)",
            fill:true,
            tension:0.4
        },
        {
            label:"Returning Users",
            data:[80,95,120,150,180,220,250],
            borderColor:"#2ecc71",
             backgroundColor: "rgba(46, 204, 113, 0.2)",
             fill:true,
             tension:0.4
        }
    ],
}    
  const serviceData = {
    labels: ["Consultation", "Training", "Support", "Maintenance", "Other"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#205781",
          "#3498db",
          "#2ecc71",
          "#9b59b6",
          "#e74c3c",
        ],
        borderWidth: 0,
      },
    ],
  }

  
  

 

  return (
    <div className="flex bg-gray-50 h-screen">
    {
        IsBarActive &&(
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={SetIsBarActive(false)}>

            </div>
        )
        
    }<SideBarBusiness></SideBarBusiness>
    
    </div>
  );
}
