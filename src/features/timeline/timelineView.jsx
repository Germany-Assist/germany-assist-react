import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Pin,
  Download,
  ChevronRight,
  Loader2,
} from "lucide-react";

// --- ATTACHMENT COMPONENT ---
const PostContent = ({ post }) => (
  <div className="space-y-6">
    <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-lg">
      {post.description}
    </p>

    {post.assets && post.assets.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {post.assets.map((asset, i) => (
          <a
            key={i}
            href={asset.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-2xl bg-light-900 dark:bg-white/5 border border-light-700 dark:border-white/10 hover:border-accent transition-all group"
          >
            <div className="bg-accent/10 p-2 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <Download size={16} />
            </div>
            <span className="text-xs font-bold truncate dark:text-white">
              {asset.name || "Attachment"}
            </span>
          </a>
        ))}
      </div>
    )}
  </div>
);

const TimelineView = ({ data, loadMore, hasMore, isFetching }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const observerTarget = useRef(null);

  const mainPosts = data?.posts?.posts || [];
  const pinnedPosts = data?.pinnedPosts?.posts || [];
  const timelineId = data?.posts?.id || "N/A";

  // --- INFINITE SCROLL LOGIC ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetching, loadMore]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Pinned Sidebar */}
        <aside className="lg:w-72 space-y-6">
          <div className="flex items-center gap-2 text-accent uppercase tracking-widest text-[10px] font-black">
            <Pin size={14} className="rotate-45" /> <span>Important</span>
          </div>
          {pinnedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-light-800 dark:bg-white/[0.03] border border-light-700 dark:border-white/10 p-6 rounded-[2rem] shadow-sm hover:border-accent/30 transition-colors"
            >
              <p className="text-sm italic text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                "{post.description}"
              </p>
            </div>
          ))}
          {pinnedPosts.length === 0 && (
            <p className="text-[10px] text-slate-500 uppercase tracking-widest px-6 opacity-40">
              No pinned items
            </p>
          )}
        </aside>

        {/* Main Feed */}
        <div className="flex-1 border-l border-light-700 dark:border-white/10 ml-4">
          {mainPosts.map((post, idx) => (
            <motion.div
              key={`${post.id}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-16 ml-8 relative group"
            >
              <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-light-950 dark:bg-dark-950 border-2 border-accent shadow-[0_0_10px_rgba(34,211,238,0.3)]" />

              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Update 0{idx + 1}
                </span>

                <div className="bg-light-800 dark:bg-white/[0.03] border border-light-700 dark:border-white/10 rounded-[2.5rem] p-8 hover:border-accent/40 transition-all shadow-xl">
                  <PostContent post={post} />
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-accent transition-colors group/btn"
                >
                  <MessageSquare
                    size={14}
                    className="group-hover/btn:scale-110 transition-transform"
                  />
                  {post.comments?.length || 0} Comments
                  <ChevronRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-all"
                  />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Load More Sentinel */}
          <div
            ref={observerTarget}
            className="py-12 flex flex-col items-center justify-center"
          >
            {isFetching ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                  Fetching Updates
                </span>
              </div>
            ) : !hasMore && mainPosts.length > 0 ? (
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 opacity-60">
                End of roadmap
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Discussion Sidebar */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark-950 z-[110] shadow-2xl flex flex-col border-l dark:border-white/10"
            >
              <div className="p-8 border-b dark:border-white/10 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-black uppercase italic dark:text-white">
                    Discussion
                  </h3>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    Post ID: {selectedPost.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"
                >
                  <X className="dark:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {selectedPost.comments?.length > 0 ? (
                  selectedPost.comments.map((c, i) => (
                    <div
                      key={i}
                      className="bg-light-900 dark:bg-white/5 p-5 rounded-2xl rounded-tl-none border border-light-700 dark:border-white/5"
                    >
                      <p className="text-sm font-light leading-relaxed dark:text-slate-300">
                        {c.body}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-30">
                    <MessageSquare size={48} className="text-slate-500 mb-4" />
                    <p className="text-xs uppercase tracking-widest font-black">
                      No messages yet
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t dark:border-white/10 bg-light-800/50 dark:bg-black/20">
                <div className="relative">
                  <textarea
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full bg-white dark:bg-white/5 border border-light-700 dark:border-white/10 rounded-2xl p-4 pr-14 text-sm focus:outline-none focus:border-accent dark:text-white resize-none"
                  />
                  <button className="absolute right-2 top-2 p-2.5 bg-accent text-white rounded-xl shadow-lg">
                    <Send size={18} />
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

export default TimelineView;
