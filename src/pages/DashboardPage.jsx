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
    if (!profile?.role) return;
    
    const roleData = DashboardMap[profile.role];
    
    // هذا التعديل يضمن أنه إذا ضغطت على أي عنصر في السايدبار، يبحث عنه بالاسم
    if (activeSection?.component) {
      setComponent(() => activeSection.component);
    } else if (activeSection?.label && roleData[activeSection.label]) {
      // هنا يبحث عن "Disputes" داخل ماب الأدوار
      setComponent(() => roleData[activeSection.label].component);
    } else if (roleData?.General) {
      setComponent(() => roleData.General.component);
    }
  }, [activeSection, profile]);
  if (!profile?.role)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
      <DashboardSideBar
        navElements={Object.values(DashboardMap[profile.role])}
        setActiveSection={setActiveSection}
        activeSection={activeSection?.label || "General"}
      />

      <div className="flex-1 relative flex flex-col p-4 overflow-hidden">
        <main className="relative z-10 flex-1 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-zinc-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
            {Component ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="mb-10">
                  <h1 className="text-3xl font-bold">{activeSection?.label || "Dashboard"}</h1>
                  <p className="text-zinc-500 mt-2 font-medium">Workspace / {activeSection?.label || "General"}</p>
                </header>
                <Component />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-zinc-400 font-bold uppercase text-xs">Initializing Module...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}