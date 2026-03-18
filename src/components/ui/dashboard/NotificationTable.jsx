import React from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function NotificationsTable({
  notifications,
  loading,
  pagination,
  onPageChange,
  onMarkAsRead,
  onView,
  selectedIds,
  toggleSelectNotification,
  toggleSelectAll
}) {
// update the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `Today ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  if (isYesterday) {
    return `Yesterday ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
  const columns = [
      {
      header: "",
      key: "select",
      render: (row) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectedIds?.includes(row.id)}
            onChange={() => toggleSelectNotification(row.id)}
            className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      )
    },
    {
      header: "Message",
      key: "message",
    },
    {
      header: "Date",
      key: "createdAt",
      render: (row) =>(
        <span className="whitespace-nowrap">
          {formatDate(row.createdAt)}
        </span>
      ),  
    },
    {
      header: "Action",
      key: "action",
      align: "right",
      render: (row) => (
        <div className="">

          <button
            onClick={() => onView(row)}
            className="px-4 py-2 text-xs border rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 transition bg-blue-600"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="relative rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02]">
              {columns.map((col, index) => (
                <th
                key={index}
                className={`px-10 py-7 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 ${
                  col.align === "right" ? "text-right" : ""
                }`}
              >
                {col.key === "select" ? (
                  <input
                    type="checkbox"
                    checked={
                      notifications.length > 0 &&
                      notifications.every(n => selectedIds.includes(n.id))
                    }
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                  />
                ) : (
                  col.header
                )}
              </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-50 dark:divide-white/5">
            {notifications.length > 0 ? (
              notifications.map((row) => (
                <tr
                  key={row.id}
                  className={`group transition-colors duration-200 hover:bg-blue-500/[0.02] ${
                    !row.isRead ? "bg-gray-800" : "bg-blue-500/[0.02]"
                  }`}
                >
                  {columns.map((col, index) => (
                    <td
                      key={index}
                      className={`px-10 py-7 text-sm font-medium text-zinc-600 dark:text-zinc-300 ${
                          col.key === "select" ? "text-center" : ""
                        } ${
                          col.align === "right" ? "text-right" : ""
                        }`}
                    >
                      
                      {col.render
                        ? col.render(row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-32 text-center text-zinc-400 uppercase text-[10px] font-bold tracking-widest"
                >
                  No notifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-10 py-8 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between bg-zinc-50/50 dark:bg-white/[0.01]">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            Page{" "}
            <span className="text-blue-600">
              {pagination.page}
            </span>
            <span className="opacity-30 mx-2">/</span>
            {pagination.totalPages}
          </p>

          <div className="flex gap-3">
            <button
              disabled={pagination.page <= 1}
              onClick={() =>
                onPageChange(pagination.page - 1)
              }
              className="p-3 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 transition disabled:opacity-20"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={
                pagination.page >= pagination.totalPages
              }
              onClick={() =>
                onPageChange(pagination.page + 1)
              }
              className="p-3 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 transition disabled:opacity-20"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}