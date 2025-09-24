"use client";
import { useState, useEffect } from "react";
import useFlowerStore from "@/store/useFlowerStore";

interface EditModalProps {
  item: any; // آیتمی که میخوای ادیت کنی
  currentData: "flowers" | "articles"; // نوع داده
  onClose: () => void; // برای بستن مودال
}

export default function EditModal({ item, currentData, onClose }: EditModalProps) {
  const { updateFlower, updateArticle } = useFlowerStore();

  const [title, setTitle] = useState(item.title);
  const [desc, setDesc] = useState(item.desc);
  const [src, setSrc] = useState(item.src);
  const [price, setPrice] = useState(item.price || 0);

  useEffect(() => {
    setTitle(item.title);
    setDesc(item.desc);
    setSrc(item.src);
    setPrice(item.price || 0);
  }, [item]);

  const handleSave = async () => {
    const updatedItem = { ...item, title, desc, src, ...(currentData === "flowers" && { price }) };

    try {
      if (currentData === "flowers") await updateFlower(updatedItem);
      else await updateArticle(updatedItem);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col gap-2">
        <h2 className="text-lg font-bold mb-2">{currentData === "flowers" ? "ویرایش محصول" : "ویرایش مقاله"}</h2>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="عنوان"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="توضیحات"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={src}
          onChange={e => setSrc(e.target.value)}
          placeholder="آدرس عکس"
          className="border p-2 rounded"
        />
        {currentData === "flowers" && (
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            placeholder="قیمت"
            className="border p-2 rounded"
          />
        )}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
