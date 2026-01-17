import React from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const MultiUseTable = ({
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  emptyMessage = "No records found",
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-sm overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-500" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-50 dark:border-white/5">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-8 py-6 ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-white/5">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="group hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-8 py-7 ${col.align === "right" ? "text-right" : ""}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-20 text-center text-zinc-400 uppercase text-[10px] font-bold tracking-widest"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="px-8 py-6 border-t border-zinc-50 dark:border-white/5 flex items-center justify-between bg-zinc-50/50 dark:bg-white/[0.01]">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            Page {pagination.page} <span className="opacity-30 mx-2">/</span>{" "}
            {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 disabled:opacity-20"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 disabled:opacity-20"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiUseTable;
