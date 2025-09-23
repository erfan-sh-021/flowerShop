"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import Link from "next/link";

type Flower = {
  id: number;
  src?: string;
  alt?: string;
  title?: string;
  price?: number | string;
};

type Props = {
  flowers: Flower[];
};

function formatPrice(
  value: number | string | undefined | null,
  locale = "fa-IR"
) {
  if (value === null || value === undefined || value === "") return null;
  const normalized =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^0-9.-]+/g, ""));
  if (Number.isNaN(normalized)) return null;
  return normalized.toLocaleString(locale);
}

export default function Carousel({ flowers }: Props) {
  return (
    <Swiper
      modules={[FreeMode]}
      slidesPerView="auto"
      spaceBetween={12} // فاصله کارت‌ها کمی کمتر شد
      freeMode={{ momentum: true }}
      grabCursor={true}
      style={{ paddingRight: "1rem" }}
    >
      {flowers.map((flower) => {
        const formatted = formatPrice(flower.price);
        return (
          <SwiperSlide
            key={flower.id}
            className="!w-[180px]" // عرض کارت کوچکتر و ثابت
          >
            <Link href={`/flowerItems/${flower.id}`} className="block">
              <div className="group bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center text-center border border-gray-100 hover:border-green-200">
                {/* عکس محصول */}
                {/* عکس محصول */}
                <div className="relative w-full h-44 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={flower.src || "/images/placeholder.png"}
                    alt={flower.alt || "flower"}
                    fill
                    className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* متن و قیمت */}
                <div className="p-3 flex flex-col gap-1 items-center w-full">
                  <h3 className="text-sm font-semibold text-gray-800 truncate group-hover:text-green-700 transition-colors text-center">
                    {flower.title || "بدون عنوان"}
                  </h3>
                  <span className="text-green-600 font-bold text-sm text-center">
                    {formatted ? `${formatted} تومان` : "—"}
                  </span>

                  {/* دکمه انتخاب */}
                  <button
                    type="button"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 px-3 py-1.5 bg-darkgreen text-white text-xs shadow hover:bg-green"
                  >
                    انتخاب
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
