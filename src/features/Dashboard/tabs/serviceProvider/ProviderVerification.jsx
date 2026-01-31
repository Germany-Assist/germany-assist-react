import React, { useEffect, useState } from "react";
import {
  UploadCloud,
  Loader2,
  MessageCircle,
  FileText,
  Image as ImageIcon,
  X,
  Plus,
  ShieldCheck,
  Fingerprint,
  Award,
  AlertCircle,
} from "lucide-react";

import {
  serviceProviderGetVerificationStatus,
  serviceProviderReSubmitVerification,
  serviceProviderSubmitVerification,
} from "../../../../api/serviceProviderApis";

import { useMeta } from "../../../../contexts/MetadataContext";
import DashboardHeader from "../../../../components/ui/dashboard/DashboardHeader";
import StatusModal from "../../../../components/ui/StatusModal";
import { getErrorMessage } from "../../../../api/errorMessages";

const VerificationHub = () => {
  const { categories } = useMeta();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 'identity' or the 'relatedId' of a category
  const [activeTarget, setActiveTarget] = useState("identity");
  const [verificationList, setVerificationList] = useState([]);
  const [statusModalCon, setStatusModalCon] = useState(null);

  const [files, setFiles] = useState({
    verificationImage: null,
    verificationDocument: null,
  });

  const init = async () => {
    setLoading(true);
    try {
      const res = await serviceProviderGetVerificationStatus();
      // res.data is the array you provided
      setVerificationList(res?.data || []);
    } catch (err) {
      setStatusModalCon({
        isOpen: true,
        type: "error",
        message: getErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // Helper to find the status object for the current selection
  const getCurrentItem = () => {
    if (activeTarget === "identity") {
      return verificationList.find((v) => v.type === "identity");
    }
    return verificationList.find((v) => v.relatedId === activeTarget);
  };

  const handleAction = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      const isIdentity = activeTarget === "identity";

      formData.append("type", isIdentity ? "identity" : "category");
      if (!isIdentity) {
        formData.append("relatedId", activeTarget);
      }

      if (files.verificationImage)
        formData.append("verificationImage", files.verificationImage);
      if (files.verificationDocument)
        formData.append("verificationDocument", files.verificationDocument);

      const currentItem = getCurrentItem();

      // Use logic: if data exists (not null) and status is adminRequest -> ReSubmit
      if (currentItem && currentItem.status === "adminRequest") {
        await serviceProviderReSubmitVerification(formData);
      } else {
        await serviceProviderSubmitVerification(formData);
      }

      setStatusModalCon({
        isOpen: true,
        type: "success",
        message: "Your documents have been submitted successfully.",
        onClose: () => {
          setStatusModalCon(null);
          setFiles({ verificationImage: null, verificationDocument: null });
          init();
        },
      });
    } catch (err) {
      setStatusModalCon({
        isOpen: true,
        type: "error",
        message: getErrorMessage(err),
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="animate-spin text-white/20" size={40} />
      </div>
    );

  const currentItem = getCurrentItem();
  const currentStatus = currentItem?.status || null; // null means can 'create'
  const activeCategoryLabel =
    categories.find((c) => c.id === activeTarget)?.label || "Identity";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />

      <DashboardHeader
        title="Verification Center"
        subtitle="Manage your identity and professional certifications"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2 mb-4">
            Core
          </h4>
          <VerificationTab
            icon={Fingerprint}
            label="Identity"
            status={verificationList.find((v) => v.type === "identity")?.status}
            isActive={activeTarget === "identity"}
            onClick={() => setActiveTarget("identity")}
          />

          <div className="pt-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2 mb-4">
              Categories
            </h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <VerificationTab
                  key={cat.id}
                  icon={Award}
                  label={cat.label}
                  status={
                    verificationList.find((v) => v.relatedId === cat.id)?.status
                  }
                  isActive={activeTarget === cat.id}
                  onClick={() => setActiveTarget(cat.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl min-h-[500px]">
          {currentStatus === "approved" ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                <ShieldCheck size={48} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Verified
              </h2>
              <p className="text-zinc-500 text-sm max-w-xs">
                This certification is active and verified on your profile.
              </p>
            </div>
          ) : currentStatus === "pending" ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 animate-pulse">
                <UploadCloud size={40} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Under Review
              </h2>
              <p className="text-zinc-500 text-sm max-w-xs">
                Our team is currently reviewing the documents for{" "}
                {activeCategoryLabel}.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <header>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                  Verify {activeCategoryLabel}
                </h2>
                <p className="text-zinc-500 text-xs font-bold uppercase mt-1">
                  Upload files to begin the verification process
                </p>
              </header>

              {currentStatus === "adminRequest" && (
                <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start border-l-4 border-l-blue-500">
                  <MessageCircle className="text-blue-400 shrink-0" size={24} />
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">
                      Admin Note
                    </span>
                    <p className="text-zinc-300 text-sm italic mt-1 leading-relaxed">
                      "{currentItem.adminNote}"
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UploadBox
                  label="Image Reference"
                  file={files.verificationImage}
                  type="image"
                  onChange={(f) =>
                    setFiles((p) => ({ ...p, verificationImage: f }))
                  }
                  onClear={() =>
                    setFiles((p) => ({ ...p, verificationImage: null }))
                  }
                />
                <UploadBox
                  label="PDF Document"
                  file={files.verificationDocument}
                  type="pdf"
                  onChange={(f) =>
                    setFiles((p) => ({ ...p, verificationDocument: f }))
                  }
                  onClear={() =>
                    setFiles((p) => ({ ...p, verificationDocument: null }))
                  }
                />
              </div>

              <button
                disabled={
                  submitting ||
                  (!files.verificationImage && !files.verificationDocument)
                }
                onClick={handleAction}
                className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-10"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <UploadCloud size={18} />
                )}
                {currentStatus === "adminRequest"
                  ? "Re-submit Updates"
                  : "Submit Verification"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const VerificationTab = ({ icon: Icon, label, status, isActive, onClick }) => {
  const statusColors = {
    approved: "text-emerald-500 bg-emerald-500/5",
    pending: "text-amber-500 bg-amber-500/5",
    adminRequest: "text-blue-400 bg-blue-400/5",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 ${
        isActive
          ? "bg-white border-white shadow-xl scale-[1.02]"
          : "bg-zinc-900 border-white/5 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-4 text-left">
        <Icon size={18} className={isActive ? "text-black" : "text-zinc-500"} />
        <span
          className={`text-[11px] font-black uppercase tracking-tight ${isActive ? "text-black" : "text-zinc-400"}`}
        >
          {label}
        </span>
      </div>

      {status && (
        <div
          className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${statusColors[status] || "text-zinc-600"}`}
        >
          {status === "adminRequest" ? "Action" : status}
        </div>
      )}
    </button>
  );
};

const UploadBox = ({ label, file, type, onChange, onClear }) => {
  const isImage = type === "image";
  return (
    <div className="space-y-3">
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
        {label}
      </span>
      <div className="relative aspect-video rounded-[2rem] bg-zinc-800 border-2 border-dashed border-white/5 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-white/10">
        {file ? (
          <div className="relative w-full h-full">
            {isImage ? (
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover"
                alt="preview"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <FileText className="text-blue-500 mb-2" size={40} />
                <p className="text-[9px] font-mono text-zinc-500 px-4 truncate w-full text-center">
                  {file.name}
                </p>
              </div>
            )}
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-8 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
              {isImage ? (
                <ImageIcon className="text-zinc-500" size={20} />
              ) : (
                <Plus className="text-zinc-500" size={20} />
              )}
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              Select {type}
            </span>
            <input
              type="file"
              className="hidden"
              accept={isImage ? "image/*" : ".pdf"}
              onChange={(e) => onChange(e.target.files[0])}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default VerificationHub;
