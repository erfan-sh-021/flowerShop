"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import FlowerCarouselSkeleton from "@/components/skeltons/FlowerCarouselSkeleton";

const Carousel = dynamic(() => import("./carousel"), {
  ssr: false,
});

type Props = {
  flowers: { id: number; src: string; alt: string }[];
};

export default function CarouselWrapper({ flowers }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // وقتی Swiper و DOM کامل mount شد
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return <FlowerCarouselSkeleton />;

  return <Carousel flowers={flowers} />;
}
