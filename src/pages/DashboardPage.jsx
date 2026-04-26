import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import DashboardSideBar from "../features/Dashboard/DashboardSideBar";
import DashboardMap from "../features/Dashboard/tabs/index";
import { Loader2 } from "lucide-react";
export default function DashboardPage() {
  const { profile } = useProfile();
  const [activeSection, setActiveSection] = useState(null);
  const [Component, setComponent] = useState(null);

  const roleData = profile?.role ? DashboardMap[profile.role] : {}; // ✅ هون الحل

  useEffect(() => {
    if (!profile?.role) return;

    if (!activeSection && roleData?.General) {
      setActiveSection(roleData.General);
      setComponent(() => roleData.General.component);
      return;
    }

    if (activeSection?.component) {
      setComponent(() => activeSection.component);
    } else if (activeSection?.label && roleData[activeSection.label]) {
      setComponent(() => roleData[activeSection.label].component);
    }
  }, [activeSection, profile]);

  if (!profile?.role)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen">
      <DashboardSideBar
        navElements={Object.values(roleData)} 
        setActiveSection={setActiveSection}
        activeSection={activeSection?.label || "General"}
      />

      <div className="flex-1">
        {Component ? <Component /> : <Outlet />}
      </div>
    </div>
  );
}