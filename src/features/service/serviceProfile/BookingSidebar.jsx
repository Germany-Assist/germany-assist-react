import {
  Mail,
  Star,
  Loader2,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  History,
} from "lucide-react";
import React from "react";

const BookingSidebar = ({
  price,
  rating,
  category,
  providerEmail,
  onBuy,
  isProcessing,
  hasPurchasedTimeline,
  purchasedTimelines,
  onNavigate,
}) => {
  return (
    <div className="sticky top-32 bg-white dark:bg-dark-900 border border-light-700 dark:border-white/5 rounded-[2.5rem] p-8 shadow-2xl shadow-light-900/50 dark:shadow-none transition-all duration-500">
      {/* Price and Rating Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            ${price || "0"}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {" "}
            / session
          </span>
        </div>
        <div className="flex items-center bg-light-50 dark:bg-dark-800 px-3 py-1.5 rounded-xl border border-light-200 dark:border-white/5">
          <Star size={14} className="mr-1.5 fill-accent text-accent" />
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {rating > 0 ? rating : "New"}
          </span>
        </div>
      </div>

      {/* Main Action: Access if owned, else Buy */}
      {hasPurchasedTimeline ? (
        <button
          onClick={() => onNavigate(purchasedTimelines[0]?.timelineId)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all active:scale-[0.98] mb-6 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
        >
          <CheckCircle2 size={20} />
          <span>Access Now</span>
        </button>
      ) : (
        <button
          onClick={onBuy}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all active:scale-[0.98] mb-6 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
        >
          {isProcessing ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <CreditCard
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Buy Service</span>
            </>
          )}
        </button>
      )}

      {/* List of Purchased Iterations (from your profile hook) */}
      {purchasedTimelines?.length > 0 && (
        <div className="mb-6 animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">
            <History size={12} /> Your Iterations
          </div>
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
            {purchasedTimelines.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(item.timelineId)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-light-50 dark:bg-white/5 border border-light-200 dark:border-white/5 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">
                    Order: {item.orderId}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate pr-2">
                    {item.timelineLabel}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="space-y-4 pt-6 border-t border-light-100 dark:border-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 font-medium tracking-wide">
            Category
          </span>
          <span className="capitalize font-bold text-slate-700 dark:text-slate-200">
            {category?.replace("-", " ")}
          </span>
        </div>
        <div className="flex items-center justify-between font-black text-xl pt-4 border-t border-light-100 dark:border-white/5 text-slate-900 dark:text-white">
          <span>Total Price</span>
          <span>${price}</span>
        </div>
      </div>

      {providerEmail && (
        <div className="mt-8 pt-6 border-t border-light-100 dark:border-white/5 flex items-center gap-3 text-xs text-slate-400 truncate">
          <Mail size={14} /> <span>{providerEmail}</span>
        </div>
      )}
    </div>
  );
};

export default BookingSidebar;
