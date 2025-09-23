"use client";
import { useEffect } from "react";
import useFlowerStore from "@/store/useFlowerStore";
import Pagination from "@/components/pagination";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const { flowers, totalCount, fetchFlowers, deleteFlower } = useFlowerStore();

  // گرفتن داده‌ها وقتی صفحه یا limit تغییر کرد
  useEffect(() => {
    fetchFlowers(page, limit);
  }, [page, limit]);

  const pageCount = Math.ceil(totalCount / limit);

  return (
    <div className="mt-6">
      {/* لیست گل‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flowers.map((flower) => (
          <div key={flower.id} className="border shadow p-4 flex flex-col items-center gap-2">
            <img src={flower.src} alt={flower.title} className="w-full h-40 object-cover" />
            <h3 className="font-bold">{flower.title}</h3>
            <p className="text-sm text-gray-600">{flower.desc}</p>
            <p className="text-green-600 font-bold">{flower.price} تومان</p>
            <button
              onClick={() => deleteFlower(flower.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <Pagination pageCount={pageCount} limit={limit} currentPage={page} />
      )}
    </div>
  );
}
