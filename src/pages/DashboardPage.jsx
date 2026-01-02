import React, { useEffect, useState } from "react";
import { useProfile } from "../contexts/ProfileContext";
import DashboardSideBar from "../features/Dashboard/DashboardSideBar";
import DashboardMap from "../features/Dashboard/tabs/index";
export default function DashboardPage() {
  const { profile } = useProfile();
  // We initialize with null or the default 'General' object
  const [activeSection, setActiveSection] = useState(null);
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    const roleData = DashboardMap[profile?.role];

    if (activeSection?.component) {
      // If user clicked a specific item/sub-item
      setComponent(() => activeSection.component);
    } else if (roleData?.General) {
      // Default fallback to General component
      setComponent(() => roleData.General.component);
    }
  }, [activeSection, profile]);

  if (!profile?.role) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSideBar
        // Pass the array of objects: [{label: "Users", component:..., children: [...]}, ...]
        navElements={Object.values(DashboardMap[profile.role])}
        setActiveSection={setActiveSection}
        // Pass the string label for CSS highlighting logic
        activeSection={activeSection?.label || "General"}
      />
      <div className="flex-1 p-6 overflow-auto">
        {Component ? <Component /> : "nothing yet"}
      </div>
    </div>
  );
}
