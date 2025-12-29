import React from "react";
import ProfileAvatar from "../profile/profileAvatar";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiGrid,
  FiLogOut,
  FiMessageCircle,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi"; // optional, logout icon
import { PiUsersFourFill, PiUserSoundDuotone } from "react-icons/pi";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DashboardSideBar({
  navElements,
  setActiveSection,
  activeSection,
}) {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const icons = {
    Home: <FiHome />,
    Profile: <FiUser />,
    Settings: <FiSettings />,
    Messages: <FiMessageCircle />,
    Orders: <FiShoppingCart />,
    Logout: <FiLogOut />,
    General: <FiGrid />,
    Services: <FiPackage />,
    ServiceProvider: <PiUserSoundDuotone />,
    Users: <PiUsersFourFill />,
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-white to-gray-100 shadow-lg flex flex-col">
      <div className="p-6 flex flex-col items-center border-b border-gray-200">
        <div className="p-4 border-b"></div>
        <ProfileAvatar name={true} />
        <span className="mt-3 text-sm font-semibold text-gray-800">
          last login
        </span>
      </div>

      <nav className="flex-1 p-4 mt-4 space-y-2">
        {navElements.length > 0 ? (
          navElements.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(item)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                ${
                  activeSection === item
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              {icons[item] || null}
              {item}
            </button>
          ))
        ) : (
          <h1 className="text-gray-400 text-sm">Nothing Yet</h1>
        )}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-2 px-4 py-2 mt-6 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200"
        >
          <FiHome />
          Home
        </button>
        <button
          onClick={() => logOut(true)}
          className="w-full flex items-center gap-2 px-4 py-2 mt-6 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-200"
        >
          <FiLogOut />
          Log out
        </button>
      </nav>
    </div>
  );
}
