import { ArrowRight } from "lucide-react";
import React from "react";
const ElegantButton = () => {
  return (
    <button
      className="group relative inline-flex items-center gap-2 px-8 py-3 
      bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full 
      shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 
      hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
    >
      <span className="font-medium tracking-wide">Explore Now</span>
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
};
export default ElegantButton;
