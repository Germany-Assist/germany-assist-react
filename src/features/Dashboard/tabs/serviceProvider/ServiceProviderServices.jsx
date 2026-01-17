import React, { useEffect, useState, useCallback } from "react";
import { LayoutGrid, Loader2, Plus, Search, Ban } from "lucide-react";
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import OrderStatusBadge from "../../../../components/ui/OrderStatusBadge";
import ActionGroup from "../../../../components/ui/ActionGroup";
import FilterContainer from "../../../../components/ui/FilterContainer";
import serviceProviderApis, {
  publishService,
  unpublishService,
} from "../../../../api/serviceProviderApis";

export default function ServiceProviderServices() {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

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
    minPrice: undefined,
    maxPrice: undefined,
  });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      // Logic: Only remove keys if they are EXACTLY undefined or empty strings.
      // We want to keep 'false' values if we explicitly filter for un-published.
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleTogglePublish = async (id, isPublished) => {
    if (isPublished) await unpublishService(id);
    else await publishService(id);
    fetchServices();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const serviceColumns = [
    {
      header: "Service",
      render: (service) => (
        <TransactionCell
          id={service.title}
          subtext={`ID: ${service.id} • ${service.category}`}
          icon={LayoutGrid}
          // Shift style to red ONLY if rejected
          variant={service.rejected ? "danger" : "default"}
        />
      ),
    },
    {
      header: "Type",
      render: (service) => (
        <span className="text-[10px] font-black uppercase px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/5">
          {service.type === "oneTime" ? "One-Time" : "Timeline"}
        </span>
      ),
    },
    {
      header: "Performance",
      render: (service) => (
        <div>
          <p className="text-sm font-black italic">
            {service.views || 0} Views
          </p>
          <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-400 uppercase">
            <span className="text-amber-500">{service.rating || 0} ★</span>
            <span>•</span>
            <span>{service.totalReviews || 0} Reviews</span>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (service) => (
        <div className="flex flex-col gap-1">
          <OrderStatusBadge status={service.level} />
          <div className="flex flex-col gap-0.5">
            {service.published && (
              <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />{" "}
                Live
              </span>
            )}
            {service.rejected && (
              <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest">
                Rejected
              </span>
            )}
          </div>
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
              label: service.published ? "Unpublish" : "Publish",
              show: true,
              onClick: () => handleTogglePublish(service.id, service.published),
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
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-5">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Services
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Manage Ledger & Visibility
          </p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white dark:text-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          <Plus size={14} /> Create
        </button>
      </div>

      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) => handleFilterChange("title", val)}
      >
        <select
          value={filters.category || ""}
          onChange={(e) =>
            handleFilterChange(
              "category",
              e.target.value === "" ? undefined : e.target.value,
            )
          }
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-4 py-3 rounded-2xl text-[10px] font-black uppercase outline-none"
        >
          <option value="">All Categories</option>
          <option value="visa-paperwork">Visa Paperwork</option>
        </select>

        <div className="flex flex-wrap gap-2 col-span-full pt-2">
          {/* TRIPLE STATE TOGGLES */}
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
          <FilterToggle
            label="One-Time"
            active={filters.type === "oneTime"}
            color="blue"
            onClick={() =>
              handleFilterChange(
                "type",
                filters.type === "oneTime" ? undefined : "oneTime",
              )
            }
          />
          <FilterToggle
            label="Timeline"
            active={filters.type === "timeline"}
            color="blue"
            onClick={() =>
              handleFilterChange(
                "type",
                filters.type === "timeline" ? undefined : "timeline",
              )
            }
          />
        </div>
      </FilterContainer>

      <div className="relative">
        <MultiUseTable
          columns={serviceColumns}
          data={services}
          loading={loading}
          pagination={meta}
          onPageChange={(newPage) => handleFilterChange("page", newPage)}
        />
      </div>
    </div>
  );
}

const FilterToggle = ({ label, active, onClick, color }) => {
  const colorClasses = {
    emerald: active
      ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
    blue: active
      ? "bg-blue-500/10 border-blue-500 text-blue-500"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
    red: active
      ? "bg-red-500/10 border-red-500 text-red-500"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
  };
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${colorClasses[color]}`}
    >
      {label}
    </button>
  );
};
