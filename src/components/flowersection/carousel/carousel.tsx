"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import FlowerCard from "@/components/flowerCard";

type Flower = {
  id: number;
  src?: string;
  alt?: string;
  title?: string;
  price?: number | string;
  code?: string;
};

export default function Carousel({
  flowers,
  palette = 5,
}: {
  flowers: Flower[];
  palette?: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <Swiper
      modules={[FreeMode]}
      slidesPerView="auto"
      spaceBetween={24}
      freeMode={{ momentum: true }}
      grabCursor
      style={{ padding: "0 1.5rem" }}
    >
      {flowers.map((flower) => (
        <SwiperSlide key={flower.id} className="!w-[220px]">
          <FlowerCard flower={flower}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
