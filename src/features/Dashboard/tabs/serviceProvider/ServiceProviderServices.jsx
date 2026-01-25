import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  LayoutGrid,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Eye,
} from "lucide-react";

// UI Components
import MultiUseTable from "../../../../components/ui/dashboard/MultiUseTable";
import TransactionCell from "../../../../components/ui/dashboard/TransactionCell";
import ActionGroup from "../../../../components/ui/dashboard/ActionGroup";
import FilterContainer from "../../../../components/ui/dashboard/FilterContainer";
import StatusModal from "../../../../components/ui/StatusModal";

// API
import serviceProviderApis, {
  publishService,
  unpublishService,
} from "../../../../api/serviceProviderApis";

// --- STATUS LOGIC ENGINE ---
const getServiceStatus = (service) => {
  if (service.rejected)
    return {
      label: "Rejected",
      color: "text-red-500",
      dot: "bg-red-500",
      icon: AlertCircle,
    };
  if (service.published && service.approved)
    return {
      label: "Live",
      color: "text-emerald-500",
      dot: "bg-emerald-500 animate-pulse",
      icon: CheckCircle2,
    };
  if (service.published && !service.approved)
    return {
      label: "Pending Approval",
      color: "text-amber-500",
      dot: "bg-amber-500",
      icon: Clock,
    };
  if (service.approved && !service.published)
    return {
      label: "Pending Publish",
      color: "text-blue-500",
      dot: "bg-blue-500",
      icon: Globe,
    };
  return {
    label: "Pending",
    color: "text-zinc-400",
    dot: "bg-zinc-300",
    icon: Clock,
  };
};

export default function ServiceProviderServices() {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [statusModalCon, setStatusModalCon] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    title: "",
    category: "",
    order: "dec",
    sort: "price",
    type: undefined,
    published: undefined,
    approved: undefined,
    rejected: undefined,
  });

  // --- 1. DATA FETCHING ---
  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ""),
      );

      const response = await serviceProviderApis.getAllServices(cleanParams);
      if (response) {
        setServices(response.data || []);
        setMeta({
          page: response.page || 1,
          totalPages: response.totalPages || 1,
          total: response.total || 0,
        });
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // --- 2. OPTIMISTIC UPDATE LOGIC ---
  const handleTogglePublish = async (id, currentlyPublished) => {
    const previousState = [...services];
    const targetStatus = !currentlyPublished;

    // Optimistically update the UI locally
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: targetStatus } : s)),
    );

    try {
      if (currentlyPublished) {
        await unpublishService(id);
      } else {
        await publishService(id);
      }
      // Optional: Background fetch to ensure ID and meta are perfectly synced
      // fetchServices();
    } catch (error) {
      // Rollback on Axios failure
      setServices(previousState);
      setStatusModalCon({
        isOpen: true,
        type: "error",
        message: `Failed to ${targetStatus ? "publish" : "unpublish"} service. Sync error.`,
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  // --- 3. TABLE COLUMNS ---
  const serviceColumns = useMemo(
    () => [
      {
        header: "Service",
        render: (service) => (
          <TransactionCell
            id={service.title}
            subtext={`ID: ${service.id} • ${service.category}`}
            icon={LayoutGrid}
            variant={service.rejected ? "danger" : "default"}
          />
        ),
      },
      {
        header: "Delivery Type",
        render: (service) => (
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase px-2.5 py-1 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/5 w-fit">
              {service.type === "oneTime"
                ? "One-Time Payment"
                : "Timeline Based"}
            </span>
          </div>
        ),
      },
      {
        header: "Performance",
        render: (service) => (
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-sm font-black italic">
                <Eye size={12} className="text-zinc-400" />
                {service.views || 0}
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-400 uppercase">
                <span className="text-amber-500">{service.rating || 0} ★</span>
                <span>•</span>
                <span>{service.totalReviews || 0} Reviews</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Platform Status",
        render: (service) => {
          const status = getServiceStatus(service);
          return (
            <div className="flex flex-col gap-1.5">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border border-current bg-transparent w-fit ${status.color} opacity-90`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                <span className="text-[10px] font-black uppercase tracking-tight">
                  {status.label}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        header: "Action",
        align: "right",
        render: (service) => (
          <ActionGroup
            actions={[
              {
                label: service.published ? "Unpublish" : "Publish",
                show: !service.rejected, // Cannot toggle if rejected
                onClick: () =>
                  handleTogglePublish(service.id, service.published),
                variant: service.published ? "outline" : "emerald",
              },
              {
                label: "Edit",
                show: true,
                onClick: () => console.log("Edit", service.id),
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
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
            Services
          </h1>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-2">
            Inventory & Market Visibility
          </p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
          <Plus size={16} /> Create Service
        </button>
      </div>

      {/* FILTERS */}
      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) => handleFilterChange("title", val)}
        placeholder="Filter by title..."
      >
        <select
          value={filters.category || ""}
          onChange={(e) =>
            handleFilterChange("category", e.target.value || undefined)
          }
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-4 py-3 rounded-2xl text-[10px] font-black uppercase outline-none focus:ring-2 ring-blue-500/20"
        >
          <option value="">All Categories</option>
          <option value="visa-paperwork">Visa Paperwork</option>
        </select>

        <div className="flex flex-wrap gap-2 col-span-full pt-2">
          <FilterToggle
            label="Published"
            active={filters.published === true}
            color="emerald"
            onClick={() =>
              handleFilterChange(
                "published",
                filters.published === true ? undefined : true,
              )
            }
          />
          <FilterToggle
            label="Approved"
            active={filters.approved === true}
            color="emerald"
            onClick={() =>
              handleFilterChange(
                "approved",
                filters.approved === true ? undefined : true,
              )
            }
          />
          <FilterToggle
            label="Rejected"
            active={filters.rejected === true}
            color="red"
            onClick={() =>
              handleFilterChange(
                "rejected",
                filters.rejected === true ? undefined : true,
              )
            }
          />
        </div>
      </FilterContainer>

      {/* TABLE */}
      <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-white/5 overflow-hidden">
        <MultiUseTable
          columns={serviceColumns}
          data={services}
          loading={loading}
          pagination={meta}
          onPageChange={(newPage) => handleFilterChange("page", newPage)}
        />
      </div>

      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />
    </div>
  );
}

const FilterToggle = ({ label, active, onClick, color }) => {
  const colorClasses = {
    emerald: active
      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
    red: active
      ? "bg-red-500/10 border-red-500/50 text-red-500"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
  };
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${colorClasses[color] || ""}`}
    >
      {label}
    </button>
  );
};
