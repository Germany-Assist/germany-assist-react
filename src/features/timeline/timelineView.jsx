import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paperclip,
  MessageSquare,
  ExternalLink,
  Clock,
  X,
  Send,
  Pin,
  PlayCircle,
  Download,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// --- UPDATED DUMMY DATA ---
const DUMMY_TIMELINE = {
  id: "SRV-QUEBEC-77",
  posts: [
    {
      id: "p1",
      order: 1,
      type: "video",
      title: "German Grammar: The Accusative Case",
      description:
        "In this lecture, we cover the movement-based objects. Essential for your A1 exam preparation.",
      status: "completed",
      timestamp: "Oct 12, 10:00 AM",
      assets: [
        { name: "Accusative_Lecture.mp4", url: "#", type: "video/mp4" },
        { name: "Cheat_Sheet.pdf", url: "#", type: "pdf" },
      ],
      comments: [
        { id: "c1", body: "The explanation at 4:20 was very helpful!" },
      ],
    },
    {
      id: "p2",
      order: 2,
      type: "announcement",
      title: "Visa Interview Checklist",
      description:
        "Please ensure you have printed all these documents before your appointment on Tuesday. No digital copies allowed.",
      status: "pending",
      timestamp: "Oct 14, 02:30 PM",
      assets: [
        { name: "Appointment_Confirmation.pdf", url: "#", type: "pdf" },
        { name: "Biometric_Photo_Specs.jpg", url: "#", type: "image" },
      ],
      comments: [],
    },
  ],
};

// --- REFACTORED PAYLOAD COMPONENTS (Theme-Aware) ---

