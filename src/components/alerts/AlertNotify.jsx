import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AlertNotify = ({ message, type = "info", onClose }) => {
  const colors = {
    success: "from-green-500 to-green-600",
    error: "from-red-500 to-red-600",
    warning: "from-yellow-500 to-yellow-600",
    info: "from-blue-500 to-blue-600",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className={`w-full bg-gradient-to-r ${colors[type]} text-white shadow-md sticky top-[4.5rem] z-40`} // directly below header
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <span className="text-center w-full font-semibold tracking-wide">
              {message}
            </span>
            <button
              onClick={onClose}
              className="ml-4 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium text-sm transition-all duration-300"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
