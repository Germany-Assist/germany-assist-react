import React, { useEffect, useState, useCallback, useMemo } from "react";
import { LayoutGrid, Plus, Search, Archive, Tag, Package } from "lucide-react";

// UI Components
import MultiUseTable from "../../../../components/ui/MultiUseTable";
import TransactionCell from "../../../../components/ui/TransactionCell";
import ActionGroup from "../../../../components/ui/ActionGroup";
import FilterContainer from "../../../../components/ui/FilterContainer";
import serviceProviderApis, {
  archiveVariant,
  createNewVariant,
} from "../../../../api/serviceProviderApis";
import VariantsCreationModal from "../../../../components/ui/VariantsCreationModal";
import StatusModal from "../../../../components/ui/StatusModal";

// --- STATUS LOGIC ENGINE ---
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

export default function ServiceProviderVariants() {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [newVariantServiceId, setNewVariantServiceId] = useState(null);
  const [statusModalCon, setStatusModalCon] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "oneTime",
    title: "",
    category: "",
  });

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
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVariantsData();
  }, [fetchVariantsData]);

  // --- 1. ARCHIVE EXECUTION ---
  const executeArchive = async (variantId, serviceId) => {
    const previousState = [...services];

    // Optimistically toggle isArchived
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === serviceId) {
          return {
            ...service,
            variants: {
              ...service.variants,
              variants: service.variants.variants.map((v) =>
                v.id === variantId ? { ...v, isArchived: true } : v,
              ),
            },
          };
        }
        return service;
      }),
    );

    try {
      await archiveVariant(variantId);
      setStatusModalCon({
        isOpen: true,
        type: "success",
        message: "Variant successfully flagged as archived.",
        onClose: () => setStatusModalCon(null),
      });
    } catch (error) {
      setServices(previousState); // Rollback
      setStatusModalCon({
        isOpen: true,
        type: "error",
        title: "Sync Error",
        message:
          error?.response?.data?.message ||
          "Failed to archive variant. State reverted.",
        onClose: () => setStatusModalCon(null),
      });
    }
  };

  // --- 2. ARCHIVE REQUEST (CONFIRMATION) ---
  const handleArchiveRequest = (variantId, serviceId) => {
    setStatusModalCon({
      isOpen: true,
      type: "operation",
      message:
        "Are you sure you want to archive this variant? It will no longer be visible to customers.",
      buttonText: "Archive Variant",
      onConfirm: () => executeArchive(variantId, serviceId),
      onClose: () => setStatusModalCon(null),
    });
  };

  const variantColumns = useMemo(
    () => [
      {
        header: "Service",
        render: (service) => (
          <TransactionCell
            id={service.title}
            subtext={`${service.category} • ${service.variants?.variants?.length || 0} Total Tiers`}
            icon={Package}
          />
        ),
      },
      {
        header: "Tier Ledger",
        render: (service) => (
          <div className="flex flex-col gap-2 py-2 min-w-[320px]">
            {service.variants?.variants?.map((variant) => (
              <div
                key={variant.id}
                className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  variant.isArchived
                    ? "bg-zinc-100/50 dark:bg-white/[0.01] border-zinc-200 dark:border-white/5 opacity-60 grayscale"
                    : "bg-zinc-50/50 dark:bg-white/[0.02] border-zinc-100 dark:border-white/5 hover:border-blue-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-white/5">
                    <Tag
                      size={12}
                      className={
                        variant.isArchived ? "text-zinc-300" : "text-zinc-500"
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-zinc-800 dark:text-zinc-200">
                        {variant.label}
                      </span>
                      {variant.isArchived && (
                        <span className="text-[7px] font-black bg-zinc-200 dark:bg-white/10 text-zinc-500 px-1.5 py-0.5 rounded tracking-widest uppercase">
                          Archived
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] font-bold text-zinc-400">
                      REF: {variant.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-black italic ${variant.isArchived ? "text-zinc-400" : "text-emerald-600"}`}
                  >
                    ${variant.price}
                  </span>
                  {!variant.isArchived && (
                    <button
                      onClick={() =>
                        handleArchiveRequest(variant.id, service.id)
                      }
                      className="p-1.5 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all"
                    >
                      <Archive size={12} />
                    </button>
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
                label: "Add Variant",
                show: true,
                onClick: () => setNewVariantServiceId(service.id),
                variant: "primary",
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
      <div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Variant Ledger
        </h1>
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
          Audit and manage service tiers
        </p>
      </div>

      <VariantsCreationModal
        isOpen={newVariantServiceId !== null}
        onClose={() => setNewVariantServiceId(null)}
        onSubmit={async (payload) => {
          try {
            await createNewVariant({
              ...payload,
              serviceId: newVariantServiceId,
            });
            setNewVariantServiceId(null);
            fetchVariantsData();
            setStatusModalCon({
              isOpen: true,
              type: "success",
              message: "New variant created successfully",
            });
          } catch (e) {
            setStatusModalCon({
              isOpen: true,
              type: "error",
              title: "Creation Error",
              message:
                e?.response?.data?.message ||
                "Could not create the new variant. Please check your data.",
            });
          }
        }}
      />

      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />

      <FilterContainer
        searchValue={filters.title}
        onSearchChange={(val) =>
          setFilters((prev) => ({ ...prev, title: val, page: 1 }))
        }
      />

      <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-white/5 overflow-hidden">
        <MultiUseTable
          columns={variantColumns}
          data={services}
          loading={loading}
          pagination={meta}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
}
