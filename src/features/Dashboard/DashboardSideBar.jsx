import React, { useState } from "react";
import ProfileAvatar from "../../components/ui/ProfileAvatar";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiGrid,
  FiLogOut,
  FiMessageCircle,
  FiPackage,
  FiShoppingCart,
  FiHome,
  FiUser,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiPlusCircle,
} from "react-icons/fi";
import { PiUsersFourFill, PiUserSoundDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function DashboardSideBar({
  navElements,
  setActiveSection,
  activeSection,
}) {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (label) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const icons = {
    Home: <FiHome />,
    Profile: <FiUser />,
    Settings: <FiSettings />,
    Messages: <FiMessageCircle />,
    Orders: <FiShoppingCart />,
    Logout: <FiLogOut />,
    General: <FiGrid />,
    Services: <FiPackage />,
    "Create New User": <FiPlusCircle />,
    ServiceProvider: <PiUserSoundDuotone />,
    Users: <PiUsersFourFill />,
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-white to-gray-100 shadow-lg flex flex-col border-r">
      <div className="p-6 flex flex-col items-center border-b border-gray-200">
        <ProfileAvatar name={true} />
        <span className="mt-3 text-[10px] uppercase tracking-wider font-bold text-gray-400">
          Dashboard
        </span>
      </div>

      <nav className="flex-1 p-4 mt-4 space-y-1 overflow-y-auto">
        {navElements.map((item, index) => {
          const label = item.label;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedMenus[label];

          return (
            <div key={index} className="space-y-1">
              <button
                onClick={() => {
                  if (hasChildren) toggleMenu(label);
                  setActiveSection(item); // Update the component in the main panel
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200
                  ${
                    activeSection === label
                      ? "bg-blue-600 text-white shadow-md font-medium"
                      : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{icons[label] || <FiGrid />}</span>
                  <span className="text-sm">{label}</span>{" "}
                  {/* FIX: item.label instead of item */}
                </div>
                {hasChildren && (
                  <span>
                    {isExpanded ? (
                      <FiChevronDown size={14} />
                    ) : (
                      <FiChevronRight size={14} />
                    )}
                  </span>
                )}
              </button>

              {hasChildren && isExpanded && (
                <div className="ml-6 pl-4 border-l-2 border-gray-200 space-y-1 mt-1">
                  {item.children.map((child, childIdx) => (
                    <button
                      key={childIdx}
                      onClick={() => setActiveSection(child)} // Sets the sub-component
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors
                        ${
                          activeSection === child.label
                            ? "text-blue-600 font-bold bg-blue-50"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      <span className="text-base">
                        {icons[child.label] || null}
                      </span>
                      {child.label} {/* FIX: child.label instead of child */}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <hr className="my-6 border-gray-200" />

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
        >
          <FiHome size={18} />
          Main Home
        </button>

        <button
          onClick={() => logOut(true)}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut size={18} />
          Log out
        </button>
      </nav>
    </div>
  );
}
