import React from "react";
import MainNav from "../components/Homepage/MainNav"; // The one we built earlier
import Hero from "../components/Homepage/Hero";
import ServicesGrid from "../components/Homepage/ServiceGrid";
import PartnerMarquee from "../components/Homepage/PartnerMarquee";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#292929] selection:bg-accent selection:text-black">
      <MainNav />
      <main>
        <Hero />
        <PartnerMarquee />
        <ServicesGrid />
      </main>
    </div>
  );
};

export default HomePage;
