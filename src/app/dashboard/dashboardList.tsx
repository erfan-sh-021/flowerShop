"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useFlowerStore from "@/store/useFlowerStore";
import Pagination from "@/app/dashboard/pagination";
import EditModal from "@/app/dashboard/editModal";

export default function DashboardList({ currentData }: { currentData: "flowers" | "articles" }) {
  const { flowers, articles, totalFlowersCount, totalArticlesCount, fetchFlowers, fetchArticles, deleteFlower, deleteArticle } = useFlowerStore();
  const [editItem, setEditItem] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    if (currentData === "flowers") fetchFlowers(page, limit);
    else fetchArticles(page, limit);
  }, [currentData, page]);

  const pageCount = currentData === "flowers"
    ? Math.ceil(totalFlowersCount / limit)
    : Math.ceil(totalArticlesCount / limit);

  const items = currentData === "flowers" ? flowers : articles;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border shadow p-4 flex flex-col items-center gap-2">
            <img src={item.src} alt={item.title} className="w-full h-40 object-cover" />
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
            {currentData === "flowers" && <p className="text-green-600 font-bold">{item.price} تومان</p>}
            <div className="flex items-center gap-2">
              <button
                onClick={() => currentData === "flowers" ? deleteFlower(item.id) : deleteArticle(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
                title="حذف"
              >
                <Trash2 size={18} />
              </button>

              <button
                onClick={() => setEditItem(item)}
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
        <Pagination pageCount={pageCount} limit={limit} currentPage={page} onPageChange={setPage} />
      )}

      {editItem && <EditModal item={editItem} currentData={currentData} onClose={() => setEditItem(null)} />}
    </div>
  );
}
