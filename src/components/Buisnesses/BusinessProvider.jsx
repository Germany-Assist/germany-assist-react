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
  const [IsBarActive, SetIsBarActive] = useState(false);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dataset: [
      {
        label: "New Users",
        data: [120, 150, 180, 210, 280, 350, 400],
        borderColor: "#205781",
        backgroundColor: "rgba(32, 87, 129, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Returning Users",
        data: [80, 95, 120, 150, 180, 220, 250],
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
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
  };

  return (
<div className="flex bg-gray-50 h-screen">
  {IsBarActive && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={() => SetIsBarActive(false)}
    ></div>
  )}

  <SideBarBusiness />

  {/* Business-Header */}
  <main className="flex-1 overflow-y-auto">
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b">
   
      <div className="flex items-center">
        <button
          className="md:hidden text-gray-600 mr-4 hover:text-[#205781]"
          onClick={() => SetIsBarActive(!IsBarActive)}
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          Business Provider Dashboard
        </h2>
      </div>

   
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#205781] transition"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>

     
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <i className="fas fa-bell text-gray-600"></i>
        </button>

       
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <i className="fas fa-user text-gray-600"></i>
        </button>
      </div>
    </header>
 {/* Content */}
  <div className="p-6 space-y-6">
    <div className="bg-gradient-to-r from-[#205781] to-[#3498db] rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold mb-2 ">Welcome back, Ali!</h1>
            <p className="opacity-90">Here's what's happening with your business today.</p>
        </div>
             <button className="mt-4 md:mt-0 bg-white text-[#205781] font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition">
              Upgrade Plan
            </button>
    </div>
  </div>
  </main>
 
  {/* Charts */}

</div>

  );
}
