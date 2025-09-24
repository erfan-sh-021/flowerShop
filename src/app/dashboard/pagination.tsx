import React from "react";

interface PaginationProps {
  pageCount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>قبلی</button>
      <span>صفحه {currentPage} از {pageCount}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pageCount}>بعدی</button>
    </div>
  );
};

export default Pagination;
