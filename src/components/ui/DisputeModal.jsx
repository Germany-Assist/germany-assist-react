import React, { useState } from "react";
import { openNewDispute } from "../../api/clientUserApis";

export default function DisputeModal({ order, onClose, onSuccess }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return setError("Please enter a reason");

    setLoading(true);
    try {
      await openNewDispute({ orderId: order.id, reason });
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to open dispute. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-2">Open Dispute</h2>
        <p className="text-gray-500 text-sm mb-4">Order ID: #{order.id}</p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-gray-200 rounded-lg p-3 text-sm min-h-[100px] outline-none focus:border-blue-500"
            placeholder="Why are you opening this dispute?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold disabled:bg-red-300"
            >
              {loading ? "Submitting..." : "Submit Dispute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}