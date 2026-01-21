import React, { useEffect, useState, useCallback } from "react";
import {
  LayoutGrid,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Eye,
  AlertCircle,
} from "lucide-react";
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import ActionGroup from "../../../../components/ui/ActionGroup";
import FilterContainer from "../../../../components/ui/FilterContainer";
import adminApis from "../../../../api/adminApis";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    title: "",
    approved: undefined,
    rejected: undefined,
  });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ""),
      );
      const response = await adminApis.getAllServices(cleanParams);

      // Safety check: ensure response.data is an array
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

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminApis.updateServiceStatus({ id, status });
      fetchServices();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  // DEFINING EXPLICIT COLUMNS PREVENTS ERROR #31
  const adminColumns = [
    {
      header: "Service",
      render: (service) => (
        <TransactionCell
          id={service.title || "Untitled Service"}
          subtext={`ID: ${service.id}`}
          icon={LayoutGrid}
        />
      ),
    },
    {
      header: "Category & Type",
      render: (service) => (
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-zinc-500">
            {service.category}
          </span>
          <span className="text-[9px] font-bold text-zinc-400">
            {service.type}
          </span>
        </div>
      ),
    },
    {
      header: "Pricing",
      render: (service) => {
        // If price is an object {min, max}, format it. If it's a number, show it.
        if (typeof service.price === "object" && service.price !== null) {
          return (
            <span className="text-sm font-black italic">
              ${service.price.minPrice} - ${service.price.maxPrice}
            </span>
          );
        }
        return (
          <span className="text-sm font-black italic">
            ${service.price || 0}
          </span>
        );
      },
    },
    {
      header: "Status",
      render: (service) => (
        <div className="flex items-center gap-2">
          {service.approved ? (
            <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck size={12} />
              <span className="text-[9px] font-black uppercase">Approved</span>
            </div>
          ) : service.rejected ? (
            <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              <ShieldAlert size={12} />
              <span className="text-[9px] font-black uppercase">Rejected</span>
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
              onClick: () => handleUpdateStatus(service.id, "approve"),
              variant: "emerald",
            },
            {
              label: "Reject",
              show: !service.rejected,
              onClick: () => handleUpdateStatus(service.id, "reject"),
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
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-5">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Admin Console
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Service Verification Ledger
          </p>
        </div>
      </div>

      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) => handleFilterChange("title", val)}
      >
        <div className="flex gap-2 pt-2">
          <FilterToggle
            label="Pending"
            active={
              filters.approved === undefined && filters.rejected === undefined
            }
            onClick={() =>
              setFilters((p) => ({
                ...p,
                approved: undefined,
                rejected: undefined,
              }))
            }
          />
          <FilterToggle
            label="Approved"
            active={filters.approved === true}
            onClick={() =>
              handleFilterChange(
                "approved",
                filters.approved === true ? undefined : true,
              )
            }
          />
        </div>
      </FilterContainer>

      <MultiUseTable
        columns={adminColumns}
        data={services}
        loading={loading}
        pagination={meta}
        onPageChange={(p) => handleFilterChange("page", p)}
      />
    </div>
  );
}

const FilterToggle = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${
      active
        ? "bg-white text-black border-white"
        : "bg-zinc-900 text-zinc-500 border-white/5"
    }`}
  >
    {label}
  </button>
);
