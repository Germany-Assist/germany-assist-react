import { ArrowRight, AlertCircle, CheckCircle2, X, Info } from "lucide-react";
import React, { useEffect } from "react";

const STYLES = {
  success: {
    icon: <CheckCircle2 size={48} className="animate-bounce" />,
    bgIcon: "bg-emerald-500/10 text-emerald-500",
    title: "Success!",
  },
  error: {
    icon: <AlertCircle size={48} className="animate-pulse" />,
    bgIcon: "bg-rose-500/10 text-rose-500",
    title: "System Error",
  },
  warning: {
    icon: <Info size={48} />,
    bgIcon: "bg-amber-500/10 text-amber-500",
    title: "Wait a moment",
  },
};

function StatusModal({
  isOpen,
  onClose,
  type = "success",
  message = "",
  buttonText = "Continue",
  autoCloseMs = 0,
}) {
  // Handle auto-close timeout
  useEffect(() => {
    if (isOpen && autoCloseMs > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) return null;

  const currentStyle = STYLES[type] || STYLES.success;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-6 animate-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Dynamic Content */}
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${currentStyle.bgIcon}`}
          >
            {currentStyle.icon}
          </div>

          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            {currentStyle.title}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[280px]">
            {message}
          </p>

          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all active:scale-95"
          >
            {buttonText} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
