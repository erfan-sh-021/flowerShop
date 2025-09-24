import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageCount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  // تولید لیست شماره صفحه‌ها
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      {/* دکمه قبلی */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition"
        title="صفحه قبل"
      >
        <ChevronLeft size={18} />
      </button>

      {/* شماره صفحات */}
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition 
              ${page === currentPage ? "bg-blue-500 text-white border-blue-500" : "hover:bg-gray-100 border-gray-300"}
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* دکمه بعدی */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="p-2 rounded-full border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition"
        title="صفحه بعد"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
