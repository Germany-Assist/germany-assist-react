import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Info,
  ShieldAlert,
} from "lucide-react";
import WizardProgress from "./WizardProgress";
import StepBasics from "./steps/StepBasics";
import LivePreview from "./steps/LivePreview";
import StepMedia from "./steps/StepMedia";
import StepTypeAndPricing from "./steps/StepTypeAndPricing";
import {
  createNewService,
  updateService,
} from "../../../api/serviceProviderApis";
import CreationSuccess from "./CreationSuccess";
import ServiceProfile from "../serviceProfile/ServiceProfile";
import { useMeta } from "../../../contexts/MetadataContext";
import StatusModal from "../../../components/ui/StatusModal";
import { getErrorMessage } from "../../../api/errorMessages";

const ServiceWizard = ({ initialData = null, isEditMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successServiceId, setSuccessServiceId] = useState(null);
  const [statusModalCon, setStatusModalCon] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const { categories } = useMeta();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    requirements: [""],
    limitToPause: 0,
    assets: [],
    variants: [],
    timelines: [],
    type: "oneTime",
  });

  // Edit Mode: Data Hydration logic
  useEffect(() => {
    if (isEditMode && initialData) {
      let requirementsArray = [""];
      try {
        if (typeof initialData.requirements === "string") {
          const parsed = JSON.parse(initialData.requirements);
          requirementsArray = Array.isArray(parsed)
            ? parsed
            : [initialData.requirements];
        } else if (Array.isArray(initialData.requirements)) {
          requirementsArray = initialData.requirements;
        }
      } catch (e) {
        requirementsArray = initialData.requirements
          ? [initialData.requirements]
          : [""];
      }

      const categoryId = initialData.category?.id || "";
      const subcategoryId = initialData.subCategory?.id || "";

      if (categories && categoryId) {
        const mainCat = categories.find((i) => i.id === categoryId);
        setSubcategories(mainCat?.subcategories || []);
      }

      setFormData({
        id: initialData.id,
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "oneTime",
        category: categoryId,
        subcategory: subcategoryId,
        requirements: requirementsArray.length > 0 ? requirementsArray : [""],
        limitToPause: initialData.limitToPause || 0,
        variants: (initialData.variants || []).map((v) => ({
          label: v.label || "",
          price: v.price || 0,
          deliveryTime: v.deliveryTime || "",
        })),
        timelines: (initialData.timelines || []).map((t) => ({
          label: t.label || "",
          price: t.price || 0,
          maxParticipants: t.maxParticipants || t.limit || 1,
          startDate: t.startDate || "",
          endDate: t.endDate || "",
          deadlineDate: t.deadlineDate || "",
        })),
        assets: (initialData.assets || [])
          .filter((asset) => !asset.thumb)
          .map((asset) => ({
            ...asset,
            url: asset.url,
            key: asset.key,
            isExisting: true,
          })),
      });
    }
  }, [isEditMode, initialData, categories]);

  const updateCategory = (categoryData) => {
    const mainCat = categories.find((i) => i.id === categoryData.category);
    setSubcategories(mainCat?.subcategories || []);
    setFormData((prev) => ({
      ...prev,
      category: categoryData.category,
      subcategory: "",
    }));
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const sendData = new FormData();

    sendData.append("title", formData.title);
    sendData.append("subcategoryId", formData.subcategory);
    sendData.append("description", formData.description);
    sendData.append("type", formData.type);
    sendData.append("limitToPause", formData.limitToPause);

    const cleanRequirements = formData.requirements.filter(
      (r) => r.trim() !== "",
    );
    sendData.append("requirements", JSON.stringify(cleanRequirements));
    sendData.append("variants", JSON.stringify(formData.variants));
    sendData.append("timelines", JSON.stringify(formData.timelines));

    formData.assets.forEach((asset, index) => {
      if (asset.file) {
        sendData.append("images", asset.file);
        sendData.append(`imageKeys[${index}]`, asset.key);
      } else if (asset.isExisting) {
        sendData.append("existingAssets", JSON.stringify(asset));
      }
    });

    try {
      const response = isEditMode
        ? await updateService(initialData.id, sendData)
        : await createNewService(sendData);

      if (response.status === 201 || response.status === 200) {
        setIsSubmitting(false);
        setSuccessServiceId(response.data.data.id || initialData?.id);
        nextStep();
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setStatusModalCon({
        isOpen: true,
        type: "error",
        onClose: () => setStatusModalCon(null),
        message: message,
        buttonText: "Retry",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full px-4 md:px-0 max-w-7xl mx-auto">
      <StatusModal {...statusModalCon} />

      {/* 1. REJECTION ALERT - Responsive padding and font size */}
      {isEditMode && initialData?.rejectionReason && currentStep < 4 && (
        <div className="mb-6 md:mb-10 bg-red-50 dark:bg-red-500/5 border-2 border-red-500/30 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-xl shadow-red-500/10 animate-in slide-in-from-top-10 duration-700">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-red-500/40 animate-pulse shrink-0">
            <ShieldAlert size={28} className="md:w-8 md:h-8" />
          </div>
          <div className="text-center md:text-left flex-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 dark:text-red-400">
              Update Required
            </span>
            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mt-1">
              Rejection Reason: {initialData.rejectionReason}
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Please address the issues above to resubmit your service for
              review.
            </p>
          </div>
        </div>
      )}

      {/* 2. MODE & PROGRESS INFO - Flex wrap for mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-2 gap-4">
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <div
            className={`px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-sm ${
              isEditMode
                ? "bg-orange-500 text-white"
                : "bg-zinc-900 dark:bg-white text-white dark:text-black"
            }`}
          >
            {isEditMode ? "Modifying Existing Service" : "Creating New Service"}
          </div>
          {isEditMode && (
            <span className="text-xs font-bold text-slate-400">
              Editing:{" "}
              <span className="text-slate-900 dark:text-white underline decoration-orange-500/30">
                {initialData?.title}
              </span>
            </span>
          )}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 self-end sm:self-auto">
          Progress: Step {currentStep} / 3
        </div>
      </div>

      {/* 3. SUBMITTING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <p className="mt-4 md:mt-6 font-black uppercase tracking-[0.3em] text-[10px]">
              {isEditMode ? "Updating" : "Publishing"}
            </p>
          </div>
        </div>
      )}

      <div className="mb-8 md:mb-12">
        <WizardProgress currentStep={currentStep} />
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
        {/* Form Container - Full width on mobile, 7 cols on Desktop */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-sm overflow-hidden">
          <div className="animate-in fade-in duration-500">
            {currentStep === 1 && (
              <StepBasics
                data={formData}
                onUpdate={updateFormData}
                onNext={nextStep}
                categories={categories}
                updateCategory={updateCategory}
                subcategories={subcategories}
                isEditMode={isEditMode}
              />
            )}
            {currentStep === 2 && (
              <StepTypeAndPricing
                data={formData}
                onUpdate={updateFormData}
                onNext={nextStep}
                onBack={prevStep}
                isEditMode={isEditMode}
              />
            )}
            {currentStep === 3 && (
              <StepMedia
                data={formData}
                onUpdate={updateFormData}
                onBack={prevStep}
                onComplete={handleSubmit}
                isEditMode={isEditMode}
              />
            )}
            {currentStep === 4 && (
              <CreationSuccess
                serviceId={successServiceId}
                isEditMode={isEditMode}
              />
            )}
          </div>
        </div>

        {/* 4. PREVIEW PANELS - Hidden on mobile/tablet, 5 cols on Large Desktop */}
        <div className="hidden lg:block lg:col-span-5 sticky top-4">
          <div className="bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-2 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Live Preview
              </span>
            </div>
            <LivePreview data={formData} categories={categories} />
          </div>
        </div>
      </main>

      {/* Full Profile Preview - Responsive padding and scale */}
      {currentStep < 4 && (
        <div className="mt-12 md:mt-24 pb-12">
          <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 text-center">
              Full Profile Preview
            </h3>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-[1.5rem] md:rounded-[3rem] border border-zinc-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-500 scale-[1] md:scale-[0.98] md:hover:scale-100 origin-top">
            <ServiceProfile previewData={formData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceWizard;
