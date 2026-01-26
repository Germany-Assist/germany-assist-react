import React, { useState } from "react";
import {
  X,
  Calendar,
  Check,
  Tag,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";

function TimelineModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    label: "",
    price: "",
    limit: "",
    startDate: "",
    endDate: "",
    deadlineDate: "",
  });
  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price) || 0,
      limit: parseInt(formData.limit) || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg rounded-[32px] bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                Add Timeline
              </h3>
              <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                <Clock size={12} /> Scheduling & Capacity
              </p>
            </div>
          </div>

          {/* Label Input */}
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Tag size={12} /> Batch Label
            </label>
            <input
              autoFocus
              required
              value={formData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="e.g. Monday Morning Session"
              className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all text-slate-900 dark:text-white font-bold text-lg"
            />
          </div>

          {/* Price & Limit Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <DollarSign size={12} /> Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0.00"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-emerald-500 outline-none transition-all text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <Users size={12} /> Limit
              </label>
              <input
                type="number"
                value={formData.limit}
                onChange={(e) => handleChange("limit", e.target.value)}
                placeholder="Unlimited"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-emerald-500 outline-none transition-all text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          {/* Dates Section */}
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-[24px] space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
                  Start Date
                </p>
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-bold dark:text-white outline-none"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
                  End Date
                </p>
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-bold dark:text-white outline-none"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-700">
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
                Registration Deadline
              </p>
              <input
                type="date"
                className="w-full bg-transparent text-sm font-bold dark:text-white outline-none"
                value={formData.deadlineDate}
                onChange={(e) => handleChange("deadlineDate", e.target.value)}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-3 bg-emerald-500 text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all active:scale-[0.97] shadow-xl shadow-emerald-500/20"
          >
            Create Timeline
            <Check
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default TimelineModal;
