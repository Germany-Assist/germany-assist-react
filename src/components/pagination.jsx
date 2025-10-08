import React from "react";

export const pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages < 1) return null;
  return (
    <div className="flex items-center space-x-2">
      p
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage == 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      ></button>
      Prev
      {[
        ...Array(totalPages).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white "
                : "bgg-white hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        )),
      ]}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
