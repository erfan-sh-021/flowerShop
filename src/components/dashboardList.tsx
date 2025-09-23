"use client";
import { useEffect, useState } from "react";
import { Pencil,Trash2 } from "lucide-react";
import useFlowerStore from "@/store/useFlowerStore";
import Pagination from "@/components/pagination";
import EditModal from "@/components/editModal";
import { useSearchParams } from "next/navigation";


export default function DashboardList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const { flowers, totalCount, fetchFlowers, deleteFlower } = useFlowerStore();
  const [editFlower, setEditFlower] = useState<any | null>(null);

  useEffect(() => {
    fetchFlowers(page, limit);
  }, [page, limit]);

  const pageCount = Math.ceil(totalCount / limit);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="border shadow p-4 flex flex-col items-center gap-2"
          >
            <img
              src={flower.src}
              alt={flower.title}
              className="w-full h-40 object-cover"
            />
            <h3 className="font-bold">{flower.title}</h3>
            <p className="text-sm text-gray-600">{flower.desc}</p>
            <p className="text-green-600 font-bold">{flower.price} تومان</p>
            <div className="flex items-center gap-2">
              {/* دکمه حذف */}
              <button
                onClick={() => deleteFlower(flower.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
                title="حذف"
              >
                <Trash2 size={18} />
              </button>

              {/* دکمه ویرایش */}
              <button
                onClick={() => setEditFlower(flower)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition"
                title="ویرایش"
              >
                <Pencil size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <Pagination pageCount={pageCount} limit={limit} currentPage={page} />
      )}

      {editFlower && (
        <EditModal flower={editFlower} onClose={() => setEditFlower(null)} />
      )}
    </div>
  );
}
