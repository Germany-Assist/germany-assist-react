import React, { useEffect, useState, useCallback } from "react";
import { getMyDisputes, cancelDispute } from "../../../../api/clientUserApis";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, CheckCircle2, RefreshCw, Clock } from "lucide-react";
import MetricCard from  "../../../../components/ui/dashboard/MetricCard";
import DisputesTable from "../../DisputesTable";

/**
 * ClientDisputes Page Component
 * Manages the client-side view of disputes, including fetching data, 
 * showing metrics, and handling cancellation actions.
 */
export default function ClientDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Fetches the current user's disputes from the API.
   * Wrapped in useCallback to prevent unnecessary re-renders.
   */
  const fetchDisputes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyDisputes();
      // Safely access data from various response structures
      const data = res.data?.data || res.data || res; 
      setDisputes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load your disputes", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch on component mount
  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  /**
   * Handles the dispute cancellation request.
   * Prompts user for confirmation before firing the API call.
   */
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this dispute?")) {
      try {
        await cancelDispute(id);
        fetchDisputes(); // Refresh data to update UI
      } catch (err) {
        alert("Action failed");
      }
    }
  };

  /**
   * Derived state for dashboard metrics.
   * Calculates counts based on the current dispute list.
   */
  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    resolved: disputes.filter(d =>

      d.status === 'resolved').length
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Page Header & Refresh Trigger */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white">MY DISPUTES</h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Track your support tickets</p>
        </div>
        <button 
          onClick={fetchDisputes} 
          disabled={loading}
          className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Metrics Section: Visual overview of dispute statuses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Active Disputes" amount={stats.open} icon={Clock} variant="blue" isCount />
        <MetricCard title="Resolved" amount={stats.resolved} icon={CheckCircle2} variant="green" isCount />
        <MetricCard title="Total Filed" amount={stats.total} icon={ShieldAlert} isCount />
      </div>

      {/* Dispute Management Table: Shared UI with role-specific handling */}
      <DisputesTable 
        data={disputes} 
        loading={loading} 
        onRefresh={fetchDisputes} 
        role="client"
        onCustomAction={(type, id) => {
          if (type === 'view') navigate(`/disputes/${id}`);
          if (type === 'cancel') handleCancel(id);
          if (type === 'respond') navigate(`/disputes/respond/${id}`);
        }}
      />
    </div>
  );
}