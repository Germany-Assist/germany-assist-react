import React, { useState } from "react";
import ProfileAvatar from "../../components/ui/ProfileAvatar";
import { useAuth } from "../../contexts/AuthContext";
import { FiGrid, FiLogOut, FiHome, FiChevronDown, FiDollarSign, FiShoppingBag, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import ThemeSwitch from "../../components/ui/ThemeSwitch";

// خريطة أيقونات ذكية بناءً على نص الـ Label إذا لم تتوفر أيقونة مريرة
const ICON_MAP = {
  Finance: FiDollarSign,
  Orders: FiShoppingBag,
  Disputes: FiAlertCircle,
  General: FiGrid,
};

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

  // وظيفة للتأكد من هوية القسم النشط سواء كان كائن أو نص
  const checkActive = (itemLabel) => {
    const currentActiveLabel = typeof activeSection === 'string' 
      ? activeSection 
      : activeSection?.label;
    return currentActiveLabel === itemLabel;
  };

  return (
    <div className="p-4 h-screen bg-light-50 dark:bg-black transition-colors duration-500">
      <div className="relative h-full w-72 flex flex-col rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
        
        {/* تأثيرات الإضاءة الخلفية */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-400/10 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-400/10 blur-[100px]" />
        </div>

        {/* رأس القائمة الجانبية - معلومات المستخدم */}
        <div className="relative z-10 p-8 flex flex-col items-center border-b border-zinc-100 dark:border-white/5">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <ProfileAvatar
              navDir={"/"}
              className="relative w-20 h-20 ring-4 ring-white dark:ring-zinc-800 rounded-full object-cover shadow-2xl"
            />
          </div>
          <span className="mt-4 text-[10px] uppercase tracking-[0.4em] font-black text-blue-600 dark:text-blue-400">
            {profile.role?.replace('_', ' ') || "SUPER ADMIN"}
          </span>
          <div className="mt-4 bg-zinc-100 dark:bg-white/5 p-1 rounded-full scale-90">
            <ThemeSwitch />
          </div>
        </div>

        {/* روابط التنقل */}
        <nav className="relative z-10 flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          {navElements.map((item, index) => {
            const label = item.label;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMenus[label];
            const isActive = checkActive(label);
            
            // اختيار الأيقونة: الممررة أولاً، ثم الخريطة، ثم الافتراضية
            const IconComponent = item.icon || ICON_MAP[label] || FiGrid;

            return (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenu(label);
                    } else {
                      setActiveSection(item);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-black/10 scale-[1.02]"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-lg transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                      <IconComponent />
                    </span>
                    <span className="text-sm font-semibold tracking-tight">
                      {label}
                    </span>
                  </div>
                  {hasChildren && (
                    <FiChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* القوائم الفرعية */}
                {hasChildren && isExpanded && (
                  <div className="ml-9 border-l border-zinc-200 dark:border-white/10 space-y-1 mt-1">
                    {item.children.map((child, childIdx) => (
                      <button
                        key={childIdx}
                        onClick={() => setActiveSection(child)}
                        className={`w-full text-left px-4 py-2 text-xs font-medium rounded-xl transition-all
                          ${
                            checkActive(child.label)
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/5"
                              : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                          }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* تذييل القائمة الجانبية */}
        <div className="relative z-10 p-4 bg-zinc-50/50 dark:bg-white/5 border-t border-zinc-100 dark:border-white/5 rounded-b-[2.5rem]">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <FiHome size={18} />
            <span>Main Home</span>
          </button>

          <button
            onClick={() => logOut(true)}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
          >
            <FiLogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}