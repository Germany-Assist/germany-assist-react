import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  LayoutGrid,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Layers,
  Globe,
  Lock,
  Tag,
  TrendingUp,
  Timer,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import ActionGroup from "../../../../components/ui/ActionGroup";
import FilterContainer from "../../../../components/ui/FilterContainer";
import StatusModal from "../../../../components/ui/StatusModal";
import adminApis, {
  getAllServicesStatistical,
} from "../../../../api/adminApis";
import MetricCard from "../../../../components/ui/MetricCard";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [statusModalCon, setStatusModalCon] = useState(null);
  const [metrics, setMetrics] = useState({
    totalServices: "",
    totalLiveServices: "",
    totalPendingServices: "",
    totalRejectedServices: "",
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    title: "",
    approved: undefined,
    rejected: undefined,
  });
  useEffect(() => {
    (async () => {
      const metrics = await getAllServicesStatistical();
      setMetrics(metrics.data);
    })();
  }, []);
  console.log(metrics);
  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      // Logic: Only strip undefined or empty strings. Explicit 'false' is allowed to pass to the API.
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ""),
      );

      const response = await adminApis.getAllServices(cleanParams);
      if (response && response.data) {
        setServices(response.data);
        setMeta({
          page: response.page || 1,
          totalPages: response.totalPages || 1,
          total: response.total || 0,
        });
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const executeStatusUpdate = async (id, status) => {
    try {
      await adminApis.updateServiceStatus({ id, status });
      setStatusModalCon({
        isOpen: true,
        type: "success",
        message: `Service visibility updated to: ${status}.`,
        onClose: () => setStatusModalCon(null),
      });
      fetchServices();
    } catch (err) {
      setStatusModalCon({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: err?.response?.data?.message || "Internal server error.",
        onClose: () => setStatusModalCon(null),
      });
    }
  };

  const handleUpdateClick = (id, status) => {
    setStatusModalCon({
      isOpen: true,
      type: "operation",
      message: `Are you sure you want to ${status} this service?`,
      buttonText: status === "approve" ? "Confirm Approval" : "Reject Service",
      onConfirm: () => executeStatusUpdate(id, status),
      onClose: () => setStatusModalCon(null),
    });
  };

  const adminColumns = useMemo(
    () => [
      {
        header: "Service & Provider",
        render: (service) => (
          <TransactionCell
            id={service.title || "Untitled Service"}
            subtext={service.serviceProvider || "Unknown Provider"}
            icon={LayoutGrid}
          />
        ),
      },
      {
        header: "Inventory Details",
        render: (service) => (
          <div className="flex flex-col gap-2 py-2 min-w-[300px]">
            {/* RENDER VARIANTS IF ONE-TIME */}
            {service.type === "oneTime" &&
              service.variants?.variants?.map((v) => (
                <div
                  key={v.id}
                  className={`group flex items-center justify-between border p-2.5 rounded-xl transition-all duration-300 ${
                    v.isArchived
                      ? "bg-zinc-100/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/5 opacity-50 grayscale"
                      : "bg-white dark:bg-white/[0.03] border-zinc-100 dark:border-white/10 shadow-sm hover:border-emerald-500/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        v.isArchived
                          ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-emerald-500"
                      }`}
                    >
                      <Tag size={12} strokeWidth={2.5} />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-black uppercase tracking-tight truncate ${
                            v.isArchived
                              ? "text-zinc-500 line-through"
                              : "text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {v.label}
                        </span>

                        {v.isArchived && (
                          <span className="text-[8px] font-black uppercase px-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-500">
                            Archived
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* The Dot Leader hides when archived to keep it clean */}
                  {!v.isArchived && (
                    <div className="flex-1 mx-3 border-b border-dotted border-zinc-200 dark:border-zinc-800 mb-1" />
                  )}

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-md border ${
                        v.isArchived
                          ? "text-zinc-400 border-transparent"
                          : "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                      }`}
                    >
                      ${v.price}
                    </span>
                  </div>
                </div>
              ))}

            {service.type === "timeline" &&
              service.timelines?.timelines?.map((t) => (
                <div
                  key={t.id}
                  className={`flex flex-col p-3 rounded-xl border transition-all duration-300 ${
                    t.isArchived
                      ? "bg-zinc-100/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/5 opacity-60 grayscale-[0.5]"
                      : "bg-white dark:bg-white/[0.03] border-zinc-100 dark:border-white/10 shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider ${
                          t.isArchived
                            ? "text-zinc-500"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {t.label}
                      </span>

                      {/* Enhanced Archived Badge */}
                      {t.isArchived && (
                        <span className="px-1.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[8px] font-black uppercase tracking-tighter border border-zinc-300 dark:border-zinc-700">
                          Archived
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-bold ${t.isArchived ? "text-zinc-400" : "text-zinc-700 dark:text-zinc-200"}`}
                    >
                      ${t.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-semibold text-zinc-400 mt-2 uppercase tracking-tight">
                    <span>{new Date(t.startDate).toLocaleDateString()}</span>
                    <span className="opacity-30">—</span>
                    <span>{new Date(t.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            {!service.variants?.variants?.length &&
              !service.timelines?.timelines?.length && (
                <span className="text-[10px] italic text-zinc-400">
                  No active branches/tiers
                </span>
              )}
          </div>
        ),
      },
      {
        header: "Config & Visibility",
        render: (service) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              {service.type === "timeline" ? (
                <Calendar size={12} className="text-blue-500" />
              ) : (
                <Layers size={12} className="text-emerald-500" />
              )}
              <span
                className={`text-[9px] font-black uppercase ${service.type === "timeline" ? "text-blue-500" : "text-emerald-500"}`}
              >
                {service.type}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {service.published ? (
                <Globe size={10} className="text-emerald-500" />
              ) : (
                <Lock size={10} className="text-zinc-400" />
              )}
              <span className="text-[9px] font-bold uppercase text-zinc-500">
                {service.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        ),
      },
      {
        header: "Status",
        render: (service) => (
          <div className="flex items-center gap-2">
            {service.approved ? (
              <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12} />
                <span className="text-[9px] font-black uppercase">
                  Approved
                </span>
              </div>
            ) : service.rejected ? (
              <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                <ShieldAlert size={12} />
                <span className="text-[9px] font-black uppercase">
                  Rejected
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase">Pending</span>
              </div>
            )}
          </div>
        ),
      },
      {
        header: "Action",
        align: "right",
        render: (service) => (
          <ActionGroup
            actions={[
              {
                label: "Approve",
                show: !service.approved,
                onClick: () => handleUpdateClick(service.id, "approve"),
                variant: "emerald",
              },
              {
                label: "Reject",
                show: !service.rejected,
                onClick: () => handleUpdateClick(service.id, "reject"),
                variant: "outline",
              },
              {
                label: "View",
                show: true,
                onClick: () => window.open(`/service/${service.id}`, "_blank"),
                variant: "outline",
              },
            ]}
          />
        ),
      },
    ],
    [services],
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
            Admin Services Console
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">
            Deep-Audit Service Verification
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Services"
          amount={metrics.totalServices}
          icon={Layers} // Represents the collection/stack
          sub="Total platform reach"
          variant="default"
        />
        <MetricCard
          title="Live Services"
          amount={metrics.totalLiveServices}
          icon={CheckCircle} // Clear "Success/Published" indicator
          sub="Approved & public"
          variant="green"
        />
        <MetricCard
          title="Pending Review"
          amount={metrics.totalPendingServices}
          icon={Clock} // Represents "Waiting"
          sub="Awaiting admin audit"
          variant="yellow"
          isCount
        />
        <MetricCard
          title="Rejected"
          amount={metrics.totalRejectedServices}
          icon={XCircle} // Represents "Stopped/Denied"
          sub="Requires revision"
          variant="red"
        />
      </div>

      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) =>
          setFilters((p) => ({ ...p, title: val, page: 1 }))
        }
      >
        <div className="flex gap-2 pt-2">
          {/* ALL FILTER: Resets to undefined to show everything */}
          <FilterToggle
            label="All"
            active={
              filters.approved === undefined && filters.rejected === undefined
            }
            onClick={() =>
              setFilters((p) => ({
                ...p,
                approved: undefined,
                rejected: undefined,
                page: 1,
              }))
            }
          />
          {/* PENDING FILTER: Explicitly False for both */}
          <FilterToggle
            label="Pending"
            active={filters.approved === false && filters.rejected === false}
            onClick={() =>
              setFilters((p) => ({
                ...p,
                approved: false,
                rejected: false,
                page: 1,
              }))
            }
          />
          {/* APPROVED FILTER: Explicitly True */}
          <FilterToggle
            label="Approved"
            active={filters.approved === true}
            onClick={() =>
              setFilters((p) => ({
                ...p,
                approved: true,
                rejected: false,
                page: 1,
              }))
            }
          />
          {/* REJECTED FILTER: Explicitly True */}
          <FilterToggle
            label="Rejected"
            active={filters.rejected === true}
            onClick={() =>
              setFilters((p) => ({
                ...p,
                rejected: true,
                approved: false,
                page: 1,
              }))
            }
          />
        </div>
      </FilterContainer>

      <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-white/5 overflow-hidden">
        <MultiUseTable
          columns={adminColumns}
          data={services}
          loading={loading}
          pagination={meta}
          onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
        />
      </div>

      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />
    </div>
  );
}

const FilterToggle = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${
      active
        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white"
        : "bg-transparent text-zinc-500 border-zinc-100 dark:border-white/5 hover:border-zinc-300"
    }`}
  >
    {label}
  </button>
);
