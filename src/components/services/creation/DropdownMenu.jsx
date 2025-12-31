import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const DropdownMenu = ({ categories, data, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCat = categories.find((c) => c.id === data.category);
  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between p-4 rounded-2xl border text-sm font-semibold transition-all duration-300
          ${
            isOpen
              ? "border-indigo-600 ring-4 ring-indigo-50"
              : "border-gray-200 shadow-sm"
          }
          bg-white text-gray-700 hover:border-gray-300 active:scale-[0.98]`}
      >
        <span>{selectedCat ? selectedCat.label : "Select Category"}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180 text-indigo-600" : "text-gray-400"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-1">
              {categories.map((cat) => {
                const isSelected = data.category === cat.id;
                return (
                  <button
                    key={cat.title}
                    onClick={() => {
                      onUpdate({ category: cat.id, categoryTitle: cat.title });
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    {cat.label}
                    {isSelected && (
                      <Check size={16} className="text-indigo-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default DropdownMenu;
