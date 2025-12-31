const WizardProgress = ({ currentStep }) => {
  const steps = ["Basics", "Pricing", "Media"];

  return (
    <nav className="bg-white border-b px-8 py-4 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-900">New Service</h2>
        <div className="flex items-center gap-4">
          {steps.map((label, i) => {
            const stepNum = i + 1;
            const isActive = currentStep >= stepNum;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNum}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {stepNum < steps.length && (
                  <div className="w-8 h-[1px] bg-gray-200 ml-2" />
                )}
              </div>
            );
          })}
        </div>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"></button>
      </div>
    </nav>
  );
};

export default WizardProgress;
