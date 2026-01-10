import React, { useEffect, useState } from "react";
import { useProfile } from "../contexts/ProfileContext";
import DashboardSideBar from "../features/Dashboard/DashboardSideBar";
import DashboardMap from "../features/Dashboard/tabs/index";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { profile } = useProfile();
  const [activeSection, setActiveSection] = useState(null);
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const roleData = DashboardMap[profile?.role];
    if (activeSection?.component) {
      setComponent(() => activeSection.component);
    } else if (roleData?.General) {
      setComponent(() => roleData.General.component);
    }
  }, [activeSection, profile]);

  if (!profile?.role)
    return (
      <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="flex h-screen bg-light-950 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors duration-700">
      <DashboardSideBar
        navElements={Object.values(DashboardMap[profile.role])}
        setActiveSection={setActiveSection}
        activeSection={activeSection?.label || "General"}
      />
      <div className="flex-1 overflow-auto relative">
        {/* Decorative background element for premium feel */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        <main className="p-8 relative z-10 max-w-[1600px] mx-auto">
          {Component ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <Component />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[60vh] text-slate-400 italic font-light">
              Select a module to begin
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
