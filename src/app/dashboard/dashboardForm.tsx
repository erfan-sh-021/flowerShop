"use client";
import { useState } from "react";
import useFlowerStore from "@/store/useFlowerStore";

export default function DashboardForm({ currentData }: { currentData: "flowers" | "articles" }) {
  const { addFlower, addArticle } = useFlowerStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [src, setSrc] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async () => {
    const newItem = { id: Date.now().toString(), title, desc, src, ...(currentData === "flowers" && { price }) };
    if (currentData === "flowers") await addFlower(newItem);
    else await addArticle(newItem);

    setTitle(""); setDesc(""); setSrc(""); setPrice(0);
  };

  return (
    <div className="mb-6 flex flex-col gap-2">
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان" className="border p-2 rounded" />
      <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="توضیحات" className="border p-2 rounded" />
      <input type="text" value={src} onChange={e => setSrc(e.target.value)} placeholder="آدرس عکس" className="border p-2 rounded" />
      {currentData === "flowers" && <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="قیمت" className="border p-2 rounded" />}
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">ثبت</button>
    </div>
  );
}
