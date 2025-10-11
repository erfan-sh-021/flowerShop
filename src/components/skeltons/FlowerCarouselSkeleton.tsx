"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import React, { useState, useEffect } from "react";

export default function FlowerCarouselSkeleton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // وقتی کامپوننت مونت شد، Swiper آماده میشه و استایل‌ها کاملاً اعمال میشن
    setMounted(true);
  }, []);

  const items = Array.from({ length: 6 });

  if (!mounted) {
    // حالت اولیه برای جلوگیری از چسبیدن کارت‌ها قبل از لود کامل Swiper
    return (
      <div className="flex w-full gap-6 px-6 overflow-hidden">
        {items.map((_, index) => (
          <div
            key={index}
            className="w-[220px] flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm animate-pulse flex flex-col"
          >
            <div className="relative w-full h-60 bg-gray-200" />
            <div className="p-3 flex flex-col items-center text-center gap-2">
              <div className="w-4/5 h-4 bg-gray-200 rounded" />
              <div className="w-2/3 h-3 bg-gray-200 rounded" />
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={24}
        freeMode={{ momentum: true }}
        grabCursor
        style={{ padding: "0 1.5rem" }}
      >
        {items.map((_, index) => (
          <SwiperSlide key={index} className="!w-[220px]">
            <div className="w-[220px] flex-shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm animate-pulse flex flex-col">
              <div className="relative w-full h-60 bg-gray-200" />
              <div className="p-3 flex flex-col items-center text-center gap-2">
                <div className="w-4/5 h-4 bg-gray-200 rounded" />
                <div className="w-2/3 h-3 bg-gray-200 rounded" />
                <div className="w-3/4 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
