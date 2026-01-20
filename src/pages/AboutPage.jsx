import React from "react";
import NavigationBar from "../components/ui/NavigationBar";
import PartnerMarquee from "../components/ui/PartnerMarquee";
import { Users, Globe, Briefcase, Rocket } from "lucide-react";

const AboutPage = () => {
  const founders = [
    { name: "Amr", role: "Co-Founder / Operations", bio: "Bridging the gap between Middle Eastern talent and German industrial standards." },
    { name: "Amer", role: "Co-Founder / Strategy", bio: "Expert in navigating German labor laws and immigration frameworks." },
    { name: "Hadi", role: "Co-Founder / Technology", bio: "Building the digital infrastructure that connects talent with opportunity." },
  ];

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 transition-colors duration-700 ease-elegant selection:bg-accent/20">
      <NavigationBar />

      <main className="relative overflow-hidden">
        {/* Background Decorative Pattern (from your Maintenance Page) */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
          <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block border border-accent/20">
            Our Mission
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter italic uppercase">
            Your Bridge To <br /> <span className="text-accent">Germany.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            Founded by Amr, Amer, and Hadi, Germany Assist was born from a simple realization: 
            the path from the Middle East to a career in Germany shouldn't be a maze. 
            We simplify the complex, connecting ambitious talent with world-class employers.
          </p>
        </section>

        {/* Stats/Values Section */}
        <section className="py-20 bg-light-900/50 dark:bg-white/5 border-y border-light-700 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Globe className="text-accent" />, label: "Region Focused", desc: "Tailored support for Middle Eastern professionals." },
              { icon: <Briefcase className="text-accent" />, label: "Verified Jobs", desc: "Direct partnerships with Germany's top-tier firms." },
              { icon: <Rocket className="text-accent" />, label: "End-to-End", desc: "From visa assistance to your first day at work." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white dark:bg-dark-800 rounded-2xl border border-light-700 dark:border-white/10 shadow-xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.label}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">The Visionaries</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">The team making the German dream accessible.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, idx) => (
              <div key={idx} className="group bg-white dark:bg-dark-900/50 p-8 rounded-[32px] border border-light-700 dark:border-white/10 transition-all duration-500 hover:border-accent/50 hover:-translate-y-2">
                <div className="w-16 h-16 bg-light-800 dark:bg-dark-800 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Users className="text-slate-400 group-hover:text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{founder.name}</h3>
                <p className="text-accent text-xs font-black uppercase tracking-widest mb-4">{founder.role}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Marquee Integration */}
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