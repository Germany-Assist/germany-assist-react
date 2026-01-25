import { Loader2 } from "lucide-react";
import React from "react";

const VARIANTS = {
  primary:
    "bg-zinc-900 dark:bg-white dark:text-black text-white hover:bg-zinc-800 dark:hover:bg-zinc-200",
  secondary:
    "border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  alert:
    "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700",
};

const BASE_STYLES =
  "px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

const ActionGroup = ({ actions }) => {
  return (
    <div className="flex justify-end gap-2">
      {actions.map((action) => {
        if (!action.show) return null;

        const variantClass = VARIANTS[action.variant] || VARIANTS.secondary;

        return (
          <button
            key={action.label}
            disabled={action.loading}
            onClick={action.onClick}
            className={`${BASE_STYLES} ${variantClass}`}
          >
            {action.loading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              action.label
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ActionGroup;
