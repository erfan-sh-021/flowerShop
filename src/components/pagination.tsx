"use client";
import ReactPaginate from "react-paginate";
import useFlowerStore from "@/store/useFlowerStore";

interface PaginationProps {
  pageCount: number;
  limit: number;
  currentPage: number;
}

export default function Pagination({ pageCount, limit, currentPage }: PaginationProps) {
  const { fetchFlowers } = useFlowerStore();

  const handlePageClick = (e: { selected: number }) => {
    const newPage = e.selected + 1;
    fetchFlowers(newPage, limit); // فقط داده‌های صفحه جدید رو بگیر
  };

  return (
    <div className="flex justify-center my-4">
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1} // تا صفحه فعلی درست نمایش داده بشه
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        containerClassName="flex gap-2"
        pageClassName="px-3 py-1 border rounded-md cursor-pointer"
        activeClassName="bg-blue-500 text-white"
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
      />
    </div>
  );
}
