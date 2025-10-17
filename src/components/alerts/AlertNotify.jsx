import React, { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const alertConfig = {
  success: {
    border: "border-green-500 text-green-600",
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  },
  error: {
    border: "border-red-500 text-red-600",
    icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
  },
  warning: {
    border: "border-yellow-500 text-yellow-600",
    icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />,
  },
  info: {
    border: "border-blue-500 text-blue-600",
    icon: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
  },
};

export const AlertNotify = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  if (!visible) return null;

  const { border, icon } = alertConfig[type] || alertConfig.info;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
        className={`bg-white flex items-center justify-between gap-4 
        p-4 rounded-xl shadow-lg border-l-8 ${border} 
        transition-all duration-300`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <p className="font-medium text-gray-800">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
};
