import React from "react";
import Hero from "../features/home/Hero";
import ServiceGrid from "../features/home/ServiceGrid";
import PartnerMarquee from "../components/ui/PartnerMarquee";
import NavigationBar from "../components/ui/NavigationBar";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#141414] selection:bg-accent selection:text-black">
      <NavigationBar />
      <main>
        <Hero />
        <PartnerMarquee />
        <ServiceGrid />
      </main>
    </div>
  );
};

export default HomePage;
