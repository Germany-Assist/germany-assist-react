import { CheckCircle, ChevronLeft, Send } from "lucide-react";

const ReviewStep = ({ data, onBack, onPublish, isSubmitting }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          Review & Publish
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          Review your service details before publishing.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Basic Details
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-400">Title</p>
              <p className="font-bold text-slate-900 dark:text-white">{data.title}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Description</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{data.description}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Pricing & Variants
          </h3>
          {data.type === 'oneTime' && data.variants?.length > 0 && (
            <div className="space-y-2">
              {data.variants.map((variant, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-slate-300">{variant.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatPrice(variant.price)}</span>
                </div>
              ))}
            </div>
          )}
          {data.type === 'timeline' && data.timelines?.length > 0 && (
            <div className="space-y-2">
              {data.timelines.map((timeline, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-slate-300">{timeline.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatPrice(timeline.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Images
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {data.assets?.map((asset, idx) => (
              <div key={idx} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                <img
                  src={asset.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {(!data.assets || data.assets.length === 0) && (
              <p className="text-sm text-slate-400">No images uploaded</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="p-4 rounded-2xl border border-light-700 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-light-900 dark:hover:bg-white/5 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white disabled:opacity-20 text-white dark:text-black font-bold py-4 rounded-2xl transition-all shadow-xl hover:bg-accent hover:text-white active:scale-95"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={18} /> Publish Service
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;