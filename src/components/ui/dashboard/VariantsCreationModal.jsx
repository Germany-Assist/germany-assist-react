import React, { useState } from "react";
import {
  X,
  Layers,
  Check,
  Tag,
  DollarSign,
  Users,
  Sparkles,
} from "lucide-react";

function VariantsCreationModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    label: "",
    price: "",
    limit: "",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      label: formData.label.trim(),
      price: parseFloat(formData.price) || 0,
      limit: formData.limit ? parseInt(formData.limit) : null,
    });
    // Reset form
    setFormData({ label: "", price: "", limit: "" });
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
            <div className="w-12 h-12 rounded-2xl bg-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <Layers size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                Add Variant
              </h3>
              <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                <Sparkles size={12} /> Service Customization
              </p>
            </div>
          </div>

          {/* Variant Label Input */}
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Tag size={12} /> Variant Name
            </label>
            <input
              autoFocus
              required
              value={formData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="e.g. Standard, Premium, or VIP"
              className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-violet-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all text-slate-900 dark:text-white font-bold text-lg"
            />
          </div>

          {/* Price & Limit Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <DollarSign size={12} /> Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0.00"
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-violet-500 outline-none transition-all text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <Users size={12} /> Inventory Limit
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.limit}
                  onChange={(e) => handleChange("limit", e.target.value)}
                  placeholder="Unlimited"
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-violet-500 outline-none transition-all text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="mb-8 p-4 rounded-2xl bg-violet-50 dark:bg-violet-500/5 border border-violet-100 dark:border-violet-500/20">
            <p className="text-[11px] text-violet-600 dark:text-violet-400 font-medium leading-relaxed">
              Variants allow customers to choose between different levels of
              your service. Leave limit empty for unlimited availability.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-3 bg-violet-600 text-white py-5 rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-violet-700 transition-all active:scale-[0.97] shadow-xl shadow-violet-500/20"
          >
            Create Variant
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

export default VariantsCreationModal;
