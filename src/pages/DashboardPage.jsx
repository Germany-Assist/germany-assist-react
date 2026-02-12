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
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
          <Loader2 className="relative w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-700 overflow-hidden">
      {/* Sidebar - Floating Pod */}
      <DashboardSideBar
        navElements={Object.values(DashboardMap[profile.role])}
        setActiveSection={setActiveSection}
        activeSection={activeSection?.label || "General"}
      />

      {/* Main Viewport */}
      <div className="flex-1 relative flex flex-col p-4 overflow-hidden">
        {/* Ambient Background Glows - Fixed to the viewport */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-400/10 blur-[120px] rounded-full pointer-events-none" />

        {/* The Main Glass Pod */}
        <main className="relative z-10 flex-1 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-zinc-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
            {Component ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                {/* Section Header */}
                <header className="mb-10">
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {activeSection?.label || "Dashboard"}
                  </h1>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                    Workspace / {activeSection?.label || "General"}
                  </p>
                </header>

                {/* The Active View (e.g., ServiceWizard) */}
                <Component />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-3xl bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center border border-zinc-200 dark:border-white/10 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                </div>
                <p className="text-zinc-400 font-bold tracking-widest uppercase text-xs">
                  Initializing Module
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
