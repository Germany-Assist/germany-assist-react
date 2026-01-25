import React, { useCallback, useEffect, useState } from "react";
import {
  fetchClientOrders,
  openNewDispute,
} from "../../../../api/clientUserApis";
import {
  AlertTriangle,
  Filter,
  Gavel,
  LayoutGrid,
  Loader2,
  History,
} from "lucide-react";
import ActionGroup from "../../../../components/ui/ActionGroup";
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import OrderStatusBadge from "../../../../components/ui/OrderStatusBadge";
import DisputeModal from "../../../../components/ui/DisputeModal";

export default function ClientOrders() {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disputeOrderId, setDisputeOrderId] = useState(null);
  const [statusModalCon, setStatusModalCon] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: "",
    type: "",
    onlyDisputed: false,
  });
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };
  const fetchFilteredData = useCallback(async () => {
    setTableLoading(true);
    try {
      const params = {
        page: filters.page,
        limit: filters.limit,
        ...(filters.status && { status: filters.status }),
        ...(filters.type && { type: filters.type }),
        ...(filters.onlyDisputed && { onlyDisputed: true }),
      };
      const response = await fetchClientOrders(params);
      setOrders(response.data || []);
      setMeta(response.meta || { page: 1, totalPages: 1 });
    } catch (err) {
      console.error(err);
    } finally {
      setTableLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFilteredData(filters);
  }, [filters]);

  const handleDispute = async (data) => {
    try {
      await openNewDispute(data);
    } catch (error) {}
  };
  // flag i stopped here im to sleepy i need to fix this
  const columns = [
    {
      header: "Transaction",
      render: (order) => {
        const isDisputed = order.dispute !== null;
        return (
          <TransactionCell
            id={order.orderId}
            subtext={new Date(order.createdAt).toLocaleDateString()}
            icon={isDisputed ? Gavel : History}
            variant={isDisputed ? "danger" : "default"}
          />
        );
      },
    },
    {
      header: "Status",
      render: (row) => <OrderStatusBadge status={row.status} />,
    },
    {
      header: "Action",
      align: "right",
      render: (row) => (
        <ActionGroup
          actions={[
            {
              label: "Open Dispute",
              show: row.status === "pending_completion",
              onClick: () => setDisputeOrderId(row.orderId),
              variant: "primary",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <DisputeModal
        isOpen={disputeOrderId}
        onClose={() => setDisputeOrderId(null)}
        itemName={`Order id ${disputeOrderId}`}
        onSubmit={handleDispute}
      />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white">
              ORDERS
            </h1>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]"></p>
          </div>
        </div>
      </div>
      {/* TODO i should create reuseable component */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative group col-span-1">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={14}
          />
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 pl-10 pr-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none focus:ring-2 ring-blue-500/20 transition-all outline-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending_completion">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="relative group col-span-1">
          <LayoutGrid
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={14}
          />
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 pl-10 pr-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none"
          >
            <option value="">All Types</option>
            <option value="oneTime">One-Time</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>

        <button
          onClick={() =>
            handleFilterChange("onlyDisputed", !filters.onlyDisputed)
          }
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
            filters.onlyDisputed
              ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-500 hover:border-red-500/50"
          }`}
        >
          <AlertTriangle size={14} /> Only Disputed
        </button>
      </div>
      {/* LEDGER */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-sm overflow-hidden relative">
        {tableLoading && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-500" />
          </div>
        )}

        <div className="overflow-x-auto">
          <MultiUseTable
            columns={columns}
            data={orders}
            loading={tableLoading}
            pagination={meta}
            onPageChange={(newPage) =>
              setFilters((f) => ({ ...f, page: newPage }))
            }
          />
        </div>
      </div>
    </div>
  );
}
