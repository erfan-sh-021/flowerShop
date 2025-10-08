"use client";

import { useState, useEffect } from "react";
import FlowerDetailClient from "@/components/FlowerDetailClient";
import { getData } from "@/lib/getData";
import { useParams } from "next/navigation";

export default function FlowerDetailPage() {
  const params = useParams();
  const [flower, setFlower] = useState<any | null>(null);
  const [allFlowers, setAllFlowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: flowers } = await getData("flowers", 1, 100);
        const foundFlower = flowers.find((f: any) => String(f.id) === params.id) || null;
        setFlower(foundFlower);
        setAllFlowers(flowers);
      } catch (err) {
        console.error(err);
        setFlower(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.id]);

  if (loading)
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="h-8 w-1/2 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-64 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );

  if (!flower)
    return <div className="text-center mt-10">محصول مورد نظر پیدا نشد</div>;

  const images = Array.from({ length: 4 }, (_, i) => flower.images?.[i] || flower.src || "/images/placeholder.png");

  return <FlowerDetailClient flower={flower} images={images} allFlowers={allFlowers} palette={5} />;
}
