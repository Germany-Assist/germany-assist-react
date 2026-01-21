import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";

const StepMedia = ({ data, onUpdate, onBack, onComplete }) => {
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const newAsset = {
      file: file,
      url: URL.createObjectURL(file),
      key: type,
    };
    onUpdate({ assets: [...data.assets, newAsset] });
  };

  const removeAsset = (url) => {
    onUpdate({ assets: data.assets.filter((a) => a.url !== url) });
  };

  const profileImg = data.assets.find((a) => a.key === "serviceProfileImage");
  const galleryImgs = data.assets.filter(
    (a) => a.key === "serviceProfileGalleryImage",
  );

  // Validation: Main image is required
  const isInvalid = !profileImg;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          Visuals matter
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          Upload a profile and up to 5 gallery images.
        </p>
      </div>

      {/* Main Profile Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Main Photo <span className="text-red-500">*</span>
        </label>
        {profileImg ? (
          <div className="relative h-48 max-w-[340px] rounded-2xl overflow-hidden group border border-light-700 dark:border-white/10">
            <img
              src={profileImg.url}
              className="w-full h-full object-cover"
              alt="Profile"
            />
            <button
              type="button"
              onClick={() => removeAsset(profileImg.url)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-light-700 dark:border-white/10 rounded-2xl h-48 w-64 flex flex-col items-center justify-center cursor-pointer hover:bg-accent/5 hover:border-accent transition-all">
            <Upload className="text-slate-400 mb-2" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Upload cover
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "serviceProfileImage")}
            />
          </label>
        )}
      </div>

      {/* Gallery Images Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
          Gallery (Optional)
        </label>
        <div className="grid grid-cols-3 gap-4">
          {galleryImgs.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden group border border-light-700 dark:border-white/10"
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt="Gallery"
              />
              <button
                type="button"
                onClick={() => removeAsset(img.url)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          {galleryImgs.length < 3 && (
            <label className="aspect-square border-2 border-dashed border-light-700 dark:border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-light-900 dark:hover:bg-white/5 hover:border-accent transition-all">
              <Upload className="text-slate-400" size={20} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e, "serviceProfileGalleryImage")
                }
              />
            </label>
          )}
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
          disabled={isInvalid}
          onClick={onComplete}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white disabled:opacity-20 text-white dark:text-black font-bold py-4 rounded-2xl transition-all shadow-xl hover:bg-accent hover:text-white active:scale-95"
        >
          <CheckCircle size={18} /> Finish & Publish
        </button>
      </div>
    </div>
  );
};

export default StepMedia;
