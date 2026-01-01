import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";

const StepMedia = ({ data, onUpdate, onBack, onComplete }) => {
  const handleFileChange = (e, type) => {
    const file = e.target.files[0]; // The raw File object
    if (!file) return;
    const newAsset = {
      file: file, // <--- KEEP THIS TO SEND TO BACKEND
      url: URL.createObjectURL(file), // Only for the preview UI
      key: type,
    };
    onUpdate({ assets: [...data.assets, newAsset] });
  };

  const removeAsset = (url) => {
    onUpdate({ assets: data.assets.filter((a) => a.url !== url) });
  };

  const profileImg = data.assets.find((a) => a.key === "serviceProfileImage");
  const galleryImgs = data.assets.filter(
    (a) => a.key === "serviceProfileGalleryImage"
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Visuals matter
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Upload a profile cover and up to 5 gallery images.
        </p>
      </div>

      {/* Main Profile Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-700">
          Main Cover Photo
        </label>
        {profileImg ? (
          <div className="relative h-90 w-full rounded-2xl overflow-hidden group">
            <img
              src={profileImg.url}
              className="w-full h-full object-cover"
              alt="Profile"
            />
            <button
              onClick={() => removeAsset(profileImg.url)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-gray-200 rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-all">
            <Upload className="text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-500">
              Click to upload cover photo
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "serviceProfileImage")}
            />
          </label>
        )}
      </div>

      {/* Gallery Images Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-700">
          Gallery (Optional)
        </label>
        <div className="grid grid-cols-3 gap-4">
          {galleryImgs.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt="Gallery"
              />
              <button
                onClick={() => removeAsset(img.url)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          {galleryImgs.length < 5 && (
            <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="text-gray-400" size={20} />
              <input
                type="file"
                className="hidden"
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
          onClick={onBack}
          className="p-4 rounded-2xl border border-gray-200 hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onComplete}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl hover:bg-indigo-700"
        >
          <CheckCircle size={18} /> Finish & Publish
        </button>
      </div>
    </div>
  );
};

export default StepMedia;
