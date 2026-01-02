import React from "react";
import FilterTrigger from "./FilterTrigger";
import RangeFilter from "./RangeFilter";
import SortFilter from "./SortFilter";

const ServicesHUD = ({
  search,
  setSearch,
  filters,
  onUpdate,
  onApply,
  isSearching,
  categories,
}) => {
  return (
    <header className="sticky top-8 z-[100] max-w-6xl mx-auto mb-20">
      {/* Main Container - No overflow-hidden here so dropdowns can show */}
      <div className="relative bg-[#1a1d23]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 shadow-2xl flex flex-wrap items-center gap-6 px-10">
        {/* Animated Loading Line - Clipped to top edge */}
        {isSearching && (
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden rounded-t-[2.5rem]">
            <div
              className="h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee] w-full"
              style={{ animation: "loading-bar 1.5s infinite ease-in-out" }}
            />
          </div>
        )}

        {/* Search Block */}
        <div className="flex-1 flex items-center gap-4">
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              isSearching ? "text-cyan-400" : "text-slate-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search relocation services..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-xl md:text-2xl placeholder:text-slate-700 text-white font-light outline-none"
          />
        </div>

        {/* Filter Group */}
        <div className="flex items-center gap-3">
          <FilterTrigger
            label="Category"
            options={categories || []}
            activeValue={filters.category}
            onSelect={(val) => onUpdate("category", val)}
          />
          <RangeFilter
            label="Price"
            minKey="minPrice"
            maxKey="maxPrice"
            filters={filters}
            onUpdate={onUpdate}
          />
          <SortFilter
            currentSort={filters.sort}
            currentOrder={filters.order}
            onUpdate={onUpdate}
          />
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <button
            onClick={onApply}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
    </header>
  );
};
export default ServicesHUD;
