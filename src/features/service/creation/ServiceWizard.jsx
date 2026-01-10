import React, { useEffect, useState } from "react";
import WizardProgress from "./WizardProgress";
import StepBasics from "./steps/StepBasics";
import LivePreview from "./steps/LivePreview";
import StepMedia from "./steps/StepMedia";
import StepPricing from "./steps/StepPricing";
import { ServiceProfileUI } from "./ServiceProfileUI";
import { createNewService } from "../../../api/serviceProviderApis";
import { fetchCategories } from "../../../api/publicApis";
import CreationSuccess from "./CreationSuccess";

const ServiceWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New: track loading state
  const [successServiceId, setSuccessServiceId] = useState(null);

  useEffect(() => {
    (async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    })();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    description: "",
    assets: [],
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
    sendData.append("category", formData.categoryTitle);
    sendData.append("description", formData.description);
    sendData.append("price", formData.price);
    sendData.append("type", formData.type);

    formData.assets.forEach((asset) => {
      if (asset.file) {
        asset.file.key = asset.key;
        sendData.append("image", asset.file);
      }
    });

    try {
      const response = await createNewService(sendData);
      if (response.status == 201) {
        // Handle success
        setIsSubmitting(false); // Stop loading
        setSuccessServiceId(response.data.data.id);
        nextStep();
      }
    } catch (error) {
      console.error("Upload failed", error);
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      {/* Simple Loading Overlay - Only shows when submitting */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 font-medium text-gray-700">
              Uploading your service...
            </p>
          </div>
        </div>
      )}

      <WizardProgress currentStep={currentStep} />
      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
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
            <StepPricing
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

        <div className="hidden lg:block">
          <LivePreview data={formData} categories={categories} />
        </div>
      </main>
      <div className="hidden lg:block ">
        <ServiceProfileUI data={formData} categories={categories} />
      </div>
    </div>
  );
};

export default ServiceWizard;
