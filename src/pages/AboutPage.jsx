import React from "react";
import NavigationBar from "../components/ui/NavigationBar";
import PartnerMarquee from "../components/ui/PartnerMarquee";

// Import your new components
import AboutHero from "../components/About/AboutHero"; 
import AboutValues from "../components/About/AboutValues";
import AboutFounders from "../components/About/AboutFounders";
import ContactCTA from "../components/About/ContactCTA";

// 1. DEFINE THE FLAG
// In a real app, this might come from an environment variable or a config file
const FEATURE_FLAGS = {
  USE_NEW_ABOUT_DESIGN: true, // Toggle this to false to show the old design
};

const AboutPage = () => {
  // 2. CHECK THE FLAG
  if (!FEATURE_FLAGS.USE_NEW_ABOUT_DESIGN) {
     return <div>Old Design Component Here...</div>; 
     // (Or you can just return the old JSX structure here directly)
  }

  // 3. RENDER NEW DESIGN
  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 transition-colors duration-700 ease-elegant selection:bg-accent/20">
      <NavigationBar />

      <main className="relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <AboutHero />
        <AboutValues />
        <AboutFounders />
        
        {/* New Feature Added */}
        <ContactCTA />

        <div className="border-t border-light-700 dark:border-white/5 pt-10">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Our Network</p>
            <PartnerMarquee />
        </div>
      </main>

      <footer className="py-12 border-t border-light-700 dark:border-white/5 text-center bg-light-900/30 dark:bg-transparent">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light tracking-widest uppercase">
          © 2026 Germany Assist — Built for the future.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;