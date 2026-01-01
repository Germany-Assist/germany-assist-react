import { Mail, Star } from "lucide-react";
import React from "react";

const BookingSidebar = ({ price, rating, category, providerEmail }) => (
  <div className="sticky top-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-xl shadow-gray-200/50">
    <div className="flex justify-between items-center mb-6">
      <div>
        <span className="text-2xl font-bold">${price || "0"}</span>
        <span className="text-gray-500 text-lg"> / service</span>
      </div>
      <div className="text-sm font-semibold flex items-center">
        <Star size={14} className="mr-1 fill-current" />
        {rating > 0 ? rating : "New"}
      </div>
    </div>
    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] mb-4">
      Reserve Service
    </button>
    <div className="space-y-4 pt-6 border-t border-gray-100 font-medium">
      <div className="flex items-center justify-between text-gray-500 italic">
        <span className="underline">Category</span>
        <span className="capitalize">{category?.replace("-", " ")}</span>
      </div>
      <div className="flex items-center justify-between font-bold text-lg pt-2 border-t">
        <span>Total Price</span>
        <span>${price}</span>
      </div>
    </div>
    {providerEmail && (
      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
        <Mail size={14} /> <span>{providerEmail}</span>
      </div>
    )}
  </div>
);
export default BookingSidebar;
