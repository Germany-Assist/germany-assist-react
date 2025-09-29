import React, { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

const alertConfig = {
  success: {
    border: "border-green-500 text-green-600",
    icon:<CheckCircleIcon className="h-10 w-10 text-green-500"/>
  
  },
  error: {
    border: "border-red-500 text-red-600",
    icon:<XCircleIcon className="h-10 w-10 text-red-500"/>
  
  },
  warning: {
    border: "border-yellow-500 text-yellow-600",
    icon:<ExclamationTriangleIcon className="h-10 w-10 text-yellow-500"/>
  },
  info: {
    border: "border-blue-500 text-blue-600",
    icon:<InformationCircleIcon className="h-10 w-10 text-blue-500"/>
  },
};

export const AlertNotify = ({ message, type = "info", onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose && onClose(), 300); 
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!visible) return null;

  const { border, icon } = alertConfig[type] || alertConfig.info;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`bg-white w-[400px] h-[180px] flex flex-col items-center justify-center gap-4 
        px-10 py-8 rounded-2xl shadow-2xl border-l-8 ${border} 
        transform transition-all duration-300 animate-fade-in`}
      >
        {icon}
        <p className="font-semibold text-xl text-center">{message}</p>
      </div>
    </div>
  );
};

