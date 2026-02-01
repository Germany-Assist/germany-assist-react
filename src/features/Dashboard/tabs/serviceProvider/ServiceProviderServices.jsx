import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Eye,
  Box,
} from "lucide-react";
import MultiUseTable from "../../../../components/ui/dashboard/MultiUseTable";
import TransactionCell from "../../../../components/ui/dashboard/TransactionCell";
import ActionGroup from "../../../../components/ui/dashboard/ActionGroup";
import FilterContainer, {
  FilterToggle,
} from "../../../../components/ui/dashboard/FilterContainer";
import StatusModal from "../../../../components/ui/StatusModal";
import serviceProviderApis, {
  publishService,
  unpublishService,
} from "../../../../api/serviceProviderApis";
import DashboardHeader from "../../../../components/ui/dashboard/DashboardHeader";
import { getErrorMessage } from "../../../../api/errorMessages";
import { useNavigate } from "react-router-dom";

// TODO move this to component
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
  const navigate = useNavigate();

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
      setStatusModalCon({
        isOpen: true,
        onClose: () => setStatusModalCon(null),
        message: getErrorMessage(err),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };

  const handleTogglePublish = async (id, currentlyPublished) => {
    const previousState = [...services];
    const targetStatus = !currentlyPublished;
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: targetStatus } : s)),
    );
    try {
      if (currentlyPublished) {
        await unpublishService(id);
      } else {
        await publishService(id);
      }
    } catch (error) {
      setServices(previousState);
      setStatusModalCon({
        isOpen: true,
        type: "error",
        message: `Failed to ${targetStatus ? "publish" : "unpublish"} service. ${getErrorMessage(error)}.`,
      });
    }
  };

  const serviceColumns = [
    {
      header: "Service",
      render: (service) => (
        <TransactionCell
          title={service.title}
          subtext={`ID: ${service.id} • ${service.category}`}
          icon={Box}
          variant={service.rejected ? "danger" : "default"}
        />
      ),
    },
    {
      header: "Delivery Type",
      render: (service) => (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-black uppercase px-2.5 py-1 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/5 w-fit">
            {service.type === "oneTime" ? "One-Time Payment" : "Timeline Based"}
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
              show: !service.rejected,
              onClick: () => handleTogglePublish(service.id, service.published),
              variant: service.published ? "danger" : "success",
            },
            {
              label: "VIEW",
              show: true,
              onClick: () => navigate(`/admin/service/${service.id}`),
              variant: "success",
            },
            {
              label: "Edit",
              show: true,
              onClick: () =>
                setStatusModalCon({
                  isOpen: true,
                  type: "warning",
                  message:
                    "Please note that update is not allowed at this moment. We will discuss this in a meeting with the core team.",
                }),
              variant: "alert",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <DashboardHeader title={"Services"} subtitle={"manage your services"} />

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
            variant="emerald"
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
            variant="emerald"
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
            variant="red"
            onClick={() =>
              handleFilterChange(
                "rejected",
                filters.rejected === true ? undefined : true,
              )
            }
          />
        </div>
      </FilterContainer>

      <MultiUseTable
        columns={serviceColumns}
        data={services}
        loading={loading}
        pagination={meta}
        onPageChange={(newPage) => handleFilterChange("page", newPage)}
      />

      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />
    </div>
  );
}
