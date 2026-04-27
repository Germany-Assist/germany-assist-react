import React from "react";
import { Gavel, Eye, MessageSquare, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MultiUseTable from "../../components/ui/dashboard/MultiUseTable";
import ActionGroup from "../Dashboard/ActionMenu";
import TransactionCell from "../../components/ui/dashboard/TransactionCell";
import adminApis from "../../api/adminApis";
import { cancelMyDispute } from "../../api/clientUserApis";
/**
 * DisputesTable Component
 * Renders a data table for managing order disputes with role-specific actions.
 * Supports Admin, Client, and Provider perspectives.
 */
const DisputesTable = ({ data, loading, onRefresh, role = "admin" }) => {
  const navigate = useNavigate();
  /**
   * Universal handler for API-based actions.
   * Executes the call and triggers a data refresh on success.
   */
  const handleAction = async (apiCallFn) => {
    try {
      await apiCallFn();
      onRefresh?.();
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
    /**
     * Dynamic Status Badge
     * Maps status keys to specific Tailwind CSS styles.
     */
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
    /**
     * Contextual Actions
     * Determines available buttons based on the user's role and record status.
     */
    {
      header: "Action",
      align: "right",
      render: (row) => {
        const actions = role === "admin"
          ? [
            {
              label: "Start Review",
              show: row.status === 'open',
              onClick: () => handleAction(() => adminApis.markDisputeInReview(row.id)),
            },
            {
              label: "Refund Buyer",
              icon: Sparkles,
              show: row.status === 'in_review',
              onClick: () => handleAction(() => adminApis.resolveDispute(row.id, "buyer_won")),
              variant: "danger",
            },
            {
              label: "Release to Provider",
              show: row.status === 'in_review',
              onClick: () => handleAction(() => adminApis.resolveDispute(row.id, "provider_won")),
              variant: "primary",
            },
          ]
: role === "client"
            ? [
              {
                label: "View Details",
                icon: Eye,
                onClick: () => navigate(`/dashboard/disputes/${row.id}`),
              },
              {
                label: "Cancel Dispute",
                show: row.status === 'open',
                onClick: () => handleAction(() => cancelMyDispute(row.id)),
              }
            ]
            : [
              {
              label: "View Details",
              icon: Eye,
              onClick: () => navigate(`/disputes/${row.id}`),
            },
            {
              label: "Submit Response",
              icon: MessageSquare,
              show: row.status === 'open',
              onClick: () => navigate(`/disputes/respond/${row.id}`),
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