import React from "react";
import { Gavel, Eye, MessageSquare, ShieldAlert } from "lucide-react";
import MultiUseTable from "../../components/ui/dashboard/MultiUseTable";
import ActionGroup from "../Dashboard/ActionMenu"; 
import TransactionCell from "../../components/ui/dashboard/TransactionCell";
import adminApis from "../../api/adminApis";

const DisputesTable = ({ data, loading, onRefresh, role = "admin", onCustomAction }) => {
  
  const handleAction = async (apiCall) => {
    try {
      await apiCall;
      onRefresh(); 
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

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
      render: (row) => {
        const statusStyles = {
          open: 'bg-red-500/10 border-red-500 text-red-500',
          resolved: 'bg-green-500/10 border-green-500 text-green-500',
          in_review: 'bg-blue-500/10 border-blue-500 text-blue-500',
          cancelled: 'bg-zinc-500/10 border-zinc-500 text-zinc-500'
        };

        return (
          <span className={`px-4 py-1 rounded-full text-[10px] font-black italic uppercase tracking-widest border ${statusStyles[row.status] || 'bg-zinc-500/10 border-zinc-500 text-zinc-500'}`}>
            {row.status?.replace('_', ' ')}
          </span>
        );
      },
    },
  {
  header: "Action",
  align: "right",
  render: (row) => {
    const status = row.status?.toLowerCase();
    const actions =  role === "admin" 
        ? [
            {
              label: "Start Review",
            show: row.status?.toLowerCase() === 'open',              onClick: () => handleAction(adminApis.markDisputeInReview(row.id)),
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
          ]
        : role === "client" 
          ? [
              {
                label: "View Details",
                icon: Eye,
                onClick: () => onCustomAction('view', row.id),
                variant: "secondary",
              },
              {
                label: "Cancel Dispute",
                // نستخدم ShieldAlert أو أي أيقونة مناسبة
              show: row.status?.toLowerCase() === 'open',                onClick: () => onCustomAction('cancel', row.id),
                variant: "danger",
              }
            ]
          : [ // حالة الـ Provider
              {
                label: "View Details",
                icon: Eye,
                onClick: () => onCustomAction('view', row.id),
                variant: "secondary",
              },
              {
                label: "Submit Response",
                icon: MessageSquare,
                show: row.status?.toLowerCase() === 'open',                onClick: () => onCustomAction('respond', row.id),
                variant: "primary",
              }
            ];

    return <ActionGroup actions={actions} />;
  },
},
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 overflow-hidden">
      <MultiUseTable columns={columns} data={data} loading={loading} />
    </div>
  );
};

export default DisputesTable;