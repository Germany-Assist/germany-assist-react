const WizardProgress = ({ currentStep }) => {
  const steps = ["Basics", "Pricing", "Media"];

  return (
    <nav className="bg-light-950 pt-10 dark:bg-dark-950 text-slate-900 dark:text-slate-400 transition-colors duration-700">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
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
                    isActive
                      ? "dark:text-slate-400 text-gray-900"
                      : "text-gray-400"
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
