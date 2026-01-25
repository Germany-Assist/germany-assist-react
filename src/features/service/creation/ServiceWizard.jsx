import React, { useEffect, useState } from "react";
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
  const { categories } = useMeta();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    description: "",
    assets: [],
    variants: [],
    timelines: [],
  });
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
      if (response.status == 201) {
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
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex flex-col font-sans relative transition-colors duration-700">
      <StatusModal {...statusModalCon} />
      {isSubmitting && (
        <div className="fixed inset-0 bg-light-950/60 dark:bg-dark-950/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Using accent color for loader */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            <p className="mt-4 font-bold uppercase tracking-widest text-xs text-slate-600 dark:text-slate-400">
              Uploading your service...
            </p>
          </div>
        </div>
      )}

      <WizardProgress currentStep={currentStep} />

      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
        {/* Left column: Step Forms */}
        <div className="flex flex-col justify-center">
          {currentStep === 1 && (
            <StepBasics
              data={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              categories={categories}
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
              onComplete={() => handleSubmit()}
            />
          )}
          {currentStep === 4 && (
            <CreationSuccess serviceId={successServiceId} />
          )}
        </div>

        {/* Right column: Original Preview Component */}
        <div className="hidden lg:block">
          <LivePreview data={formData} categories={categories} />
        </div>
      </main>

      {/* Full Width Preview at Bottom (Kept as requested) */}
      <div className="hidden lg:block border-t border-light-700 dark:border-white/5">
        <ServiceProfile previewData={formData} />
      </div>
    </div>
  );
};

export default ServiceWizard;
