"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import Link from "next/link";
import { colorPalettes } from "@/utils/colorPlatte";

type Flower = {
  id: number;
  src?: string;
  alt?: string;
  title?: string;
  price?: number | string;
};

type Props = {
  flowers: Flower[];
  palette?: 1 | 2 | 3 | 4 | 5;
};

function formatPrice(value: number | string | undefined | null, locale = "fa-IR") {
  if (!value) return null;
  const normalized =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^0-9.-]+/g, ""));
  if (Number.isNaN(normalized)) return null;
  return normalized.toLocaleString(locale);
}

export default function Carousel({ flowers, palette = 5 }: Props) {
  const colors = colorPalettes[palette];

  return (
    <Swiper
      modules={[FreeMode]}
      slidesPerView="auto"
      spaceBetween={24}
      freeMode={{ momentum: true }}
      grabCursor
      style={{ padding: "0 1.5rem" }}
    >
      {flowers.map((flower) => {
        const formatted = formatPrice(flower.price);
        return (
          <SwiperSlide key={flower.id} className="!w-[230px]">
            <Link href={`/flowerItems/${flower.id}`} className="block">
              <div
                className="group rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 bg-white"
              >
                {/* عکس محصول */}
                <div className="relative w-full h-56 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <Image
                    src={flower.src || "/images/placeholder.png"}
                    alt={flower.alt || "flower"}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* متن و قیمت */}
                <div className="p-4 flex flex-col gap-2 items-center text-center">
                  <h3
                    className="text-base font-semibold leading-tight line-clamp-2 transition-colors"
                    style={{ color: colors.title }}
                  >
                    {flower.title || "بدون عنوان"}
                  </h3>

                  <span
                    className="px-3 py-1 rounded-full font-bold text-sm"
                    style={{
                      backgroundColor: colors.bgTo,
                      color: colors.title,
                    }}
                  >
                    {formatted ? `${formatted} تومان` : "—"}
                  </span>

                  {/* دکمه انتخاب */}
                  <button
                    type="button"
                    className="mt-3 px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-transform hover:scale-105"
                    style={{
                      backgroundColor: colors.buttonFrom,
                      color: "#fff",
                    }}
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
