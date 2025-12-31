import { ChevronRight, ChevronLeft, Banknote, Clock } from "lucide-react";

const StepPricing = ({ data, onUpdate, onNext, onBack }) => {
  const isInvalid = data.price <= 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Price your service
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Set a fair price for your expertise. You can change this later.
        </p>
      </div>

      <div className="space-y-6">
        {/* Service Type Selection */}
        <div className="flex gap-4">
          <button
            onClick={() => onUpdate({ type: "oneTime" })}
            className={`flex-1 p-4 rounded-2xl border flex flex-col gap-2 transition-all ${
              data.type === "oneTime"
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200"
            }`}
          >
            <Banknote
              className={
                data.type === "oneTime" ? "text-indigo-600" : "text-gray-400"
              }
            />
            <div className="text-left">
              <p className="font-bold text-sm">One-Time Service</p>
              <p className="text-xs text-gray-500">
                A single delivery or session.
              </p>
            </div>
          </button>

          <button
            disabled // Placeholder for future subscription logic
            className="flex-1 p-4 rounded-2xl border border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed flex flex-col gap-2"
          >
            <Clock className="text-gray-400" />
            <div className="text-left">
              <p className="font-bold text-sm">Subscription</p>
              <p className="text-xs text-gray-500">Coming soon.</p>
            </div>
          </button>
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Service Fee (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
              $
            </span>
            <input
              type="number"
              className="w-full p-4 pl-8 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none text-2xl font-bold"
              placeholder="0.00"
              value={data.price || ""}
              onChange={(e) =>
                onUpdate({ price: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="p-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          disabled={isInvalid}
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-900 disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl transition-all shadow-xl hover:bg-indigo-600"
        >
          Next: Media & Images <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StepPricing;
