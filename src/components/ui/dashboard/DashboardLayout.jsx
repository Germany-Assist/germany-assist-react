import DashboardSideBar from "../../../features/Dashboard/DashboardSideBar";
import DashboardNav from "../../../features/Dashboard/DashboardNav";
import { FiGrid, FiShoppingBag, FiAlertCircle, FiSettings } from "react-icons/fi";
const DashboardLayout = ({ children }) => {
    const spNavElements = [
    { label: "General", icon: FiGrid },
    { label: "Orders", icon: FiShoppingBag },
    { label: "Disputes", icon: FiAlertCircle },
    { label: "Settings", icon: FiSettings },
  ];
   return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-zinc-950">
      {/* pass empty array and empty functions to prevent errors */}
      <DashboardSideBar 
        navElements={spNavElements}
        setActiveSection={() => {}} 
       activeSection="Disputes"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
    <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;