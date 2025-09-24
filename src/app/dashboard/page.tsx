"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFlowerStore from "@/store/useFlowerStore";
import DashboardForm from "@/app/dashboard/dashboardForm";
import DashboardList from "@/app/dashboard/dashboardList";

export default function DashboardPage() {
  const { fetchFlowers, fetchArticles } = useFlowerStore();
  const [pageTitle, setPageTitle] = useState("مدیریت محصولات ویژه");
  const [currentData, setCurrentData] = useState<"flowers" | "articles">("flowers");

  useEffect(() => {
    if (currentData === "flowers") fetchFlowers(1, 6);
    else fetchArticles(1, 6);
  }, [currentData]);

  const handlePrevious = () => {
    setCurrentData("flowers");
    setPageTitle("مدیریت محصولات ویژه");
  };

  const handleNext = () => {
    setCurrentData("articles");
    setPageTitle("مقالات");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={handlePrevious}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <ChevronLeft className="text-white" />
        </button>

        <h1 className="text-2xl font-bold text-center">{pageTitle}</h1>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      <DashboardForm currentData={currentData} />
      <DashboardList currentData={currentData} />
    </div>
  );
}
