"use client";
import { useEffect } from "react";
import useFlowerStore from "@/store/useFlowerStore";
import DashboardForm from "@/components/dashboardForm";
import DashboardList from "@/components/dashboardList";

export default function DashboardPage() {
  const { fetchFlowers } = useFlowerStore();

  useEffect(() => {
    fetchFlowers(1, 6); // ✅ حتما page و limit بده
  }, []);
  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">مدیریت گل‌ها</h1>
      <DashboardForm />
      <DashboardList />
    </div>
  );
}
