import React from "react";
import { HardHat, Construction, Instagram, Twitter } from "lucide-react";
import NavigationBar from "../components/ui/NavigationBar";

function MaintenancePage({ nav = true }) {
  return (
    <div className="min-h-screen  flex-col items-center  bg-light-950 dark:bg-dark-950  transition-colors duration-700 ease-elegant selection:bg-accent/20">
      {nav && <NavigationBar />}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 w-full max-w-2xl px-6 mt-20">
        <div className="flex flex-col items-center">
          {/* Logo/Icon with a "Scan" line animation */}
          <div className="relative mb-12">
            <div className="w-24 h-24 border-4 border-slate-900 dark:border-white rounded-full flex items-center justify-center relative overflow-hidden">
              <Construction
                size={40}
                className="text-slate-900 dark:text-white"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent w-full h-1/2 animate-[scan_2s_linear_infinite]" />
            </div>
          </div>

          <span className="px-4 py-1.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Under Construction
          </span>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white text-center mb-8 tracking-tighter italic">
            STAY <br /> TUNED.
          </h1>

          <div className="w-full max-w-md bg-slate-100 dark:bg-zinc-900/80 p-8 rounded-[32px] border border-slate-200 dark:border-zinc-800 backdrop-blur-md">
            <p className="text-center text-slate-600 dark:text-zinc-400 font-medium mb-8">
              We are upgrading our engines to provide you with a faster, more
              powerful experience.
            </p>

            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="flex-1 bg-white dark:bg-black border border-slate-200 dark:border-zinc-700 rounded-2xl px-6 text-sm focus:outline-none focus:ring-2 ring-amber-500 transition-all dark:text-white"
              />
              <button className="bg-slate-900 dark:bg-white text-white dark:text-black p-4 rounded-2xl hover:scale-105 transition-transform active:scale-95">
                <Instagram size={20} />
              </button>
            </div>
          </div>

          <div className="mt-12 flex gap-8 text-slate-400">
            <Twitter
              className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
              size={20}
            />
            <Instagram
              className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
