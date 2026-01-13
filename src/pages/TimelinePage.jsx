import React, { useEffect, useState } from "react";
import NavigationBar from "../components/ui/NavigationBar";
import TimelineView from "../features/timeline/timelineView";
import { fetchTimelineApi } from "../api/profile";
import { useParams } from "react-router-dom";
import banner from "../../src/assets/placeholders/t4.avif";

const TimelinePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { timelineId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const mockData = {
        id: "",
        posts: [
          {
            id: "",
            description: "",
            attachments: [{ url: "", name: "" }],
            assets: [],
            comments: [],
          },
        ],
      };
      const data = await fetchTimelineApi(timelineId);
      setData(data ?? mockData);
      setLoading(false);
    };
    fetchData();
  }, [timelineId]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-accent font-light tracking-[0.3em] text-xs uppercase">
          Syncing Timeline
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 transition-colors duration-700 ease-elegant">
      <NavigationBar />

      <main className="pt-24 pb-20">
        {/* --- DYNAMIC BANNER SECTION --- */}
        <div className="px-6 mb-12">
          <div className="max-w-7xl mx-auto relative h-64 md:h-80 overflow-hidden rounded-[2.5rem] border border-light-700 dark:border-white/10">
            {/* The Image */}
            <img
              src={banner}
              alt="Berlin Architecture"
              className="w-full h-full object-cover  "
            />

            {/* Overlay Gradient for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-light-950 dark:from-dark-950 via-transparent to-transparent" />

            {/* Banner Text */}
            <div className="absolute bottom-10 left-10 space-y-2">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                Active Case
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
                Relocation{" "}
                <span className="text-accent font-medium tracking-normal">
                  Journey
                </span>
              </h1>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6">
          <TimelineView data={data} />
        </section>
      </main>
      <footer className="py-12 border-t border-light-700 dark:border-white/5 text-center bg-light-900/30 dark:bg-transparent">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light tracking-widest uppercase">
          © 2026 Germany Assist
        </p>
      </footer>
    </div>
  );
};

export default TimelinePage;
