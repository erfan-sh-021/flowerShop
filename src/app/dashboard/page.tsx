"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFlowerStore from "@/store/useFlowerStore";
import DashboardForm from "@/app/dashboard/dashboardForm";
import DashboardList from "@/app/dashboard/dashboardList";
import useColorStore from "@/store/useColorStore";
import { colorPalettes } from "@/utils/colorPlatte";
import { PaletteId } from "@/types/colorPalette";

export default function DashboardPage() {
  const { fetchFlowers, fetchArticles } = useFlowerStore();
  const [pageTitle, setPageTitle] = useState("مدیریت محصولات ویژه");
  const [currentData, setCurrentData] = useState<"flowers" | "articles">("flowers");

  const { currentPalette, setPalette, initializePalette } = useColorStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // پالت ذخیره‌شده را از localStorage بخوان
    initializePalette();
    setMounted(true);
  }, [initializePalette]);

  useEffect(() => {
    if (currentData === "flowers") fetchFlowers(1, 6);
    else fetchArticles(1, 6);
  }, [currentData, fetchFlowers, fetchArticles]);

  if (!mounted) {
    // از mismatch در SSR جلوگیری کن
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        در حال بارگذاری...
      </div>
    );
  }

  const palette = colorPalettes[currentPalette];
  const paletteIds: PaletteId[] = [1, 2, 3, 4, 5];

  return (
    <div
      className="max-w-3xl mx-auto p-6 min-h-screen transition-colors duration-500"
      style={{
        background: `linear-gradient(to bottom, ${palette.bgFrom}, ${palette.bgTo})`,
        color: palette.text,
      }}
    >
      {/* انتخاب پالت رنگ */}
      <div className="flex justify-center gap-4 mb-6">
        {paletteIds.map((id) => (
          <button
            key={id}
            onClick={() => setPalette(id)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              currentPalette === id ? "border-black scale-110" : "border-gray-300"
            }`}
            style={{
              backgroundColor: colorPalettes[id].buttonFrom,
            }}
          />
        ))}
      </div>

      {/* هدر و ناوبری */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => {
            setCurrentData("flowers");
            setPageTitle("مدیریت محصولات ویژه");
          }}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          <ChevronLeft className="text-white" />
        </button>

        <h1 className="text-2xl font-bold text-center">{pageTitle}</h1>

        <button
          onClick={() => {
            setCurrentData("articles");
            setPageTitle("مقالات");
          }}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      {/* فرم و لیست */}
      <DashboardForm currentData={currentData} />
      <DashboardList currentData={currentData} />
    </div>
  );
}
