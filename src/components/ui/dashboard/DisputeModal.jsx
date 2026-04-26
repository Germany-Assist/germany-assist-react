import {
  X,
  Scale,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  Send,
  CheckCircle,
  FileText,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const DISPUTE_REASONS = [
  "Failed to deliver within the agreement period",
  "Failed to deliver agreement criteria",
  "Privacy Concern",
  "Other",
];

function DisputeModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  itemName = "this post",
  dispute = null,
  actionType = null,
  onSuccess 
}) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (isOpen && actionType === "respond" && dispute) {
      setReason("");
      setDescription("");
    }
  }, [isOpen, actionType, dispute]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (actionType === "respond") {
      if (!description.trim()) {
        setError("Please provide your response");
        return;
      }
      setLoading(true);
      setError("");
      try {
        await onSubmit({ response: description });
        onClose();
        if (onSuccess) onSuccess();
      } catch (err) {  
        setError(err?.response?.data?.message || "Failed to submit response");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!reason || !description.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({ reason, description });
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {  
      setError(
        err?.response?.data?.message ||
        "Failed to open dispute. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await onSubmit({ action: "cancel" });
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to cancel dispute");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (actionType === "view" && dispute) {
      return (
        <div className="p-8 -mt-6 bg-white dark:bg-zinc-900 rounded-t-[32px] relative z-20">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                <FileText size={12} /> Dispute ID
              </label>
              <p className="font-bold text-slate-900 dark:text-white">DISP-{dispute.id}</p>
            </div>
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                <Scale size={12} /> Reason
              </label>
              <p className="font-bold text-slate-900 dark:text-white">{dispute.reason}</p>
            </div>
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                <MessageSquare size={12} /> Description
              </label>
              <p className="text-slate-600 dark:text-slate-300 text-sm">{dispute.description}</p>
            </div>
            {dispute.response && (
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  <CheckCircle size={12} /> Provider Response
                </label>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{dispute.response}</p>
              </div>
            )}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                Status
              </label>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                dispute.status === 'open' ? 'bg-red-500 text-white' :
                dispute.status === 'in_review' ? 'bg-blue-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {dispute.status?.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    if (actionType === "cancel") {
      return (
        <div className="p-8 -mt-6 bg-white dark:bg-zinc-900 rounded-t-[32px] relative z-20">
          <div className="text-center mb-6">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Cancel Dispute?
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Are you sure you want to cancel this dispute? This action cannot be undone.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
            >
              No, Keep It
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="py-4 rounded-2xl font-black uppercase tracking-widest text-xs bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
            >
              {loading ? "Cancelling..." : "Yes, Cancel"}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </div>
      );
    }

    if (actionType === "respond") {
      return (
        <form onSubmit={handleSubmit} className="p-8 -mt-6 bg-white dark:bg-zinc-900 rounded-t-[32px] relative z-20">
          <div className="mb-6">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
              <MessageSquare size={12} /> Your Response
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide your response to this dispute..."
              className="w-full min-h-[120px] p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all text-slate-900 dark:text-white resize-none text-sm leading-relaxed"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-amber-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"} <Send size={16} />
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </form>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="p-8 -mt-6 bg-white dark:bg-zinc-900 rounded-t-[32px] relative z-20">
        <div className="mb-6">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
            <AlertTriangle size={12} /> Primary Reason
          </label>
          <div className="relative">
            <select
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-4 pr-10 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-amber-500 outline-none appearance-none transition-all text-slate-900 dark:text-white font-bold"
            >
              <option value="" disabled>
                Select a reason...
              </option>
              {DISPUTE_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
            <MessageSquare size={12} /> Detailed Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide as much detail as possible..."
            className="w-full min-h-[120px] p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all text-slate-900 dark:text-white resize-none text-sm leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-amber-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"} <Send size={16} />
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
      </form>
    );
  };

  const getTitle = () => {
    if (actionType === "view") return "Dispute Details";
    if (actionType === "cancel") return "Cancel Dispute";
    if (actionType === "respond") return "Respond to Dispute";
    return "Open a Dispute";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg rounded-[32px] bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        {(actionType === "view" || !actionType) && (
          <div className="bg-amber-500/10 p-8 pb-12">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 rounded-full p-2 text-amber-900/40 hover:bg-amber-500/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              {actionType !== "view" && (
                <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 mb-4 animate-pulse">
                  <Scale size={32} />
                </div>
              )}
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                {getTitle()}
              </h3>
              {actionType !== "view" && actionType !== "cancel" && (
                <p className="text-slate-500 text-sm mt-3 max-w-[280px]">
                  You are disputing{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {itemName}
                  </span>
                  . Our team will review your claim.
                </p>
              )}
            </div>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}

export default DisputeModal;