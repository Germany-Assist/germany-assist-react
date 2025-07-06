export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full border ${
            page === currentPage
              ? "bg-blue-700 text-white"
              : "bg-white text-blue-700 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
