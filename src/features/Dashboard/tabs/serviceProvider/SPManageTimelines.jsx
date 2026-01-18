import React, { useEffect, useState, useCallback } from "react";
import {
  History,
  LayoutGrid,
  Calendar,
  Plus,
  Search,
  Edit3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// UI Components
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import OrderStatusBadge from "../../../../components/ui/OrderStatusBadge";
import ActionGroup from "../../../../components/ui/ActionGroup";
import FilterContainer from "../../../../components/ui/FilterContainer";

// API
import serviceProviderApis, {
  createNewPost,
} from "../../../../api/serviceProviderApis";
import StatusModal from "../../../../components/ui/StatusModal";
import PostCreationModal from "../../../../components/ui/PostCreationModal";
export default function ServiceProviderTimelines() {
  // --- 1. STATE MANAGEMENT ---
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [statusModalCon, setStatusModalCon] = useState(null);
  const [selectedTimelineId, setSelectedTimelineId] = useState(null);

  async function handlePostCreation({ description, isPinned }) {
    const body = {
      timelineId: selectedTimelineId,
      description,
      isPinned,
    };
    try {
      await createNewPost(body);
      setSelectedTimelineId(null);
      setStatusModalCon({ isOpen: true, message: "Post Created Successfully" });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something Went Wrong";
      setStatusModalCon({
        isOpen: true,
        message: errorMessage,
        type: "error",
      });
    }
  }
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "timeline",
    title: "",
    category: "",
    published: undefined,
  });

  // --- 2. API LOGIC ---
  const fetchGroupedData = useCallback(async () => {
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
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGroupedData();
  }, [fetchGroupedData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  // --- 3. COLUMNS WITH NESTED GROUPING ---
  const groupedColumns = [
    {
      header: "Service Group",
      render: (service) => (
        <TransactionCell
          id={service.title}
          subtext={`${service.category} • ${service.timelines?.length || 0} timelines`}
          icon={LayoutGrid}
          variant="default"
        />
      ),
    },
    {
      header: "Timelines ",
      render: (service) => (
        <div className="flex flex-col gap-2 py-2 min-w-[300px]">
          {service.timelines?.map((timeline) => (
            <div
              key={timeline.id}
              className="group flex items-center justify-between p-3 rounded-2xl border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] hover:border-blue-500/30 transition-colors"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-zinc-800 dark:text-zinc-200">
                    {timeline.label}
                  </span>
                  {timeline.isArchived && (
                    <span className="text-[7px] font-bold text-red-500 uppercase px-1.5 py-0.5 bg-red-500/5 border border-red-500/20 rounded">
                      Archived
                    </span>
                  )}
                </div>
                <span className="text-[12px] font-bold text-zinc-400 flex items-center gap-1 mt-0.5">
                  <Calendar size={10} />
                  {new Date(timeline.startDate).toLocaleDateString()} —{" "}
                  {new Date(timeline.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-black italic tracking-tighter text-blue-600 dark:text-blue-400">
                  ${timeline.price}
                </span>
                <button
                  onClick={() => setSelectedTimelineId(timeline.id)}
                  className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-lg transition-all"
                >
                  <Edit3 size={12} className="text-zinc-400" />
                </button>
              </div>
            </div>
          ))}
          {(!service.timelines || service.timelines.length === 0) && (
            <span className="text-[10px] italic text-zinc-400">
              No Timelines found for this service.
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
              label: "Add Timeline",
              show: true,
              onClick: () => console.log("Add to", service.id),
              variant: "primary",
            },
            {
              label: "Service Settings",
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
            Timeline Ledger
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Grouped Timelines management by service
          </p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white dark:text-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-transform hover:scale-[1.02]">
          <Plus size={14} /> Create Service
        </button>
      </div>

      {/* FILTERS */}
      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) => handleFilterChange("title", val)}
        placeholder="Search Service Title..."
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
            label="Live Only"
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
          columns={groupedColumns}
          data={services} // Passing the raw nested services array
          loading={loading}
          pagination={meta}
          onPageChange={(newPage) => handleFilterChange("page", newPage)}
        />
      </div>
      <StatusModal
        isOpen={statusModalCon?.isOpen}
        type={statusModalCon?.type}
        message={statusModalCon?.message}
        onClose={() => {
          setStatusModalCon(null);
        }}
      />
      <PostCreationModal
        isOpen={selectedTimelineId}
        onSubmit={handlePostCreation}
        onClose={() => {
          setSelectedTimelineId(null);
        }}
      />
    </div>
  );
}

// Helper FilterToggle
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
