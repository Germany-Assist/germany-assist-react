import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  Banknote,
  Calendar,
  Plus,
  Trash2,
} from "lucide-react";

const StepTypeAndPricing = ({ data, onUpdate, onNext, onBack }) => {
  // Logic: Ensure we have at least one valid entry based on the type
  const isInvalid =
    !data.type ||
    (data.type === "oneTime" &&
      (!data.variants ||
        data.variants.length === 0 ||
        data.variants.some((v) => !v.label || v.price <= 0))) ||
    (data.type === "timeline" &&
      (!data.timelines ||
        data.timelines.length === 0 ||
        data.timelines.some((t) => !t.label || !t.startDate || t.price <= 0)));

  // Helper to add new items
  const addItem = () => {
    if (data.type === "oneTime") {
      const newVariants = [...(data.variants || []), { label: "", price: "" }];
      onUpdate({ variants: newVariants });
    } else {
      const newTimelines = [
        ...(data.timelines || []),
        { label: "", startDate: "", endDate: "", price: "" },
      ];
      onUpdate({ timelines: newTimelines });
    }
  };

  // Helper to remove items
  const removeItem = (index) => {
    if (data.type === "oneTime") {
      onUpdate({ variants: data.variants.filter((_, i) => i !== index) });
    } else {
      onUpdate({ timelines: data.timelines.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          Pricing & Structure
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          Define the Type and how much you charge for this service.
        </p>
      </div>

      {/* 1. Service Type Selection */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onUpdate({ type: "oneTime", timelines: [] })}
          className={`flex-1 p-4 rounded-2xl border flex flex-col gap-2 transition-all text-left ${
            data.type === "oneTime"
              ? "border-accent bg-accent/5 ring-2 ring-accent/20"
              : "border-light-700 dark:border-white/10"
          }`}
        >
          <Banknote
            className={
              data.type === "oneTime" ? "text-accent" : "text-slate-400"
            }
          />
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              One-Time
            </p>
            <p className="text-xs text-slate-500">Variants & Tiers</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onUpdate({ type: "timeline", variants: [] })}
          className={`flex-1 p-4 rounded-2xl border flex flex-col gap-2 transition-all text-left ${
            data.type === "timeline"
              ? "border-accent bg-accent/5 ring-2 ring-accent/20"
              : "border-light-700 dark:border-white/10"
          }`}
        >
          <Calendar
            className={
              data.type === "timeline" ? "text-accent" : "text-slate-400"
            }
          />
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              Timeline
            </p>
            <p className="text-xs text-slate-500">Schedules & Batches</p>
          </div>
        </button>
      </div>

      {/* 2. Dynamic Fields Section */}
      <div className="space-y-4">
        {data.type === "oneTime" && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">
              Service Variants
            </label>
            {(data.variants || []).map((variant, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  placeholder="Variant (e.g. Standard)"
                  className="flex-1 p-3 border border-light-700 dark:border-white/10 rounded-xl bg-transparent text-slate-900 dark:text-white focus:border-accent outline-none"
                  value={variant.label}
                  onChange={(e) => {
                    const v = [...data.variants];
                    v[idx].label = e.target.value;
                    onUpdate({ variants: v });
                  }}
                />
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-3 pl-6 border border-light-700 dark:border-white/10 rounded-xl bg-transparent text-slate-900 dark:text-white focus:border-accent outline-none"
                    value={variant.price}
                    onChange={(e) => {
                      const v = [...data.variants];
                      v[idx].price = parseFloat(e.target.value) || 0;
                      onUpdate({ variants: v });
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {data.type === "timeline" && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">
              Service Timelines
            </label>
            {(data.timelines || []).map((timeline, idx) => (
              <div
                key={idx}
                className="p-5 border border-light-700 dark:border-white/10 rounded-2xl space-y-4 relative group bg-light-900/20 dark:bg-white/5"
              >
                <div className="flex gap-4">
                  <input
                    placeholder="Batch label (e.g. Monday Morning)"
                    className="flex-1 bg-transparent border-b border-light-700 dark:border-white/10 text-slate-900 dark:text-white font-bold py-2 focus:border-accent outline-none"
                    value={timeline.label}
                    onChange={(e) => {
                      const t = [...data.timelines];
                      t[idx].label = e.target.value;
                      onUpdate({ timelines: t });
                    }}
                  />
                  <div className="relative w-32">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Price"
                      className="w-full bg-transparent border-b border-light-700 dark:border-white/10 text-slate-900 dark:text-white font-bold py-2 pl-4 focus:border-accent outline-none"
                      value={timeline.price}
                      onChange={(e) => {
                        const t = [...data.timelines];
                        t[idx].price = parseFloat(e.target.value) || 0;
                        onUpdate({ timelines: t });
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Start Date
                    </p>
                    <input
                      type="date"
                      className="w-full bg-transparent text-sm dark:text-white outline-none"
                      value={timeline.startDate}
                      onChange={(e) => {
                        const t = [...data.timelines];
                        t[idx].startDate = e.target.value;
                        onUpdate({ timelines: t });
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      End Date
                    </p>
                    <input
                      type="date"
                      className="w-full bg-transparent text-sm dark:text-white outline-none"
                      value={timeline.endDate}
                      onChange={(e) => {
                        const t = [...data.timelines];
                        t[idx].endDate = e.target.value;
                        onUpdate({ timelines: t });
                      }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {data.type && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-4 border-2 border-dashed border-light-700 dark:border-white/10 rounded-2xl text-slate-400 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all flex items-center justify-center gap-2 font-bold text-sm"
          >
            <Plus size={18} /> Add{" "}
            {data.type === "oneTime" ? "Variant" : "Timeline"}
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-4 border-t border-light-700 dark:border-white/5">
        <button
          type="button"
          onClick={onBack}
          className="p-4 rounded-2xl border border-light-700 dark:border-white/10 text-slate-400 hover:bg-light-900 dark:hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          disabled={isInvalid}
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white disabled:opacity-20 text-white dark:text-black font-bold py-4 rounded-2xl transition-all shadow-xl hover:bg-accent hover:text-white active:scale-95"
        >
          Next: Media <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StepTypeAndPricing;
