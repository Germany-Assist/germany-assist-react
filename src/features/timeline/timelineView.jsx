import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paperclip,
  MessageSquare,
  ExternalLink,
  Clock,
  Calendar,
  X,
  Send,
  Pin,
  Info,
  User,
} from "lucide-react";

// --- 1. PINNED SIDEBAR COMPONENT ---
export const PinnedSidebar = ({ caseId }) => (
  <aside className="hidden lg:block w-80 space-y-8 sticky top-32 h-fit">
    <section className="space-y-5">
      <div className="flex items-center gap-3 text-accent uppercase tracking-[0.2em] text-xs font-bold">
        <Pin className="w-4 h-4" />
        <span>Pinned Updates</span>
      </div>
      <div className="bg-light-900/50 dark:bg-white/5 border border-light-700 dark:border-white/10 rounded-2xl p-5 shadow-sm">
        <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          The next appointment for your{" "}
          <span className="text-accent font-medium">Residence Permit</span> is
          scheduled for January 15th. Please bring all original documents.
        </p>
      </div>
    </section>

    <section className="space-y-5 pt-6 border-t border-light-700 dark:border-white/5">
      <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">
        <Info className="w-4 h-4" />
        <span>Case Details</span>
      </div>
      <div className="space-y-4 text-xs uppercase tracking-widest font-medium">
        <div className="flex justify-between border-b border-light-700 dark:border-white/5 pb-2">
          <span className="text-slate-400">Reference:</span>
          <span className="text-slate-900 dark:text-white">
            {caseId || "DE-9921"}
          </span>
        </div>
        <div className="flex justify-between border-b border-light-700 dark:border-white/5 pb-2">
          <span className="text-slate-400">Officer:</span>
          <span className="text-slate-900 dark:text-white">A. Schmidt</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Priority:</span>
          <span className="text-accent">High</span>
        </div>
      </div>
    </section>
  </aside>
);

// --- 2. TIMELINE CARD COMPONENT ---
export const TimelineCard = ({ post, onOpenComments, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="mb-16 ml-10 relative group"
  >
    {/* Animated Timeline Node */}
    <div className="absolute -left-[49px] top-0 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-light-950 dark:bg-dark-950 border-2 border-light-700 dark:border-white/30 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] transition-all duration-500" />
    </div>

    <div className="space-y-5">
      {/* Date Header */}
      <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" /> Jan 04
        </span>
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" /> 14:20 GMT
        </span>
      </div>

      {/* Main Glass Content */}
      <div className="bg-light-900/30 dark:bg-white/[0.03] border border-light-700 dark:border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 backdrop-blur-md hover:border-accent/30 transition-all duration-700 shadow-xl shadow-transparent hover:shadow-accent/5">
        <p className="text-slate-800 dark:text-slate-200 text-xl font-light leading-relaxed whitespace-pre-line">
          {post.description}
        </p>

        {post.attachments?.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-3">
            {post.attachments.map((file, i) => (
              <a
                key={i}
                href={`https://${file.url}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 p-5 rounded-2xl bg-light-950/40 dark:bg-dark-950/50 border border-light-700 dark:border-white/5 hover:border-accent/40 group/file transition-all"
              >
                <div className="bg-accent/10 p-3 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Paperclip className="w-5 h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-accent uppercase tracking-widest font-bold">
                    Download Document
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto text-slate-400 opacity-0 group-hover/file:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onOpenComments(post)}
        className="ml-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-colors font-bold group"
      >
        <MessageSquare className="w-5 h-5 group-hover:fill-accent/5" />
        <span>{post.comments?.length || 0} Comments</span>
      </button>
    </div>
  </motion.div>
);

// --- 3. COMMENT DRAWER COMPONENT ---
export const CommentDrawer = ({ post, onClose }) => (
  <AnimatePresence>
    {post && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/60 backdrop-blur-sm z-[60]"
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="fixed top-0 right-0 h-full w-full max-w-lg bg-light-950 dark:bg-dark-950 border-l border-light-700 dark:border-white/10 z-[70] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-10 border-b border-light-700 dark:border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-md font-bold uppercase tracking-[0.3em] text-slate-900 dark:text-white">
                Discussion
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                Reference: {post.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10">
            {post.comments?.length > 0 ? (
              post.comments.map((comment, i) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                        Support Team
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Today at 12:45 PM
                      </span>
                    </div>
                  </div>
                  <div className="bg-light-900/50 dark:bg-white/5 border border-light-700 dark:border-white/5 p-6 rounded-3xl rounded-tl-none">
                    <p className="text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-4">
                <MessageSquare className="w-16 h-16 text-slate-500" />
                <p className="uppercase tracking-[0.3em] text-xs">
                  Waiting for responses
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-10 bg-light-900/30 dark:bg-white/[0.02] border-t border-light-700 dark:border-white/5">
            <div className="relative">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full bg-light-950 dark:bg-dark-950 border border-light-700 dark:border-white/10 rounded-3xl p-6 pr-16 text-sm focus:outline-none focus:border-accent/50 transition-all min-h-[120px] text-slate-200 shadow-inner"
              />
              <button className="absolute right-5 bottom-5 p-3 bg-accent text-white rounded-2xl shadow-xl shadow-accent/30 hover:scale-105 active:scale-95 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- MAIN VIEW COMPONENT ---
const TimelineView = ({ data }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const posts = data?.posts || [];

  return (
    <div className="flex flex-col lg:flex-row gap-16 relative">
      <PinnedSidebar caseId={data?.id} />

      <div className="flex-1 max-w-3xl">
        <div className="relative border-l border-light-700 dark:border-white/10 ml-4 md:ml-6">
          {posts.map((post, index) => (
            <TimelineCard
              key={post.id}
              post={post}
              index={index}
              onOpenComments={setSelectedPost}
            />
          ))}
        </div>
      </div>

      <CommentDrawer
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};

export default TimelineView;
