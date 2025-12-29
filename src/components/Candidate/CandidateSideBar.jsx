import React, { useState } from "react";
import {
  Home,
  Briefcase,
  ShoppingCart,
  Star,
  MessageSquare,
  User,
  Heart,
  Settings,
  Users,
  Icon,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import MainNav from "../Homepage/MainNav";
import { useEffect } from "react";

export const CandidateSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#205781] text-white h-screen flex flex-col transition-all duration-300`}
    >
      {/*Header && Logo  */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>
          Germany-Assist
        </h1>
        {!isMobile && (
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Menu size={20} />
          </button>
        )}
      </div>
      {/*  Menu Items*/}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to={"/dashboard"}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-500"
        >
          <Home size={20} />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link
          to={"/services"}
          className="flex items-center gap-3  p-2 rounded-lg hover:bg-blue-500"
        >
          <ShoppingCart size={20} />
          {isOpen && <span>My Services</span>}
        </Link>
        <Link
          to={"/favorites"}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <Heart size={20} />
          {isOpen && <span>Favorites</span>}
        </Link>
        <Link
          to={"/reviews"}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <Star size={20} />
          {isOpen && <span> My Reviews</span>}
        </Link>
        <Link
          to={"/jobs"}
          className="flex items-center  gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <Briefcase size={20} />
          {isOpen && <span>Jobs</span>}
        </Link>
        <Link
          to={"/skills"}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <User size={20} />
          {isOpen && <span>Skills</span>}
        </Link>
        <Link
          to={"/messages"}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <MessageSquare size={20} />
          {isOpen && <span>Messages</span>}
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <User size={20} />
          {isOpen && <span>My Profile</span>}
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600"
        >
          <Settings size={20} />
          {isOpen && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  );
};
