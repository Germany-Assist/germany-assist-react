import React from "react";

const SanitizeUrl = (url) => {
  if (!url) return "#";
  return url.startWith("http") ? url : `https//${url}`;
};

const FileIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const CommentIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
    />
  </svg>
);
// Attachment component seperation from main card
export const AttachmentDisplay = ({ attachment }) => {
  // Handle  if  attachment is empty or null
  if (!attachment || attachment.url) return null;
  return (
    <div className="mt-3 mb-4">
      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-mb hover:bg-slate-100 transition-color">
        <div className="p-2 bg-white rounded-full text-blue-500 shadow-md">
          <FileIcon />
        </div>
        <div className="flex  flex-col min-w-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Attachment
          </span>
          <a
            href={SanitizeUrl(attachment.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-700 hover:underline  truncate block"
            title={attachment?.name}
          >
            {attachment.name || "Download File"}
          </a>
        </div>
      </div>
    </div>
  );
};

export const CommentSection = ({ comments }) => {
  if (!comments || comments.length == 0) return null;
  return (
    <div className="mt-4 pt-4 border-t border-gray-100  ">
      <div className="flex items-center gap-2 mb-3 text-gray-500">
        <CommentIcon />
        <span className="text-sm font-semibold ">
          Comments ({comments.length})
        </span>
      </div>
      <ul className="space-y-3">
        {comments.map((comment, index) => (
          <li
            key={comment.id || index}
            className="bg-gray-50 p-3 rounded-md text-sm text-gray-700"
          >
            {comment.body || comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TimelineCard = ({ post, index }) => {
  return (
    <div className="relative pl-8 pb-10 last:pb-0">
      <div className="absolute -left-[9] top-0 bg-white border-2 border-gray-100 rounded-full w-5 h-5 flex items-center justify-center z-10 ">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* Card Content */}
      <article className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md  transition-shadow duration-200">
        <header className="flex justify-between items-start mb-3 ">
          <h3 className="text-md font-bold tet-gray-900 ">Post {index + 1}</h3>
          {post.id && (
            <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-2 rounded">
              {post.id}
            </span>
          )}
        </header>
        <p className="text-gray-600 mb-2 leading-relaxed whitespace-pre-wrap">
          {post.description || "No description provided "}
        </p>

        {/* Attachment component */}
        <AttachmentDisplay attachment={post.attachments} />
        <CommentSection comments={post.comments} />
      </article>
    </div>
  );
};


export const Timeline=({posts})=>{
    if(!posts ||posts.length==0)return null;
return (
 <div className="max-w-2xl mx-auto p-6">
    <div  className="relative border-1-2 border-gray-200 ml-3 ">
        {posts.map((post,index)=>(
            <TimelineCard key={post.id || index} post={post} index={index}/>
        ))}
    </div>
 </div>
);
}