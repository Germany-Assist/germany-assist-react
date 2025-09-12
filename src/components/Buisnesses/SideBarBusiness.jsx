import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

export const SideBarBusiness = ({ isActive, toggle }) => {
  return (
    <aside
      className={`bg-[#205781] text-white w-64 fixed md:relative h-full z-50 transform md:translate-x-0 transition-transform duration-300 
        ${isActive ? "translate-x-0" : "-translate-x-full"}`}
    >
  
      <div className="p-5 border-b border-blue-700 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center">
          <i className="fas fa-chart-line mr-2"></i>BizAnalytics
        </h1>
     
        <button
          className="md:hidden text-white text-lg"
          onClick={toggle}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

     
      <div className="p-4 border-b border-blue-700 flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          AJ
        </div>
        <div className="ml-3">
          <h3 className="font-semibold">Ali Jamal</h3>
          <p className="text-blue-200 text-sm">Premium Provider</p>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-home mr-3"></i>Dashboard
        </a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-users mr-3"></i>Clients
        </a>
        <Link  to="/provider/services" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-concierge-bell mr-3"></i>My Services
        </Link>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-wallet mr-3"></i>Finance
        </a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-comments mr-3"></i> Messages
          <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">3</span>
        </a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-cog mr-3"></i> Settings
        </a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-sign-out-alt mr-3"></i> Logout
        </a>
      </nav>
    </aside>
  );
};
