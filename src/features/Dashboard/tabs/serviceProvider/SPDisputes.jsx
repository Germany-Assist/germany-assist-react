import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Timer,
  Loader2,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { 
  serviceProviderFinanceInit 
} from "../../../../api/serviceProviderApis";
import { api } from "../../../../api/client"; 
import MetricCard from "../../../../components/ui/dashboard/MetricCard";
import DisputesTable from "../../DisputesTable"; 

/**
 * SPDisputes Component
 * Handles the Service Provider view for dispute management.
 * Integrates financial metrics with a unified dispute data table.
 */
const SPDisputes = () => {
  const navigate = useNavigate();
  
  // --- State Management ---
  const [disputes, setDisputes] = useState([]);
  const [metrics, setMetrics] = useState({
    grossTotal: 0,
    escrow: 0,
    disputes: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);        // Initial page mount loading
  const [tableLoading, setTableLoading] = useState(false); // Refresh/Async table loading

  /**
   * Fetches high-level financial overview from the provider's finance API.
   */
  const initMetrics = async () => {
    try {
      const response = await serviceProviderFinanceInit();
      if (response.success) {
        setMetrics(response.data);
      }
    } catch (err) {
      console.error("Metrics Initialization Error:", err);
    }
  };

  /**
   * Fetches dispute records specific to the current provider.
   * Wrapped in useCallback to prevent unnecessary re-renders in child components.
   */
  const fetchDisputesData = useCallback(async () => {
    setTableLoading(true);
    try {
      // API call to retrieve current provider's dispute list
      const response = await api.get("/dispute");
      const finalData = response.data?.data || response.data || [];
      
      setDisputes(Array.isArray(finalData) ? finalData : []);
    } catch (err) {
      console.error("Fetch Disputes Error:", err);
    } finally {
      setTableLoading(false);
      setLoading(false);
    }
  }, []);

  // --- Life Cycle ---
  useEffect(() => {
    initMetrics();
    fetchDisputesData();
  }, [fetchDisputesData]);

  // Full-screen loading state for initial data fetch
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-zinc-700" size={40} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white">
            DISPUTES
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            Arbitration & Conflict Resolution Center
          </p>
        </div>
        
        {/* Manual Refresh Button */}
        <button 
          onClick={fetchDisputesData}
          disabled={tableLoading}
          className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={20} className={tableLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Financial & Status Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Gross Volume" amount={metrics.grossTotal} icon={TrendingUp} />
        <MetricCard title="Safety Escrow" amount={metrics.escrow} icon={Timer} variant="blue" />
        <MetricCard 
          title="Under Review" 
          amount={disputes.filter(d => d.status === 'in_review').length} 
          icon={ShieldAlert} 
          variant="red" 
          isCount 
        />
        <MetricCard title="Balance" amount={metrics.balance} icon={ShieldAlert} variant="green" />
      </div>

      {/* Unified Dispute Table
          Passes 'role="provider"' to enable specific UI actions like "Submit Response"
      */}
      <DisputesTable 
        data={disputes} 
        loading={tableLoading} 
        onRefresh={fetchDisputesData} 
        role="provider" 
        onCustomAction={(type, id) => {
          if (type === 'view') navigate(`/disputes/${id}`);
          if (type === 'respond') navigate(`/disputes/respond/${id}`);
        }}
      />
    </div>
  );
};

export default SPDisputes;