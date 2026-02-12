import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Archive,
  LayoutGrid,
  Calendar,
  Plus,
  Signpost,
  Eye,
} from "lucide-react";
import MultiUseTable from "../../../../components/ui/dashboard/MultiUseTable";
import TransactionCell from "../../../../components/ui/dashboard/TransactionCell";
import ActionGroup from "../../../../components/ui/dashboard/ActionGroup";
import FilterContainer from "../../../../components/ui/dashboard/FilterContainer";
import serviceProviderApis, {
  archiveTimeline,
  createNewPost,
  createNewTimeline,
} from "../../../../api/serviceProviderApis";
import StatusModal from "../../../../components/ui/StatusModal";
import PostCreationModal from "../../../../components/ui/dashboard/PostCreationModal";
import TimelineCreationModal from "../../../../components/ui/dashboard/TimelineCreationModal";
import DashboardHeader from "../../../../components/ui/dashboard/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../../api/errorMessages";

const getServiceStatus = (service) => {
  if (service.rejected)
    return { label: "Rejected", color: "text-red-500", dot: "bg-red-500" };
  if (service.published && service.approved)
    return {
      label: "Live",
      color: "text-emerald-500",
      dot: "bg-emerald-500 animate-pulse",
    };
  if (service.published && !service.approved)
    return {
      label: "Pending Approval",
      color: "text-amber-500",
      dot: "bg-amber-500",
    };
  if (service.approved && !service.published)
    return {
      label: "Pending Publish",
      color: "text-blue-500",
      dot: "bg-blue-500",
    };
  return { label: "Pending", color: "text-zinc-400", dot: "bg-zinc-300" };
};

