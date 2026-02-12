import React, { useState } from "react";
import WizardProgress from "./WizardProgress";
import StepBasics from "./steps/StepBasics";
import LivePreview from "./steps/LivePreview";
import StepMedia from "./steps/StepMedia";
import StepTypeAndPricing from "./steps/StepTypeAndPricing";
import { createNewService } from "../../../api/serviceProviderApis";
import CreationSuccess from "./CreationSuccess";
import ServiceProfile from "../serviceProfile/ServiceProfile";
import { useMeta } from "../../../contexts/MetadataContext";
import StatusModal from "../../../components/ui/StatusModal";
import { getErrorMessage } from "../../../api/errorMessages";

const ServiceWizard = () => {
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
    price: 0,
    description: "",
    assets: [],
    variants: [],
    timelines: [],
  });

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
    sendData.append("category", formData.category);
    sendData.append("subcategory", formData.subcategory);
    sendData.append("description", formData.description);
    sendData.append("type", formData.type);
    sendData.append("variants", JSON.stringify(formData.variants));
    sendData.append("timelines", JSON.stringify(formData.timelines));
    formData.assets.forEach((asset, index) => {
      if (asset.file) {
        sendData.append("images", asset.file);
        sendData.append(`imageKeys[${index}]`, asset.key);
      }
    });

    try {
      const response = await createNewService(sendData);
      if (response.status === 201) {
        setIsSubmitting(false);
        setSuccessServiceId(response.data.data.id);
        nextStep();
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setStatusModalCon({
        isOpen: true,
        type: "error",
        onClose: () => setStatusModalCon(null),
        message: message,
        buttonText: "Continue",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      <StatusModal {...statusModalCon} />

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-white/10 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <p className="mt-6 font-black uppercase tracking-[0.3em] text-[10px]">
              Uploading
            </p>
          </div>
        </div>
      )}

      {/* Step Tracker */}
      <div className="mb-12">
        <WizardProgress currentStep={currentStep} />
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Glass Inner Card */}
        <div className="lg:col-span-5 bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-[2rem] p-8 shadow-sm">
          <div className="animate-in fade-in duration-500">
            {currentStep === 1 && (
              <StepBasics
                data={formData}
                onUpdate={updateFormData}
                onNext={nextStep}
                categories={categories}
                updateCategory={updateCategory}
                subcategories={subcategories}
              />
            )}
            {currentStep === 2 && (
              <StepTypeAndPricing
                data={formData}
                onUpdate={updateFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 3 && (
              <StepMedia
                data={formData}
                onUpdate={updateFormData}
                onBack={prevStep}
                onComplete={handleSubmit}
              />
            )}
            {currentStep === 4 && (
              <CreationSuccess serviceId={successServiceId} />
            )}
          </div>
        </div>

        {/* Right Preview: Styled as a Floating Desktop Window */}
        <div className="hidden lg:block lg:col-span-7 sticky top-4">
          <div className="bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-2 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 px-5 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">
                Live Preview
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-[1.5rem] overflow-hidden shadow-inner h-[600px] overflow-y-auto no-scrollbar">
              <LivePreview data={formData} categories={categories} />
            </div>
          </div>
        </div>
      </main>

      {/* Desktop Profile Mockup Section */}
      {currentStep < 4 && (
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400"></h3>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 overflow-hidden shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-500">
            <ServiceProfile previewData={formData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceWizard;
