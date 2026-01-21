import React, { useEffect, useState, useCallback } from "react";
import { LayoutGrid, Plus, Search, Edit3, Tag, Package } from "lucide-react";

// UI Components
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import OrderStatusBadge from "../../../../components/ui/OrderStatusBadge";
import ActionGroup from "../../../../components/ui/ActionGroup";
import FilterContainer from "../../../../components/ui/FilterContainer";

// API
import serviceProviderApis from "../../../../api/serviceProviderApis";

export default function ServiceProviderVariants() {
  // --- 1. STATE MANAGEMENT ---
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "oneTime", // Lock this view to oneTime services which have variants
    title: "",
    category: "",
    published: undefined,
  });

  // --- 2. API LOGIC ---
  const fetchVariantsData = useCallback(async () => {
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
      console.error("Failed to fetch variants:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVariantsData();
  }, [fetchVariantsData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  // --- 3. COLUMNS WITH NESTED VARIANTS ---
  const variantColumns = [
    {
      header: "Service",
      render: (service) => (
        <TransactionCell
          id={service.title}
          subtext={`${service.category} • ${service.variants?.variants?.length || 0} Variants`}
          icon={Package}
          variant="default"
        />
      ),
    },
    {
      header: "Available Variants",
      render: (service) => (
        <div className="flex flex-col gap-2 py-2 min-w-[280px]">
          {service.variants?.variants?.map((variant) => (
            <div
              key={variant.id}
              className="group flex items-center justify-between p-3 rounded-2xl border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-white/5">
                  <Tag size={12} className="text-zinc-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-zinc-800 dark:text-zinc-200">
                    {variant.label}
                  </span>
                  <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">
                    Ref ID: {variant.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-black italic tracking-tighter text-emerald-600 dark:text-emerald-400">
                  ${variant.price}
                </span>
                <button
                  onClick={() => console.log("Edit variant", variant.id)}
                  className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-lg transition-all"
                >
                  <Edit3 size={12} className="text-zinc-400" />
                </button>
              </div>
            </div>
          ))}
          {(!service.variants?.variants ||
            service.variants?.variants?.length === 0) && (
            <span className="text-[10px] italic text-zinc-400 p-2">
              No variants defined.
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      render: (service) => (
        <div className="flex flex-col gap-1">
          <OrderStatusBadge status={service.level} />
          {service.published && (
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
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
              label: "Add Variant",
              show: true,
              onClick: () => console.log("Add variant to", service.id),
              variant: "primary",
            },
            {
              label: "Settings",
              show: true,
              onClick: () => console.log("Edit Service", service.id),
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
            Variant Ledger
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Manage pricing tiers for one-time services
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) => handleFilterChange("title", val)}
        placeholder="Search Service..."
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

        <div className="flex gap-2 col-span-full pt-2">
          <FilterToggle
            label="Published Only"
            active={filters.published === true}
            color="emerald"
            onClick={() =>
              handleFilterChange(
                "published",
                filters.published === true ? undefined : true,
              )
            }
          />
        </div>
      </FilterContainer>

      {/* TABLE */}
      <div className="relative">
        <MultiUseTable
          columns={variantColumns}
          data={services}
          loading={loading}
          pagination={meta}
          onPageChange={(newPage) => handleFilterChange("page", newPage)}
        />
      </div>
    </div>
  );
}

// Reusable FilterToggle (Can be moved to its own file later)
const FilterToggle = ({ label, active, onClick, color }) => {
  const colorClasses = {
    emerald: active
      ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-sm"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
    blue: active
      ? "bg-blue-500/10 border-blue-500 text-blue-500"
      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-400",
  };
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all duration-200 ${colorClasses[color]}`}
    >
      {label}
    </button>
  );
};
