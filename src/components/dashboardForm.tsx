"use client";
import { useState } from "react";
import useFlowerStore from "@/store/useFlowerStore";

export default function DashboardForm() {
  const { addFlower } = useFlowerStore();
  const [form, setForm] = useState({
    id: "",
    title: "",
    desc: "",
    price: "",
    src: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.title) return alert("لطفاً ID و عنوان را وارد کنید!");
    addFlower({ ...form, price: Number(form.price) });
    setForm({ id: "", title: "", desc: "", price: "", src: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input className="border p-2" placeholder="ID" value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })} />
      <input className="border p-2" placeholder="Title" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea className="border p-2" placeholder="Description" value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })} />
      <input className="border p-2" placeholder="Price" type="number" value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <input className="border p-2" placeholder="Image URL" value={form.src}
        onChange={(e) => setForm({ ...form, src: e.target.value })} />
      <button className="bg-green-500 text-white px-3 py-1 rounded">
        اضافه کردن گل
      </button>
    </form>
  );
}
