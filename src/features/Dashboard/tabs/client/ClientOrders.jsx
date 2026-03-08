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
  History,
} from "lucide-react";
import ActionGroup from "../../../../components/ui/dashboard/ActionGroup";
import MultiUseTable from "../../../../components/ui/dashboard/MultiUseTable";
import TransactionCell from "../../../../components/ui/dashboard/TransactionCell";
import OrderStatusBadge from "../../../../components/ui/dashboard/OrderStatusBadge";
import DisputeModal from "../../../../components/ui/dashboard/DisputeModal";
import StatusModal from "../../../../components/ui/StatusModal";
import { getErrorMessage } from "../../../../api/errorMessages";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../../../components/ui/dashboard/DashboardHeader";
import LoadingIcon from "../../../../components/ui/LoadingIcon";

export default function ClientOrders() {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [tableLoading, setTableLoading] = useState(false);
  const [disputeOrderId, setDisputeOrderId] = useState(null);
  const [statusModalCon, setStatusModalCon] = useState(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: "",
    type: "",
    onlyDisputed: false,
  });

  // --- دالة التحقق من شرط الـ 14 يوم ---
  const canDispute = (order) => {
    if (order.status !== 'completed') return false; 
    if (!order.completedAt) return false;
    
    const diffTime = Math.abs(new Date() - new Date(order.completedAt));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14;
  };

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
    fetchFilteredData();
  }, [fetchFilteredData]);

  const handleDispute = async (data) => {
    try {
      const payload = { ...data, orderId: disputeOrderId };
      const res = await openNewDispute(payload);
      
      setDisputeOrderId(null); // إغلاق المودال
      fetchFilteredData(); // تحديث الجدول فوراً
      
      setStatusModalCon({
        isOpen: true,
        message: res.message || "Dispute is now open",
        onClose: () => setStatusModalCon(null),
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setStatusModalCon({
        isOpen: true,
        type: "error",
        message: errorMessage,
        onClose: () => setStatusModalCon(null),
      });
    }
  };

  const columns = [
    {
      header: "Transaction",
      render: (order) => {
        const isDisputed = order.dispute !== null && order.dispute !== undefined;
        return (
          <TransactionCell
            title={order.serviceTitle}
            subtext={`ORDER ID ${order.orderId}`}
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
              // الشرط المدمج: إما قيد التنفيذ أو مكتمل ضمن 14 يوم ولم يفتح نزاع مسبقاً
              show: (row.status === "pending_completion" || row.status === "active" || canDispute(row)) && !row.dispute,
              onClick: () => setDisputeOrderId(row.orderId),
              variant: "danger",
            },
            {
              label: "Go To Dispute Center",
              show: Boolean(row.dispute),
              onClick: () => navigate(`/disputes/${row.dispute.id}`),
              variant: "danger",
            },
            {
              label: "Go To Timeline",
              show: row.serviceType === "timeline",
              onClick: () => navigate(`/timeline/${row.relatedId}`),
              variant: "secondary",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* مودال النزاع */}
      <DisputeModal
        isOpen={!!disputeOrderId}
        onClose={() => setDisputeOrderId(null)}
        itemName={`Order #${disputeOrderId}`}
        onSubmit={handleDispute}
      />
      
      <StatusModal {...statusModalCon} />

      <DashboardHeader
        title={"Orders Console"}
        subtitle={"Client Order Control center"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* فلاتر البحث */}
        <div className="relative group col-span-1">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 pl-10 pr-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 ring-blue-500/20 transition-all"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending_completion">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="relative group col-span-1">
          <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
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
          onClick={() => handleFilterChange("onlyDisputed", !filters.onlyDisputed)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
            filters.onlyDisputed
              ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-500"
          }`}
        >
          <AlertTriangle size={14} /> Only Disputed
        </button>
      </div>

      {tableLoading ? (
        <div className="flex justify-center py-20"><LoadingIcon /></div>
      ) : (
        <div className="overflow-x-auto">
          <MultiUseTable
            columns={columns}
            data={orders}
            pagination={meta}
            onPageChange={(newPage) => handleFilterChange("page", newPage)}
          />
        </div>
      )}
    </div>
  );
}