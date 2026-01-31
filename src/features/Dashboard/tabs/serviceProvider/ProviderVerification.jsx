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
} from "lucide-react";

import {
  serviceProviderGetVerificationStatus,
  serviceProviderReSubmitVerification,
  serviceProviderSubmitVerification,
} from "../../../../api/serviceProviderApis";

import DashboardHeader from "../../../../components/ui/dashboard/DashboardHeader";
import StatusModal from "../../../../components/ui/StatusModal";
import { getErrorMessage } from "../../../../api/errorMessages";

const ServiceProviderReUpload = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [status, setStatus] = useState(null); // null means no record exists
  const [statusModalCon, setStatusModalCon] = useState(null);

  const [files, setFiles] = useState({
    imageProof: null,
    documentProof: null,
  });

  const init = async () => {
    setLoading(true);
    try {
      const res = await serviceProviderGetVerificationStatus();
      // If res.data is null, status stays null -> Create Mode
      if (res?.data) {
        setStatus(res.data.status);
        setAdminNote(res.data.adminNote || "");
      }
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

  const handleAction = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (files.imageProof)
        formData.append("verificationImage", files.imageProof);
      if (files.documentProof)
        formData.append("verificationDocument", files.documentProof);

      if (status === "adminRequest") {
        await serviceProviderReSubmitVerification(formData);
      } else {
        await serviceProviderSubmitVerification(formData);
      }
      setStatusModalCon({
        isOpen: true,
        type: "success",
        message: "Your documents have been submitted successfully for review.",
        buttonText: "Return to Dashboard",
        onClose: () => {
          setStatusModalCon(null);
          init(); // Refresh UI state
        },
      });
      setStatus("pending");
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

  if (status === "pending" || status === "approved") {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center h-[70vh] text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
          <ShieldCheck className="text-emerald-500" size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase text-white tracking-tighter">
          Verification {status}
        </h2>
        <p className="text-zinc-500 text-sm mt-2 max-w-sm">
          {status === "pending"
            ? "We are currently reviewing your documents. You will be notified once the process is complete."
            : "Your account is verified and active."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <StatusModal
        {...statusModalCon}
        onClose={() => setStatusModalCon(null)}
      />

      <DashboardHeader
        title={
          status === "adminRequest"
            ? "Action Required"
            : "Identity Verification"
        }
        subtitle={
          status === "adminRequest"
            ? "The compliance team has requested an update to your documents."
            : "Upload your documents to become a verified service provider."
        }
      />

      {/* ADMIN INSTRUCTIONS (Only show if re-submitting) */}
      {status === "adminRequest" && (
        <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start shadow-sm border-l-4 border-l-blue-500">
          <MessageCircle className="text-blue-400 shrink-0 mt-1" size={24} />
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
              Admin Feedback
            </span>
            <p className="text-zinc-200 text-sm italic leading-relaxed">
              "{adminNote}"
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadBox
          label="ID Photo (Front)"
          file={files.imageProof}
          type="image"
          onChange={(f) => setFiles((p) => ({ ...p, imageProof: f }))}
          onClear={() => setFiles((p) => ({ ...p, imageProof: null }))}
        />
        <UploadBox
          label="Legal Document (PDF)"
          file={files.documentProof}
          type="pdf"
          onChange={(f) => setFiles((p) => ({ ...p, documentProof: f }))}
          onClear={() => setFiles((p) => ({ ...p, documentProof: null }))}
        />
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          disabled={submitting || (!files.imageProof && !files.documentProof)}
          onClick={handleAction}
          className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 disabled:opacity-20 hover:bg-zinc-200 transition-all active:scale-95"
        >
          {submitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <UploadCloud size={18} />
          )}
          {status === "adminRequest"
            ? "Submit Corrections"
            : "Start Verification"}
        </button>

        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.1em] italic text-center leading-relaxed">
          Your data is encrypted and used solely for compliance purposes.
        </p>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENT --- */

const UploadBox = ({ label, file, type, onChange, onClear }) => {
  const isImage = type === "image";
  return (
    <div className="space-y-3 group">
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
        {label}
      </span>
      <div className="relative aspect-video rounded-[2rem] bg-zinc-900 border-2 border-dashed border-white/5 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-white/10">
        {file ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {isImage ? (
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover"
                alt="preview"
              />
            ) : (
              <div className="text-center">
                <FileText className="text-blue-500 mx-auto mb-2" size={40} />
                <p className="text-[10px] font-mono text-zinc-400 truncate max-w-[120px]">
                  {file.name}
                </p>
              </div>
            )}
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-8 group-hover:bg-white/5 transition-colors">
            {isImage ? (
              <ImageIcon className="text-zinc-600 mb-2" size={32} />
            ) : (
              <Plus className="text-zinc-600 mb-2" size={32} />
            )}
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400">
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

export default ServiceProviderReUpload;
