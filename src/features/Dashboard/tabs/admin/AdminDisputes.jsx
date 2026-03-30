import React, { useEffect, useState, useCallback } from "react";
import adminApis from "../../../../api/adminApis";
import { ShieldAlert, CheckCircle2, Search, RefreshCw } from "lucide-react";
import MetricCard from  "../../../../components/ui/dashboard/MetricCard";
import DisputesTable from "../../DisputesTable";

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ active: 0, pending: 0, resolved: 0 });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApis.getAllDisputes();
      // بناءً على الـ API تبعك، البيانات موجودة في response.data
      const data = response.data || [];
      
      setDisputes(data);
      setMetrics({
        active: data.filter(d => d.status === 'in_review').length,
        pending: data.filter(d => d.status === 'open').length,
        resolved: data.filter(d => d.status === 'resolved').length
      });
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white">DISPUTE CENTER</h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Arbitration & Resolution</p>
        </div>
        <button 
          onClick={loadData} 
          className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors"
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Awaiting Review" amount={metrics.pending} icon={ShieldAlert} variant="red" isCount />
        <MetricCard title="Under Investigation" amount={metrics.active} icon={Search} variant="blue" isCount />
        <MetricCard title="Resolved Cases" amount={metrics.resolved} icon={CheckCircle2} isCount />
      </div>

      <DisputesTable 
  data={disputes} 
  loading={loading} 
  onRefresh={loadData} 
  role="admin" 
/>
    </div>
  );
}