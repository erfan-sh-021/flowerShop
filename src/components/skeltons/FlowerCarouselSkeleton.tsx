"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import React, { useState, useEffect } from "react";

type Flower = {
  id?: number;
  src?: string;
  alt?: string;
  title?: string;
  price?: string | number;
};

export default function FlowerCarouselSkeleton({ flowers }: { flowers?: Flower[] }) {
  const [mounted, setMounted] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowSkeleton(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // امن کردن items برای TypeScript
  const items: Flower[] = Array.isArray(flowers) && flowers.length > 0
    ? flowers
    : Array.from({ length: 10 }, () => ({} as Flower));

  // کلاس shimmer روشن
  const shimmerClass =
    "relative overflow-hidden bg-gray-200 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-gray-200 before:via-gray-300 before:to-gray-200 before:animate-[shimmer_1.5s_infinite]";

  return (
    <div className="w-full">
      {/* اسکلتون */}
      {showSkeleton && (
        <div className="flex w-full gap-6 px-6 overflow-hidden">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-[220px] flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm flex flex-col animate-pulse"
            >
              <div className={`relative w-full h-60 rounded-t-xl ${shimmerClass}`} />
              <div className="p-3 flex flex-col items-center text-center gap-2">
                <div className={`w-4/5 h-4 rounded ${shimmerClass}`} />
                <div className={`w-2/3 h-3 rounded ${shimmerClass}`} />
                <div className={`w-3/4 h-4 rounded ${shimmerClass}`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* کروسل واقعی با fade */}
      {mounted && !showSkeleton && (
        <div className="transition-opacity duration-500 opacity-100">
          <Swiper
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={24}
            freeMode={{ momentum: true }}
            grabCursor
            style={{ padding: "0 1.5rem" }}
          >
            {items.map((flower, index) => (
              <SwiperSlide key={index} className="!w-[220px]">
                <div className="w-[220px] flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm flex flex-col">
                  <div className="relative w-full h-60 bg-gray-100 rounded-t-xl overflow-hidden">
                    {flower?.src && (
                      <img
                        src={flower.src}
                        alt={flower.alt || "flower"}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    )}
                  </div>
                  <div className="p-3 flex flex-col items-center text-center gap-1">
                    <h3 className="text-sm font-medium line-clamp-2">
                      {flower?.title || "بدون عنوان"}
                    </h3>
                    {flower?.id && <span className="text-xs text-gray-500">کد: {flower.id}</span>}
                    {flower?.price && <span className="text-sm font-semibold">{flower.price} تومان</span>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
