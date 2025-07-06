const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
