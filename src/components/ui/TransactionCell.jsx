const TransactionCell = ({
  id,
  subtext,
  icon: Icon = History, // Default icon
  variant = "default", // "default", "danger", "success"
}) => {
  const variants = {
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-400",
    danger: "bg-red-500/10 text-red-500",
    success: "bg-emerald-500/10 text-emerald-600",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl ${variants[variant]}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="font-black text-lg tracking-tight">{id}</p>
        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default TransactionCell;
