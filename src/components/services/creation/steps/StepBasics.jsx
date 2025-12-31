import { ChevronRight } from "lucide-react";
import DropdownMenu from "../DropdownMenu";

const StepBasics = ({ data, onUpdate, onNext, categories }) => {
  const isInvalid =
    data.title.length < 5 || data.description < 100 || !data.category;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Create your service
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Every great service starts with a clear name and category.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Service Title
          </label>
          <input
            type="text"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none border-focus:border-indigo-500 transition-all text-lg"
            placeholder="e.g. Tourist Visa Management"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Service Description
          </label>

          <textarea
            className="w-full h-32 p-4 border border-gray-200 rounded-2xl
               focus:ring-4 focus:ring-indigo-50 outline-none
               focus:border-indigo-500 transition-all text-lg resize-none"
            placeholder="e.g. We help you apply for visa like pros"
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category
          </label>
          <DropdownMenu
            categories={categories}
            data={data}
            onUpdate={onUpdate}
          />
        </div>
      </div>

      <button
        disabled={isInvalid}
        onClick={onNext}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 disabled:bg-gray-200 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:bg-indigo-600"
      >
        Next: Pricing <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default StepBasics;
