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
import { useProfile } from "../../contexts/ProfileContext";
import ThemeSwitch from "../../components/ui/ThemeSwitch";

export default function DashboardSideBar({
  navElements,
  setActiveSection,
  activeSection,
}) {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});
  const { profile } = useProfile();
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
    <div className="w-72 min-h-screen bg-white dark:bg-dark-900 border-r border-light-700 dark:border-white/5 flex flex-col transition-colors duration-700 shadow-xl shadow-black/5">
      {/* Sidebar Header */}
      <div className="p-4 flex flex-col items-center border-b border-light-100 dark:border-white/5 bg-light-50/50 dark:bg-white/5">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <ProfileAvatar
            navDir={"/"}
            className={
              "relative w-24 h-24 ring-4 ring-white dark:ring-dark-900 rounded-full"
            }
          />
        </div>
        <span className="mt-6 text-[10px] uppercase tracking-[0.3em] font-black text-blue-600 dark:text-accent">
          {profile.role}
        </span>
        <div className="mt-4 scale-90">
          <ThemeSwitch />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
        {navElements.map((item, index) => {
          const label = item.label;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedMenus[label];
          const isActive = activeSection === label;

          return (
            <div key={index} className="space-y-1">
              <button
                onClick={() => {
                  if (hasChildren) toggleMenu(label);
                  setActiveSection(item);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold translate-x-1"
                      : "text-slate-500 dark:text-slate-400 hover:bg-light-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  >
                    {icons[label] || <FiGrid />}
                  </span>
                  <span className="text-sm tracking-wide">{label}</span>
                </div>
                {hasChildren && (
                  <span
                    className={`${
                      isExpanded ? "rotate-180" : ""
                    } transition-transform duration-300`}
                  >
                    <FiChevronDown size={14} />
                  </span>
                )}
              </button>

              {hasChildren && isExpanded && (
                <div className="ml-6 pl-4 border-l border-light-200 dark:border-white/10 space-y-1 mt-2 animate-in slide-in-from-left-2">
                  {item.children.map((child, childIdx) => (
                    <button
                      key={childIdx}
                      onClick={() => setActiveSection(child)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs rounded-xl transition-all
                        ${
                          activeSection === child.label
                            ? "text-blue-600 dark:text-accent font-black bg-blue-50 dark:bg-accent/5"
                            : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      <span>
                        {icons[child.label] || (
                          <div className="w-1 h-1 rounded-full bg-current" />
                        )}
                      </span>
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-8 mt-4 border-t border-light-100 dark:border-white/5 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-light-100 dark:hover:bg-white/5 rounded-2xl transition-all"
          >
            <FiHome size={18} />
            <span>Main Home</span>
          </button>

          <button
            onClick={() => logOut(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
          >
            <FiLogOut
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span>Log out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
