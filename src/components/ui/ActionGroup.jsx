import { Loader2 } from "lucide-react";
import React from "react";
export const ActionGroup = ({ actions }) => (
  <div className="flex justify-end gap-2">
    {actions.map((action, i) => {
      if (!action.show) return null;
      return (
        <button
          key={i}
          disabled={action.loading}
          onClick={action.onClick}
          className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${
            action.variant === "primary"
              ? "bg-zinc-900 dark:bg-white dark:text-black text-white"
              : "border border-zinc-200 dark:border-white/10"
          }`}
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
export default ActionGroup;
