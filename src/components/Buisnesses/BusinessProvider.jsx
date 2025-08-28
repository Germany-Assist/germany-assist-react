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
    datasets: [
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
  {/*State Cards   */}
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Clients" value="1,248" change="12% from last month" icon="fas fa-users" color="blue" />
            <StatCard title="Active Services" value="12" change="2 new this month" icon="fas fa-concierge-bell" color="green" />
            <StatCard title="Monthly Revenue" value="$12.8K" change="8% from last month" icon="fas fa-wallet" color="purple" />
            <StatCard title="Satisfaction Rate" value="92%" change="3% from last month" icon="fas fa-star" color="yellow" />
          </div>

  
  {/* Charts */}

   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between mb-6">
                <h3 className="font-semibold text-gray-800">User Engagement</h3>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="h-64">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between mb-6">
                    <h3 className="font-semibold text-gray-800">Service Distribution</h3>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                        <option>By Usage</option>
                        <option>By Revenue</option>
                    </select>
                </div>
                <div className="h-64">
           <Doughnut data={serviceData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
  </div>
  </main>
 

</div>
  );
}
const StatCard=({title,value,change,icon,color})=>{
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-green-500 text-sm mt-1">
            <i className="fas fa-arrow-up"></i> {change}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}