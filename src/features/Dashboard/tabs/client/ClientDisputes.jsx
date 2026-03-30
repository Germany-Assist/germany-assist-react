import React, { useEffect, useState, useCallback } from "react";
import { getMyDisputes, cancelMyDispute } from "../../../../api/clientUserApis";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, CheckCircle2, RefreshCw, Clock } from "lucide-react";
import MetricCard from  "../../../../components/ui/dashboard/MetricCard";
import DisputesTable from "../../DisputesTable";

export default function ClientDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 const fetchDisputes = useCallback(async () => {
  setLoading(true);
  try {
    const res = await getMyDisputes();
    const data = res.data?.data || res.data || res; 
    setDisputes(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to load your disputes", err);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this dispute?")) {
      try {
        await cancelMyDispute(id);
        fetchDisputes();
      } catch (err) {
        alert("Action failed");
      }
    }
  };

  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    resolved: disputes.filter(d => d.status === 'resolved').length
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white">MY DISPUTES</h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Track your support tickets</p>
        </div>
        <button onClick={fetchDisputes} className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors">
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Active Disputes" amount={stats.open} icon={Clock} variant="blue" isCount />
        <MetricCard title="Resolved" amount={stats.resolved} icon={CheckCircle2} variant="green" isCount />
        <MetricCard title="Total Filed" amount={stats.total} icon={ShieldAlert} isCount />
      </div>

      {/* The Unified Table */}
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