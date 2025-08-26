"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type Props = {
  flowers: { id: number; src?: string; alt?: string }[];
};

export default function Carousel({ flowers }: Props) {
  return (
    <Swiper 
        modules={[Autoplay,Navigation,Pagination]}
        spaceBetween={16} 
        slidesPerView={1} 
        autoplay={{ delay:3000,disableOnInteraction:false}}
        // navigation
        pagination={{ clickable: true }}
        loop
    >
      {flowers.map((flower) => (
        <SwiperSlide key={flower.id}>
          <Image
            src={flower.src || "/images/placeholder.png"}
            alt={flower.alt || "flower"}
            width={300}
            height={200}
            className=" h-50 sm:h-58 md:h-60 rounded-lg object-cover mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
