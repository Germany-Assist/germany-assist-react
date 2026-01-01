import React, { useState } from "react";

const ServicesPage = () => {
  return (
    // Background is now a softer, deep slate instead of pitch black
    <div className="bg-[#0f1115] min-h-screen p-6 md:p-10 text-slate-200 font-sans selection:bg-cyan-500/40">
      {/* --- REFINED FLOATING HUD --- */}
      <header className="sticky top-8 z-50 max-w-5xl mx-auto mb-20">
        <div className="bg-[#1a1d23]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap items-center gap-6 px-4 py-2">
            {/* Brand/System Label - Larger & More Visible */}
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <span className="font-bold text-sm tracking-wide text-white">
                SERVICES_HUB
              </span>
            </div>

            <div className="hidden lg:block h-8 w-[1px] bg-white/10" />

            {/* Search Input - Larger Text */}
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search for visa, housing, etc..."
                className="w-full bg-transparent border-none text-base focus:ring-0 placeholder:text-slate-500 text-white"
              />
            </div>

            {/* Filter Group */}
            <div className="flex items-center gap-3">
              <FilterTrigger label="Category" />
              <FilterTrigger label="Price" />
              <div className="h-6 w-[1px] bg-white/10 mx-1" />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/20">
                Apply
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT GRID --- */}
      <main className="max-w-7xl mx-auto">
        {/* Header Title for the section */}
        <div className="mb-10 px-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Available Solutions
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            Vetted services for your relocation to Germany.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* SERVICE CARD EXAMPLE */}
          <div className="group relative">
            {/* The "Outer Glow" - Softer and more appealing */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-[#161920] border border-white/10 rounded-[2.2rem] p-8 h-full flex flex-col justify-between shadow-xl transition-transform duration-300 group-hover:-translate-y-2">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                  🛂
                </div>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
                  Ready
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                  Visa Paperwork Elite
                </h3>
                <p className="text-slate-400 text-base mt-4 leading-relaxed font-light">
                  Complete management of your Blue Card or Work Permit
                  application with local experts.
                </p>

                <div className="flex gap-4 mt-6">
                  <span className="text-xs text-slate-500 font-mono">
                    ID: GDUK
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ⭐ 4.8 (120)
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Starting at
                  </p>
                  <p className="text-2xl font-bold text-white">€123.00</p>
                </div>
                <button className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group/btn">
                  <svg
                    className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Repeat Card for dummy visualization */}
          <DummyCard title="Housing Search" icon="🏠" price="€450.00" />
          <DummyCard title="Language Prep" icon="🇩🇪" price="€89.00" />
        </div>

        {/* --- SPACIOUS PAGINATION --- */}
        <footer className="mt-32 pb-20 flex flex-col items-center">
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
            <button className="p-3 text-slate-400 hover:text-white disabled:opacity-20 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-500 text-black font-bold">
                1
              </span>
              <span className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-400 cursor-pointer transition-colors">
                2
              </span>
              <span className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-400 cursor-pointer transition-colors">
                3
              </span>
            </div>

            <button className="p-3 text-slate-400 hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <p className="mt-6 text-slate-500 text-sm font-medium tracking-widest uppercase">
            Viewing 1-9 of 42 Services
          </p>
        </footer>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const FilterTrigger = ({ label }) => (
  <button className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all">
    <span className="text-sm font-semibold text-slate-300 group-hover:text-white">
      {label}
    </span>
    <svg
      className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
);

const DummyCard = ({ title, icon, price }) => (
  <div className="bg-[#161920] border border-white/10 rounded-[2.2rem] p-8 h-full flex flex-col justify-between shadow-xl">
    <div>
      <div className="h-14 w-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-2xl mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
      <p className="text-slate-400 text-base mt-4 leading-relaxed font-light italic">
        Vetted service provider verified by Germany-Assist.
      </p>
    </div>
    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
      <p className="text-2xl font-bold text-white">{price}</p>
      <button className="text-cyan-400 font-bold hover:underline text-sm uppercase tracking-widest transition-all">
        Details
      </button>
    </div>
  </div>
);

export default ServicesPage;
