import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ArrowDown } from "lucide-react";

const DropdownMenu = ({ categories, data, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);
  // Ensure we are comparing the correct unique identifier (id)
  const selectedCat = categories.find((c) => c.id === data.category);

  const handleScrollDetection = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowScrollIndicator(scrollTop + clientHeight < scrollHeight - 5);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow DOM to render before checking scroll height
      const timer = setTimeout(handleScrollDetection, 50);

      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative z-30 w-full max-w-xs" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between p-4 rounded-2xl border text-sm font-semibold transition-all duration-300
          ${
            isOpen
              ? "border-accent ring-4 ring-accent/10"
              : "border-light-700 dark:border-white/10 shadow-sm"
          }
          bg-transparent text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-white/20 active:scale-[0.98]`}
      >
        <span className="truncate pr-2">
          {selectedCat ? selectedCat.label : "Select Category"}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-accent" : "text-slate-400"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-light-700 dark:border-white/10 bg-white dark:bg-dark-950 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <div
            ref={scrollRef}
            onScroll={handleScrollDetection}
            className="p-1 max-h-60 overflow-y-auto no-scrollbar scroll-smooth"
          >
            {categories.map((cat) => {
              // CRITICAL: Ensure you are comparing the unique 'id'
              // and that cat.id actually exists in your data
              const isSelected = data.category === cat.id;

              return (
                <button
                  key={cat.id} // Use the unique ID here
                  type="button"
                  onClick={() => {
                    // Update both the ID and the Title for your preview logic
                    onUpdate({ category: cat.id, categoryTitle: cat.label });
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? "bg-accent/10 text-accent"
                        : "text-slate-600 dark:text-slate-400 hover:bg-light-900/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  <span className="truncate">{cat.label}</span>
                  {isSelected && (
                    <Check size={16} className="text-accent flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showScrollIndicator && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-dark-950 to-transparent flex items-end justify-center pb-1">
              <ArrowDown size={14} className="text-accent animate-bounce" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
