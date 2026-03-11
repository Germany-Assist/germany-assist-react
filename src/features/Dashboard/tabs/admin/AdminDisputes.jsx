import React, { useEffect, useState, useCallback } from "react";
import adminApis from "../../../../api/adminApis";
import { Gavel, ShieldAlert, CheckCircle2, Search, RefreshCw } from "lucide-react";
import MultiUseTable from "../../../../components/ui/dashboard/MultiUseTable";
import ActionGroup from "../../../../components/ui/dashboard/ActionGroup";
import TransactionCell from "../../../../components/ui/dashboard/TransactionCell";
import MetricCard from "../../../../components/ui/dashboard/MetricCard";

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ active: 0, pending: 0 });

  // function to load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApis.getAllDisputes();
      const data = response.data || [];
      setDisputes(data);
      setMetrics({
        active: data.filter(d => d.status === 'in_review').length,
        pending: data.filter(d => d.status === 'open').length
      });
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // to handle actions , refresh data after action
  const handleAction = async (apiCall) => {
    try {
      setLoading(true);
      await apiCall;  //perform api'
      await loadData(); //update table after sucss 
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // initialize columns and use handleAction
  const columns = [
    {
      header: "Dispute Details",
      render: (row) => (
        <TransactionCell
          id={`DISP-${row.id}`}
          title={row.reason}
          subtext={`Linked to Order #${row.orderId}`}
          icon={Gavel}
          variant={row.status === 'open' ? "danger" : "default"}
        />
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-black italic uppercase tracking-widest border
          ${row.status === 'open' ? 'bg-red-500/10 border-red-500 text-red-500' : 
            row.status === 'resolved' ? 'bg-green-500/10 border-green-500 text-green-500' : 
            'bg-blue-500/10 border-blue-500 text-blue-500'}`}>
          {row.status.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: "Action",
      align: "right",
      render: (row) => (
        <ActionGroup
          actions={[
            {
              label: "Start Review",
              show: row.status === 'open',
              onClick: () => handleAction(adminApis.markDisputeInReview(row.id)),
              variant: "secondary",
            },
            {
              label: "Refund Buyer",
              show: row.status === 'in_review',
              onClick: () => handleAction(adminApis.resolveDispute(row.id, "buyer_won")),
              variant: "danger",
            },
            {
              label: "Release to Provider",
              show: row.status === 'in_review',
              onClick: () => handleAction(adminApis.resolveDispute(row.id, "provider_won")),
              variant: "primary",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white">DISPUTE CENTER</h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Arbitration & Resolution</p>
        </div>
        <button onClick={loadData} className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors">
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Awaiting Review" amount={metrics.pending} icon={ShieldAlert} variant="red" isCount />
        <MetricCard title="Under Investigation" amount={metrics.active} icon={Search} variant="blue" isCount />
        <MetricCard title="Resolved (All-time)" amount={disputes.length - metrics.active - metrics.pending} icon={CheckCircle2} isCount />
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 overflow-hidden">
        <MultiUseTable columns={columns} data={disputes} loading={loading} />
      </div>
    </div>
  );
}