import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import DashboardSideBar from "../features/Dashboard/DashboardSideBar";
import DashboardMap from "../features/Dashboard/tabs/index";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { profile } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [Component, setComponent] = useState(null);

  const roleData = profile?.role ? DashboardMap[profile.role] : null;
  const isExactDashboard = location.pathname === "/dashboard";
  const isNestedRoute = location.pathname !== "/dashboard";

  useEffect(() => {
    if (!profile?.role) return;

    if (!activeSection && roleData?.General && isExactDashboard) {
      setActiveSection(roleData.General);
      setComponent(() => roleData.General.component);
      return;
    }

    if (activeSection?.component && isExactDashboard) {
      setComponent(() => activeSection.component);
    } else if (activeSection?.label && roleData[activeSection.label] && isExactDashboard) {
      setComponent(() => roleData[activeSection.label].component);
    }
  }, [activeSection, profile, roleData, isExactDashboard]);

  useEffect(() => {
    if (isNestedRoute) {
      setActiveSection(null);
      setComponent(null);
    }
  }, [isNestedRoute]);

  if (!profile || !profile.role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-50 dark:bg-dark-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-accent" />
          <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
            Loading Dashboard...
          </span>
        </div>
      </div>
    );
  }

  const navElements = roleData ? Object.values(roleData) : [];

  const handleNavClick = (item) => {
    if (item.children && item.children.length > 0) {
      return;
    }
    setActiveSection(item);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSideBar
        navElements={navElements}
        setActiveSection={handleNavClick}
        activeSection={activeSection?.label || "General"}
      />

      <div className="flex-1 overflow-y-auto">
        {isNestedRoute ? <Outlet /> : Component ? <Component /> : null}
      </div>
    </div>
  );
}