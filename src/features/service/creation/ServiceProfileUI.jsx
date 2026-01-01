import React from "react";
import {
  Star,
  Share2,
  Heart,
  CheckCircle,
  Eye,
  ShieldCheck,
  Globe,
  ChevronRight,
} from "lucide-react";
import ImageGallery from "../../../components/imageGallery/ImageGallery";
import BookingSidebar from "../serviceProfile/BookingSidebar";
import ReviewsSection from "../serviceProfile/ReviewComponent";

export const ServiceProfileUI = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 min-h-screen border-gray-200 shadow-2xl p-10 font-sans text-gray-900 pb-20 rounded-3xl">
      <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-widest uppercase px-2">
        <div className="w-4 h-4 p-2 bg-green-500 rounded-full animate-pulse" />{" "}
        Live Preview
      </div>
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between opacity-50">
          <div className="flex items-center space-x-2 text-sm">
            <span>Services</span> <ChevronRight size={14} />
            <span className="text-indigo-600 font-medium capitalize">
              {data.categoryTitle?.replace("-", " ")}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title & Stats */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold capitalize mb-4">
            {data.title || "Your Service Title Here"}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center font-bold text-gray-900">
              <Star size={16} className="text-black fill-current mr-1" />
              <span>{data.rating > 0 ? data.rating : "New"}</span>
              <span className="mx-1 font-normal text-gray-500 underline">
                ({data.totalReviews || 0} reviews)
              </span>
            </div>
            <div className="flex items-center italic">
              <Eye size={16} className="mr-1" /> {data.views || 0} recent views
            </div>
          </div>
        </div>

        {/* Dynamic Gallery */}
        <ImageGallery assets={data.assets || []} />

        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between pb-8 border-b border-gray-100 mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  Service by {data.ServiceProvider?.name || "You"}
                </h2>
                <p className="text-gray-500 capitalize">
                  {data.categoryTitle?.replace("-", " ")}
                </p>
              </div>
              <div className="h-14 w-14 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {(data.ServiceProvider?.name || "Y").charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Description Area */}
            <div className="border-t border-gray-100 pt-8 ">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 break-words leading-tight">
                About this service
              </h3>
              <p className="text-gray-600 leading-loose text-lg whitespace-pre-line break-words overflow-hidden">
                {data.description || "Your description will appear here..."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              price={data.price}
              rating={data.rating}
              category={data.category}
              providerEmail={data.ServiceProvider?.email}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
