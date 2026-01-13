import React, { useEffect, useState, useMemo } from "react";
import {
  ShieldAlert,
  Timer,
  Wallet,
  Loader2,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Fingerprint,
  Gavel,
} from "lucide-react";
import {
  serviceProviderCloseOrder,
  serviceProviderGetAllOrders,
} from "../../../../api/serviceProviderApis";

// --- COMPONENT: STAT CARD ---
const StatCard = ({
  title,
  amount,
  icon: Icon,
  variant = "default",
  description,
}) => {
  const variants = {
    default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5",
    blue: "bg-blue-50/30 dark:bg-blue-950/10 border-blue-100 dark:border-blue-500/20 text-blue-600",
    dark: "bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 shadow-xl",
    red: "bg-red-50/30 dark:bg-red-950/10 border-red-100 dark:border-red-500/20 text-red-600",
  };

  return (
    <div
      className={`p-6 rounded-[2rem] border transition-all duration-300 ${variants[variant]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <Icon size={20} className="opacity-70" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">
        {title}
      </p>
      <h2 className="text-2xl font-black tracking-tight">
        $
        {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h2>
      <p className="text-[9px] mt-2 font-bold opacity-40 uppercase tracking-tight leading-tight">
        {description}
      </p>
    </div>
  );
};

// --- COMPONENT: INFO TOOLTIP ---
const InfoTooltip = ({ isVisible, title, children }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute z-[100] left-full top-0 ml-3 w-64 p-5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-2xl rounded-3xl animate-in fade-in zoom-in-95 duration-150">
      <p className="text-[9px] font-black uppercase text-blue-500 mb-3 tracking-widest flex items-center gap-2">
        <Fingerprint size={10} /> {title}
      </p>
      <div className="space-y-2 text-[11px]">{children}</div>
    </div>
  );
};

const ServiceProviderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [hoverKey, setHoverKey] = useState(null);

  const fetchData = async () => {
    try {
      const data = await serviceProviderGetAllOrders();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const metrics = useMemo(
    () =>
      orders.reduce(
        (acc, order) => {
          const gross = Number(order.amount || 0);
          const net = order.Payout?.amountToPay
            ? Number(order.Payout.amountToPay)
            : gross * 0.8;

          acc.totalGross += gross;
          if (order.status === "pending_completion") acc.escrow += net;
          if (order.Payout?.status === "paid") acc.paidOut += net;
          if (order.Dispute && order.Dispute.status === "in_review")
            acc.disputed += net;

          return acc;
        },
        { totalGross: 0, escrow: 0, paidOut: 0, disputed: 0 }
      ),
    [orders]
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-[#050505] p-6 md:p-10 text-zinc-800 dark:text-zinc-200 font-sans tracking-tight">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Simplified Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-zinc-900 dark:text-white">
              Germany-Assist
            </h1>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-1">
              Provider Financial Management
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center gap-3">
            <HelpCircle size={16} className="text-zinc-300" />
            <span className="text-[9px] font-bold uppercase text-zinc-500 tracking-wide">
              Platform Fee: 20% | Safety Window: 7 Days
            </span>
          </div>
        </header>

        {/* Dense Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Gross Sales"
            amount={metrics.totalGross}
            icon={TrendingUp}
            description="Total volume of bookings."
          />
          <StatCard
            title="Escrow"
            amount={metrics.escrow}
            icon={Timer}
            variant="blue"
            description="Awaiting safety window."
          />
          <StatCard
            title="Total Paid"
            amount={metrics.paidOut}
            icon={Wallet}
            description="Settled to your account."
          />
          <StatCard
            title="Disputed"
            amount={metrics.disputed}
            icon={ShieldAlert}
            variant="red"
            description="At risk due to active claims."
          />
        </div>

        {/* Ledger Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-white/10 overflow-visible shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-50 dark:border-white/5">
                <th className="px-8 py-6">ID</th>
                <th className="px-8 py-6">Lifecycle</th>
                <th className="px-8 py-6 text-center">Gross</th>
                <th className="px-8 py-6">Net Share</th>
                <th className="px-8 py-6 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-white/5">
              {orders.map((order) => {
                const isDisputed =
                  order.Dispute && order.Dispute.status === "in_review";
                const gross = Number(order.amount || 0);
                const net = order.Payout?.amountToPay
                  ? Number(order.Payout.amountToPay)
                  : gross * 0.8;

                return (
                  <tr
                    key={order.id}
                    className="group hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-colors relative"
                  >
                    {/* ID */}
                    <td className="px-8 py-8 relative">
                      <div
                        className="cursor-help"
                        onMouseEnter={() => setHoverKey(`id-${order.id}`)}
                        onMouseLeave={() => setHoverKey(null)}
                      >
                        <p className="font-black text-xl tracking-tighter">
                          #{order.id}
                        </p>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase">
                          {order.relatedType}
                        </p>
                        <InfoTooltip
                          isVisible={hoverKey === `id-${order.id}`}
                          title="Metadata"
                        >
                          <div className="flex justify-between">
                            <span>Created:</span>
                            <span>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 pt-1 border-t border-zinc-50 dark:border-white/5">
                            <span className="opacity-50 text-[8px]">
                              STRIPE ID:
                            </span>
                            <span className="truncate">
                              {order.stripePaymentIntentId}
                            </span>
                          </div>
                        </InfoTooltip>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-8">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tight ${
                          order.status === "completed"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                            : "bg-blue-500/10 border-blue-500/20 text-blue-600"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            order.status === "completed"
                              ? "bg-emerald-500"
                              : "bg-blue-500 animate-pulse"
                          }`}
                        />
                        {order.status}
                      </div>
                    </td>

                    {/* Gross */}
                    <td className="px-8 py-8 text-center">
                      <p className="text-sm font-bold opacity-30">
                        ${gross.toFixed(2)}
                      </p>
                    </td>

                    {/* Net Payout */}
                    <td className="px-8 py-8 relative">
                      <div
                        className="cursor-help"
                        onMouseEnter={() => setHoverKey(`pay-${order.id}`)}
                        onMouseLeave={() => setHoverKey(null)}
                      >
                        <p className="text-xl font-black italic tracking-tighter text-blue-600 dark:text-blue-400">
                          ${net.toFixed(2)}
                        </p>
                        <p className="text-[9px] font-black text-zinc-400 uppercase">
                          {order.Payout?.status || "Active"}
                        </p>
                        <InfoTooltip
                          isVisible={hoverKey === `pay-${order.id}`}
                          title="Breakdown"
                        >
                          <div className="flex justify-between">
                            <span>Gross:</span>
                            <span>${gross.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-red-500">
                            <span>Fee (20%):</span>
                            <span>-${(gross * 0.2).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-black pt-1 border-t border-zinc-100 dark:border-white/5">
                            <span>Net:</span>
                            <span>${net.toFixed(2)}</span>
                          </div>
                        </InfoTooltip>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-8 text-right">
                      <div className="flex justify-end gap-3">
                        {isDisputed ? (
                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
                            onClick={() =>
                              console.log(
                                "Navigate to Dispute Center",
                                order.id
                              )
                            }
                          >
                            <Gavel size={14} /> Dispute Center
                          </button>
                        ) : order.status === "active" ? (
                          <button
                            disabled={processingId === order.id}
                            onClick={async () => {
                              setProcessingId(order.id);
                              await serviceProviderCloseOrder(order.id);
                              await fetchData();
                              setProcessingId(null);
                            }}
                            className="px-5 py-2.5 bg-zinc-900 dark:bg-white dark:text-black text-white text-[10px] font-black uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                          >
                            {processingId === order.id ? (
                              <Loader2 className="animate-spin" size={12} />
                            ) : (
                              "Close Order"
                            )}
                          </button>
                        ) : (
                          <CheckCircle2 className="opacity-10" size={24} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
