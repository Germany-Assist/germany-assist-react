import { useState, useMemo } from "react";

export const usePagination = (data = [], itemsPerPage = 5) => {
  const safeData = Array.isArray(data) ? data : [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return safeData.slice(start, start + itemsPerPage);
  }, [safeData, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
  };
};
