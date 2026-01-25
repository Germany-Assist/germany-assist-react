import {
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  X,
  Info,
  Trash2,
} from "lucide-react";
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
  // Added Delete style
  operation: {
    icon: <Trash2 size={48} className="animate-pulse" />,
    bgIcon: "bg-red-500/10 text-red-600",
    title: "Confirm Operation",
  },
};

function StatusModal({
  isOpen,
  onClose,
  onConfirm, // New prop for approval
  type = "success",
  message = "",
  buttonText = "Continue",
  secondaryButtonText = "Cancel", // New prop for dismissal
  autoCloseMs = 0,
}) {
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
  const isConfirmation = !!onConfirm; // Check if we are in "Confirm" mode

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-6 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center justify-center text-center py-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${currentStyle.bgIcon}`}
          >
            {currentStyle.icon}
          </div>

          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            {currentStyle.title}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[300px]">
            {message}
          </p>

          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {isConfirmation && (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
              >
                {secondaryButtonText}
              </button>
            )}

            <button
              onClick={onConfirm || onClose}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 
                ${type === "operation" ? "bg-red-600 text-white" : "bg-slate-900 dark:bg-white text-white dark:text-black"}`}
            >
              {buttonText} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
