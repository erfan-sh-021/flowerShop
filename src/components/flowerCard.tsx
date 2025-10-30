"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { colorPalettes } from "@/utils/colorPlatte";
import useColorStore from "@/store/useColorStore";

type Flower = {
  id: number;
  src?: string;
  alt?: string;
  title?: string;
  price?: number | string;
  code?: string;
};

export default function FlowerCard({ flower }: { flower: Flower }) {
  const {currentPalette} = useColorStore();
  const colors = colorPalettes[currentPalette];
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const formatted = flower.price
    ? Number(flower.price).toLocaleString("fa-IR")
    : "—";

  return (
    <Link href={`/flowerItems/${flower.id}`} className="block">
      <div
        className="relative group rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-md flex flex-col"
        onTouchStart={() => isTouchDevice && setTouched(!touched)}
      >
        {/* عکس محصول */}
        <div className="relative w-full h-60 bg-gray-50 overflow-hidden">
          <Image
            src={flower.src || "/images/placeholder.png"}
            alt={flower.alt || "flower"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
          />

          {/* دکمه روی عکس */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              isTouchDevice
                ? touched
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <span
              className="px-4 py-2 rounded-md font-medium border transition-colors duration-300"
              style={{
                borderColor: colors.buttonFrom,
                color: "#ffffff",
                backgroundColor: `${colors.buttonFrom}33`,
              }}
            >
              انتخاب این محصول
            </span>
          </div>
        </div>

        {/* متن و قیمت */}
        <div className="p-3 flex flex-col items-center text-center gap-1">
          <h3
            className="text-sm font-medium leading-tight line-clamp-2"
            style={{ color: colors.title }}
          >
            {flower.title || "بدون عنوان"}
          </h3>

          {flower.id && (
            <span className="text-xs text-gray-500">کد محصول: {flower.id}</span>
          )}

          <span
            className="text-sm font-semibold"
            style={{ color: colors.title }}
          >
            {formatted} تومان
          </span>
        </div>
      </div>
    </Link>
  );
}
