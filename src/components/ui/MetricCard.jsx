import React from "react";
const MetricCard = ({
  title,
  amount,
  icon: Icon,
  sub,
  variant = "default",
  isCount = false,
}) => {
  const styles = {
    default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5",
    blue: "bg-blue-600 text-white border-transparent shadow-xl shadow-blue-500/20",
    red: "bg-white dark:bg-zinc-900 border-red-200 dark:border-red-500/20 text-red-600",
    green:
      "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-300",
  };

  return (
    <div
      className={`p-8 rounded-[2.5rem] border transition-all duration-500 group ${styles[variant]}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div
          className={`p-3 rounded-2xl ${
            variant === "blue" ? "bg-white/20" : "bg-zinc-50 dark:bg-black"
          }`}
        >
          <Icon size={22} />
        </div>
      </div>
      <p
        className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
          variant === "blue" ? "text-blue-100" : "text-zinc-400"
        }`}
      >
        {title}
      </p>
      <h2 className="text-3xl font-black tracking-tighter">
        {isCount ? amount : `$${Number(amount).toLocaleString()}`}
      </h2>
      <p
        className={`text-[9px] mt-2 font-bold uppercase tracking-tight opacity-60`}
      >
        {sub}
      </p>
    </div>
  );
};
export default MetricCard;
