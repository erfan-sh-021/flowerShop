"use client";
import { useState } from "react";
import useFlowerStore from "@/store/useFlowerStore";

interface EditModalProps {
  flower: {
    id: string;
    title: string;
    desc: string;
    price: number;
    src: string;
  };
  onClose: () => void;
}

export default function EditModal({ flower, onClose }: EditModalProps) {
  const { updateFlower  } = useFlowerStore();
  const [form, setForm] = useState(flower);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFlower (form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">ویرایش گل</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            className="border p-2"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            placeholder="Description"
          />
          <input
            className="border p-2"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="Price"
          />
          <input
            className="border p-2"
            value={form.src}
            onChange={(e) => setForm({ ...form, src: e.target.value })}
            placeholder="Image URL"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-red-500 text-white"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-darkgreen text-white"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
