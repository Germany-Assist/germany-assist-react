import { Globe, CheckCircle2 } from "lucide-react";

const LivePreview = ({ data }) => {
  // Find the profile image in the assets array if it exists
  const profileImg = data.assets?.find(
    (a) => a.key === "serviceProfileImage"
  )?.url;

  return (
    <div className=" top-32 flex flex-col items-center">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-widest uppercase px-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
          Live Preview
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-indigo-100">
          <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
            {profileImg ? (
              <img
                src={profileImg}
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                alt="Preview"
              />
            ) : (
              <Globe size={64} strokeWidth={1} className="text-gray-200" />
            )}
          </div>
          <div className="p-8">
            <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 px-2 py-0.5 bg-indigo-50 inline-block rounded">
              {data.categoryTitle?.replace("-", " ")}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize line-clamp-1">
              {data.title || "Untitled Service"}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
              {data.description || "Description will appear here..."}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Price
                </p>
                <p className="text-2xl font-black text-gray-900">
                  ${data.price || 0}
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase">
                <CheckCircle2 size={12} /> Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
