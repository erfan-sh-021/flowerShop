"use client";

import { useEffect, useState } from "react";
import { getData } from "@/lib/getData";
import CarouselWrapper from "./carousel/carouselwrapper";
import FlowerCarouselSkeleton from "../skeltons/FlowerCarouselSkeleton";

export default function FlowerSection() {
  const [flowers, setFlowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlowers() {
      try {
        const { data } = await getData("flowers", 1, 100);
        setFlowers(data.slice(0, 20));
      } catch (err) {
        console.error("Error fetching flowers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFlowers();
  }, []);

  return (
    <div className="w-full px-4">
      {loading ? <FlowerCarouselSkeleton /> : <CarouselWrapper flowers={flowers} />}
    </div>
  );
}
