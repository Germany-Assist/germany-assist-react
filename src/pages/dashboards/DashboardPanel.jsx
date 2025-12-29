import React, { useEffect, useState } from "react";
import { useProfile } from "../../contexts/profileContext";
import DashboardMap from "../../components/Dashboard/tabs/index";
import DashboardSideBar from "../../components/Dashboard/DashboardSideBar";

export default function DashboardPanel() {
  const { profile } = useProfile();
  const [activeSection, setActiveSection] = useState(null);
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if (activeSection) {
      setComponent(() => DashboardMap[profile.role][activeSection]);
    } else if (profile?.role && !activeSection) {
      setComponent(() => DashboardMap[profile.role].General);
    }
  }, [activeSection, profile]);

  if (!profile?.role) return <div>Loading...</div>;
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSideBar
        navElements={Object.keys(DashboardMap[profile?.role])}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="flex-1 p-6 overflow-auto">
        {Component ? <Component /> : "nothing yet"}
      </div>
    </div>
  );
}