const VideoPayload = ({ post }) => {
  const videoAsset =
    post.assets?.find((a) => a.type?.includes("video")) || post.assets?.[0];
  const otherAssets = post.assets?.filter((a) => a !== videoAsset);

  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-[2rem] bg-black overflow-hidden group/vid cursor-pointer border border-light-700 dark:border-white/5 shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center bg-accent/5">
          <PlayCircle className="w-16 h-16 text-accent opacity-80 group-hover/vid:scale-110 transition-all" />
        </div>
        <div className="absolute bottom-4 left-4 bg-light-900/80 dark:bg-dark-950/60 backdrop-blur-xl px-4 py-2 rounded-full text-[10px] font-black uppercase text-light-text dark:text-white border border-light-700 dark:border-white/10">
          Play Lecture
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg">
        {post.description}
      </p>
      {otherAssets?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {otherAssets.map((asset, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-light-900 dark:bg-white/5 border border-light-700 dark:border-white/10 text-[10px] text-slate-500 dark:text-slate-300 uppercase font-bold"
            >
              <Paperclip size={12} className="text-accent" /> {asset.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AnnouncementPayload = ({ post }) => (
  <div className="space-y-6">
    <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed text-xl italic border-l-2 border-accent/30 pl-6 py-2">
      {post.description}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {post.assets?.map((file, i) => (
        <a
          key={i}
          href={file.url}
          className="flex items-center gap-4 p-4 rounded-3xl bg-light-900 dark:bg-white/[0.03] border border-light-700 dark:border-white/5 hover:border-accent transition-all group/file"
        >
          <div className="bg-accent/10 p-2.5 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
            <Download className="w-5 h-5" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-light-text dark:text-white truncate">
              {file.name}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
              Access Link
            </span>
          </div>
        </a>
      ))}
    </div>
  </div>
);

// --- MAIN COMPONENTS ---

const TimelineCard = ({ post, onOpenComments, index }) => {
  const isCompleted = post.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="mb-24 ml-10 relative group"
    >
      <div className="absolute -left-[49px] top-1 z-10">
        {isCompleted ? (
          <div className="bg-light-950 dark:bg-dark-950 rounded-full p-1 shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <CheckCircle2 className="w-5 h-5 text-accent" />
          </div>
        ) : (
          <div className="w-4 h-4 rounded-full bg-light-950 dark:bg-dark-950 border-2 border-light-700 dark:border-white/20 group-hover:border-accent transition-all duration-500" />
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <span className={isCompleted ? "text-accent" : ""}>
            Step 0{post.order}
          </span>
          <span className="opacity-20">/</span>
          <span>{post.type}</span>
          <span className="opacity-20">/</span>
          <span className="flex items-center gap-2">
            <Clock size={12} /> {post.timestamp}
          </span>
        </div>

        <div className="bg-light-800 dark:bg-white/[0.03] border border-light-700 dark:border-white/[0.08] rounded-[3rem] p-10 md:p-12 backdrop-blur-2xl hover:border-accent/30 transition-all duration-700 shadow-xl dark:shadow-2xl">
          <h4 className="text-3xl font-black text-light-text dark:text-white mb-6 tracking-tighter uppercase italic">
            {post.title}
          </h4>
          {post.type === "video" ? (
            <VideoPayload post={post} />
          ) : (
            <AnnouncementPayload post={post} />
          )}
        </div>

        <button
          onClick={() => onOpenComments(post)}
          className="ml-8 flex items-center gap-4 text-xs font-black uppercase tracking-[0.25em] text-slate-500 hover:text-light-text dark:hover:text-white transition-all group/btn"
        >
          <MessageSquare className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          <span>{post.comments?.length || 0} Comments</span>
          <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
        </button>
      </div>
    </motion.div>
  );
};

const ServiceTimelineView = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const data = DUMMY_TIMELINE;

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 py-24 px-6 sm:px-12 text-light-text dark:text-slate-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-28 flex flex-col items-center lg:items-start space-y-4">
          <h2 className="text-7xl font-black text-light-text dark:text-white tracking-tighter uppercase italic leading-none">
            Service Roadmap
          </h2>
          <div className="h-1 w-32 bg-accent shadow-sm dark:shadow-[0_0_20px_rgba(34,211,238,0.8)] rounded-full" />
          <p className="text-slate-500 uppercase tracking-[0.6em] text-[10px] font-black pt-4">
            Reference ID: {data.id}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-24 relative">
          <aside className="hidden lg:block w-80 space-y-12 sticky top-32 h-fit">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent uppercase tracking-[0.3em] text-[10px] font-black">
                <Pin className="w-3 h-3" /> <span>Pinned Information</span>
              </div>
              <div className="bg-light-900 dark:bg-white/[0.03] border border-light-700 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm">
                <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed italic">
                  "Ensure all{" "}
                  <span className="text-light-text dark:text-white font-bold underline">
                    notarized copies
                  </span>{" "}
                  are uploaded before the deadline."
                </p>
              </div>
            </div>
            <div className="pt-10 border-t border-light-700 dark:border-white/5 space-y-6">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Project Health</span>{" "}
                <span className="text-accent animate-pulse">On Track</span>
              </div>
              <div className="w-full h-[2px] bg-light-700 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-1/2" />
              </div>
            </div>
          </aside>

          <div className="flex-1 max-w-3xl">
            <div className="relative border-l border-light-700 dark:border-white/10 ml-4 md:ml-6">
              {data.posts.map((post, index) => (
                <TimelineCard
                  key={post.id}
                  post={post}
                  index={index}
                  onOpenComments={setSelectedPost}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/20 dark:bg-black/90 backdrop-blur-sm dark:backdrop-blur-2xl z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-light-800 dark:bg-dark-950 border-l border-light-700 dark:border-white/10 z-[110] shadow-2xl flex flex-col"
            >
              <div className="p-14 border-b border-light-700 dark:border-white/5 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase text-light-text dark:text-white italic">
                    Discussion
                  </h3>
                  <p className="text-[10px] uppercase text-slate-500 font-bold">
                    Step 0{selectedPost.order} • {selectedPost.title}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 text-slate-500 hover:text-light-text dark:hover:text-white transition-all"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-14 space-y-10">
                {selectedPost.comments.map((c) => (
                  <div key={c.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-xs">
                        A
                      </div>
                      <span className="text-[10px] font-black uppercase text-light-text dark:text-white">
                        Consultant
                      </span>
                    </div>
                    <div className="bg-light-900 dark:bg-white/[0.03] p-6 rounded-2xl rounded-tl-none border border-light-700 dark:border-white/5">
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-10 bg-light-900 dark:bg-white/[0.01] border-t border-light-700 dark:border-white/5">
                <div className="relative">
                  <textarea
                    placeholder="Share your thoughts..."
                    className="w-full bg-light-950 dark:bg-black/40 border border-light-700 dark:border-white/10 rounded-2xl p-6 pr-20 text-sm focus:border-accent outline-none min-h-[120px] text-light-text dark:text-white transition-all"
                  />
                  <button className="absolute right-4 bottom-4 p-4 bg-accent text-white rounded-xl shadow-lg">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceTimelineView;
