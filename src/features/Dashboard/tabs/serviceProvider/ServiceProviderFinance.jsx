import React, { useEffect, useState, useCallback } from "react";
import {
  ShieldAlert,
  Timer,
  Wallet,
  Loader2,
  CheckCircle2,
  TrendingUp,
  Gavel,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertTriangle,
  History,
  LayoutGrid,
} from "lucide-react";
import {
  serviceProviderCloseOrder,
  serviceProviderGetAllOrders,
  serviceProviderFinanceInit,
} from "../../../../api/serviceProviderApis";

const ServiceProviderFinance = () => {
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    grossTotal: 0,
    escrow: 0,
    disputes: 0,
    balance: 0,
  });
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    type: "",
    onlyDisputed: false,
  });

  // --- STYLING MAPS ---
  const statusStyles = {
    active: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    pending_completion: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    cancelled: "bg-zinc-500/10 text-zinc-500 border-zinc-500/10",
    refunded: "bg-red-500/10 text-red-600 border-red-500/20",
    paid: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  };

  const initDashboard = async () => {
    setLoading(true);
    try {
      const response = await serviceProviderFinanceInit();
      console.log(response.data);
      if (response.success) {
        setMetrics({
          grossTotal: response.data.grossTotal,
          escrow: response.data.escrow,
          balance: response.data.balance,
          disputes: response.data.disputes,
        });
        setOrders(response.data.orders.data);
        setMeta(response.data.orders.meta);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      const response = await serviceProviderGetAllOrders(params);
      setOrders(response.data || []);
      setMeta(response.meta || { page: 1, totalPages: 1 });
    } catch (err) {
      console.error(err);
    } finally {
      setTableLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    initDashboard();
  }, []);
  useEffect(() => {
    if (!loading) fetchFilteredData();
  }, [filters, fetchFilteredData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-zinc-700" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-[#050505] p-4 md:p-10 text-zinc-800 dark:text-zinc-200 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white">
              FINANCE
            </h1>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
              Operational Ledger & Payouts
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-white/5">
            <div className="px-4 py-2 bg-emerald-500/10 rounded-xl">
              <p className="text-[8px] font-black text-emerald-600 uppercase">
                Payout Ready
              </p>
              <p className="text-lg font-black dark:text-white">
                ${metrics.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Gross Volume"
            amount={metrics.grossTotal}
            icon={TrendingUp}
            sub="Total revenue generated"
          />
          <MetricCard
            title="Safety Escrow"
            amount={metrics.escrow}
            icon={Timer}
            sub="Held for 7-day window"
            variant="blue"
          />
          <MetricCard
            title="Disputed"
            amount={metrics.disputes}
            icon={ShieldAlert}
            sub="Orders under review"
            variant="red"
            isCount
          />
        </div>

        {/* MODERN FILTER BAR */}
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
              <option value="cancelled">Cancelled</option>
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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-50 dark:border-white/5">
                  <th className="px-8 py-6">Transaction</th>
                  <th className="px-8 py-6">Service Type</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Net Payout</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-white/5">
                {orders.map((order) => {
                  const isDisputed = order.dispute !== null;
                  const canClose =
                    order.status === "active" &&
                    order.serviceType === "oneTime";

                  return (
                    <tr
                      key={order.orderId}
                      className="group hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-xl ${
                              isDisputed
                                ? "bg-red-500/10 text-red-500"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {isDisputed ? (
                              <Gavel size={16} />
                            ) : (
                              <History size={16} />
                            )}
                          </div>
                          <div>
                            <p className="font-black text-lg tracking-tight">
                              #{order.orderId}
                            </p>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                              {new Date(order.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-7">
                        <span className="text-[10px] font-black uppercase px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/5">
                          {order.serviceType}
                        </span>
                      </td>
                      <td className="px-8 py-7">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tight ${
                            statusStyles[order.status] || statusStyles.cancelled
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full bg-current ${
                              order.status === "active" ? "animate-pulse" : ""
                            }`}
                          />
                          {order.status.replace("_", " ")}
                        </div>
                      </td>
                      <td className="px-8 py-7">
                        <p
                          className={`text-xl font-black italic tracking-tighter ${
                            isDisputed
                              ? "text-red-500"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          $
                          {(order.amountToPay || order.amount).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 }
                          )}
                        </p>
                        {isDisputed && (
                          <p className="text-[8px] font-black text-red-500/60 uppercase">
                            Funds Locked
                          </p>
                        )}
                      </td>
                      <td className="px-8 py-7 text-right">
                        <div className="flex justify-end gap-2">
                          {isDisputed ? (
                            <button className="px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">
                              View Dispute
                            </button>
                          ) : canClose ? (
                            <>
                              <button className="px-4 py-2 border border-zinc-200 dark:border-white/10 text-[10px] font-black uppercase rounded-xl hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                                Cancel
                              </button>
                              <button
                                disabled={processingId === order.orderId}
                                onClick={() => {
                                  setProcessingId(order.orderId);
                                  serviceProviderCloseOrder(order.orderId)
                                    .then(() => fetchFilteredData())
                                    .finally(() => setProcessingId(null));
                                }}
                                className="px-4 py-2 bg-zinc-900 dark:bg-white dark:text-black text-white text-[10px] font-black uppercase rounded-xl hover:scale-105 transition-all active:scale-95"
                              >
                                {processingId === order.orderId ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : (
                                  "Close Order"
                                )}
                              </button>
                            </>
                          ) : (
                            <div className="text-zinc-200 dark:text-white/5">
                              <CheckCircle2 size={22} />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-8 py-6 border-t border-zinc-50 dark:border-white/5 flex items-center justify-between bg-zinc-50/50 dark:bg-white/[0.01]">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
              Page {meta.page} <span className="opacity-30 mx-2">/</span>{" "}
              {meta.totalPages}
            </p>
            <div className="flex gap-2">
              <PaginationButton
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                disabled={meta.page <= 1}
                icon={ChevronLeft}
              />
              <PaginationButton
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                disabled={meta.page >= meta.totalPages}
                icon={ChevronRight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const MetricCard = ({
  title,
  amount,
  icon: Icon,
  sub,
  variant = "default",
  isCount = false,
}) => {
  const styles = {
    default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5",
    blue: "bg-blue-600 text-white border-transparent shadow-xl shadow-blue-500/20",
    red: "bg-white dark:bg-zinc-900 border-red-200 dark:border-red-500/20 text-red-600",
  };

  return (
    <div
      className={`p-8 rounded-[2.5rem] border transition-all duration-500 group ${styles[variant]}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div
          className={`p-3 rounded-2xl ${
            variant === "blue" ? "bg-white/20" : "bg-zinc-50 dark:bg-black"
          }`}
        >
          <Icon size={22} />
        </div>
      </div>
      <p
        className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
          variant === "blue" ? "text-blue-100" : "text-zinc-400"
        }`}
      >
        {title}
      </p>
      <h2 className="text-3xl font-black tracking-tighter">
        {isCount ? amount : `$${Number(amount).toLocaleString()}`}
      </h2>
      <p
        className={`text-[9px] mt-2 font-bold uppercase tracking-tight opacity-60`}
      >
        {sub}
      </p>
    </div>
  );
};

const PaginationButton = ({ onClick, disabled, icon: Icon }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 disabled:opacity-20 hover:border-blue-500 transition-colors shadow-sm"
  >
    <Icon size={16} />
  </button>
);

export default ServiceProviderFinance;
