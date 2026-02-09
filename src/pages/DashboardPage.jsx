import React from "react";
import { useProfile } from "../contexts/ProfileContext";
import DashboardSideBar from "../features/Dashboard/DashboardSideBar";
import DashboardMap from "../features/Dashboard/tabs/index";
import { Loader2 } from "lucide-react";
import { Routes, Route, Navigate } from "react-router-dom";

export default function DashboardPage() {
  const { profile } = useProfile();

  if (!profile?.role) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const roleData = DashboardMap[profile.role] || {};
  const navElements = Object.values(roleData);
  const formatPath = (label) => label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex h-screen w-full bg-[#050505] text-zinc-100 overflow-hidden">
      <DashboardSideBar navElements={navElements} />

      <div className="flex-1 relative flex flex-col p-2 md:p-6 overflow-hidden">
        
        {/* الحاوية الرئيسية */}
        <main className="relative z-10 flex-1 bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
          
          {/* منطقة المحتوى - هون التعديل لضبط المحاذزة للنص */}
          <div className="flex-1 overflow-y-auto no-scrollbar w-full h-full flex flex-col items-center">
            
            <div className="w-full max-w-6xl px-4 py-8 md:py-12">
              <Routes>
                {navElements.map((section) => (
                  <React.Fragment key={section.label}>
                    {/* مسار القسم الرئيسي */}
                    <Route
                      path={formatPath(section.label)}
                      element={
                        <div className="animate-in fade-in duration-500 w-full flex flex-col items-center text-center">
                          {/* تأكدنا إن الـ flex-col و items-center موجودين ليكون الكلام فوق بعضه وبالنص */}
                          <section.component />
                        </div>
                      }
                    />

                    {/* مسارات الأقسام الفرعية */}
                    {section.children?.map((child) => (
                      <Route
                        key={child.label}
                        path={formatPath(child.label)}
                        element={
                          <div className="animate-in fade-in duration-500 w-full flex flex-col items-center text-center">
                            {/* التنسيق هون بيخلي المكون يجي بالسنتر بالضبط */}
                            <child.component />
                          </div>
                        }
                      />
                    ))}
                  </React.Fragment>
                ))}
                
                <Route 
                  path="/" 
                  element={<Navigate to={navElements[0] ? formatPath(navElements[0].label) : "general"} replace />} 
                />
              </Routes>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}