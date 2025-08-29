"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

type Props = {
  items: { id: number; src?: string; alt?: string }[];
};

export default function SharedCarousel({ items }: Props) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <Image
            src={item.src || "/images/placeholder.png"}
            alt={item.alt || "item"}
            width={300}
            height={200}
            className="h-50 sm:h-58 md:h-60 rounded-lg object-cover mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