export default function ServiceProviderTimelines() {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [statusModalCon, setStatusModalCon] = useState(null);
  const [selectedTimelineId, setSelectedTimelineId] = useState(null);
  const [addingNewTimelineId, setAddingNewTimelineId] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "timeline",
    title: "",
  });
  const navigate = useNavigate();
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
    fetchGroupedData();
  }, [fetchGroupedData]);

  const executeArchive = async (id, serviceId) => {
    const previousState = [...services];
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              timelines: {
                ...s.timelines,
                timelines: s.timelines.timelines.map((t) =>
                  t.id === id ? { ...t, isArchived: true } : t,
                ),
              },
            }
          : s,
      ),
    );

    try {
      await archiveTimeline(id);
      setStatusModalCon({
        isOpen: true,
        message: "Timeline branch archived.",
        type: "success",
        onClose: () => setStatusModalCon(null),
      });
    } catch (error) {
      setServices(previousState);
      setStatusModalCon({
        isOpen: true,
        type: "error",
        title: "Sync Failed",
        message: getErrorMessage(error),
        onClose: () => setStatusModalCon(null),
      });
    }
  };

  const handleArchiveRequest = (id, serviceId) => {
    setStatusModalCon({
      isOpen: true,
      type: "operation",
      message:
        "Are you sure you want to archive this timeline? It will be hidden from new client bookings.",
      buttonText: "Archive Timeline",
      onConfirm: () => executeArchive(id, serviceId),
      onClose: () => setStatusModalCon(null),
    });
  };

  const handlePostCreation = async (payload) => {
    try {
      await createNewPost({
        timelineId: selectedTimelineId,
        description: payload.description,
        isPinned: payload.isPinned,
      });
      setSelectedTimelineId(null);
      await fetchGroupedData();
      setStatusModalCon({
        isOpen: true,
        message: "Update posted successfully.",
        type: "success",
        onClose: () => setStatusModalCon(null),
      });
    } catch (error) {
      setStatusModalCon({
        isOpen: true,
        type: "error",
        title: "Post Failed",
        message: getErrorMessage(error),
      });
    }
  };

  const handleTimelineCreation = async (payload) => {
    try {
      await createNewTimeline({ ...payload, serviceId: addingNewTimelineId });
      setAddingNewTimelineId(null);
      setStatusModalCon({
        isOpen: true,
        message: "New timeline branch created.",
        type: "success",
        onClose: () => setStatusModalCon(null),
      });
      fetchGroupedData();
    } catch (error) {
      setStatusModalCon({
        isOpen: true,
        type: "error",
        title: "Creation Error",
        message: getErrorMessage(error),
      });
    }
  };

  const groupedColumns = useMemo(
    () => [
      {
        header: "Service Group",
        render: (service) => (
          <TransactionCell
            title={service.title}
            subtext={`${service.category} • ${service.timelines?.timelines?.length || 0} Branches`}
            icon={LayoutGrid}
          />
        ),
      },
      {
        header: "Timeline Branches",
        render: (service) => (
          <div className="flex flex-col gap-2 py-2 min-w-[340px]">
            {service.timelines?.timelines?.map((timeline) => (
              <div
                key={timeline.id}
                className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  timeline.isArchived
                    ? "bg-zinc-100/50 dark:bg-white/[0.01] border-zinc-200 dark:border-white/5 opacity-50 grayscale"
                    : "bg-zinc-50/50 dark:bg-white/[0.02] border-zinc-100 dark:border-white/5 hover:border-blue-500/30"
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase ${timeline.isArchived ? "text-zinc-400" : "text-zinc-800 dark:text-zinc-200"}`}
                    >
                      {timeline.label}
                    </span>
                    {timeline.isArchived && (
                      <span className="text-[7px] font-black bg-zinc-200 dark:bg-white/10 text-zinc-500 px-1.5 py-0.5 rounded uppercase tracking-widest">
                        Archived
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={10} className="text-zinc-400" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">
                      {new Date(timeline.startDate).toLocaleDateString()} —{" "}
                      {new Date(timeline.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-black italic ${timeline.isArchived ? "text-zinc-400" : "text-blue-600"}`}
                  >
                    ${timeline.price}
                  </span>
                  {!timeline.isArchived && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedTimelineId(timeline.id)}
                        className="p-1.5 opacity-0 group-hover:opacity-100 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Signpost size={16} />
                      </button>
                      <button
                        onClick={() =>
                          handleArchiveRequest(timeline.id, service.id)
                        }
                        className="p-1.5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all"
                      >
                        <Archive size={16} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/admin/timeline/${timeline.id}`)
                        }
                        className="p-1.5 opacity-0 group-hover:opacity-100 bg-green-500/10 text-blue-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                        title="Archive Timeline"
                      >
                        <Eye size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        header: "Status",
        render: (service) => {
          const status = getServiceStatus(service);
          return (
            <div
              className={`flex items-center gap-2 px-2.5 py-1 rounded-full border border-current w-fit ${status.color}`}
            >
              <span className={`w-1 h-1 rounded-full ${status.dot}`} />
              <span className="text-[9px] font-black uppercase">
                {status.label}
              </span>
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
                label: "Add Timeline",
                show: true,
                onClick: () => setAddingNewTimelineId(service.id),
                variant: "primary",
              },
              {
                label: "View",
                show: true,
                onClick: () => navigate(`/admin/service/${service.id}`),
                variant: "success",
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
      <DashboardHeader
        title={"Timeline CONSOLE"}
        subtitle={"manage timelines"}
      />
      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) =>
          setFilters((prev) => ({ ...prev, title: val, page: 1 }))
        }
      />

      <MultiUseTable
        columns={groupedColumns}
        data={services}
        loading={loading}
        pagination={meta}
        onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
      />

      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />

      <PostCreationModal
        isOpen={selectedTimelineId !== null}
        onSubmit={handlePostCreation}
        onClose={() => setSelectedTimelineId(null)}
      />
      <TimelineCreationModal
        isOpen={addingNewTimelineId !== null}
        onSubmit={handleTimelineCreation}
        onClose={() => setAddingNewTimelineId(null)}
      />
    </div>
  );
}
