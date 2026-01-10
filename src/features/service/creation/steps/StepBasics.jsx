import { ChevronRight } from "lucide-react";
import DropdownMenu from "../DropdownMenu";

const StepBasics = ({ data, onUpdate, onNext, categories }) => {
  const isInvalid =
    data.title.length < 5 ||
    (data.description?.length || 0) < 100 ||
    !data.category;
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          Create your service
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          Every great service starts with a clear name and category.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Service Title
          </label>
          <input
            type="text"
            className="w-full p-4 border border-light-700 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-accent/10 outline-none focus:border-accent transition-all text-lg bg-transparent text-slate-900 dark:text-white"
            placeholder="e.g. Tourist Visa Management"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Service Description
          </label>

          <textarea
            className="w-full h-32 p-4 border border-light-700 dark:border-white/10 rounded-2xl
               focus:ring-4 focus:ring-accent/10 outline-none
               focus:border-accent transition-all text-lg resize-none bg-transparent text-slate-900 dark:text-white"
            placeholder="e.g. We help you apply for visa like pros"
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
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
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 dark:bg-white disabled:bg-light-700 dark:disabled:bg-white/10 text-white dark:text-black font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:bg-accent hover:text-white"
      >
        Next: Pricing <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default StepBasics;
