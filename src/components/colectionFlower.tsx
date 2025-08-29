"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const flowers = [
  { id: 1, src: "/images/flower1.jpg", alt: "گل ۱" },
  { id: 2, src: "/images/flower2.jpg", alt: "گل ۲" },
  { id: 3, src: "/images/flower3.jpg", alt: "گل ۳" },
  { id: 4, src: "/images/flower4.jpg", alt: "گل ۴" },
  { id: 5, src: "/images/flower5.jpg", alt: "گل ۵" },
];

export default function FlowersSection() {
  return (
    <section className="py-10">
      <h2 className="text-center text-lg font-medium mb-6">دسته بندی ها</h2>

      {/* حالت موبایل (کروسل) */}
      <div className="block md:hidden">
        <Swiper spaceBetween={15} slidesPerView={1}>
          {flowers.map((flower) => (
            <SwiperSlide key={flower.id}>
              <img
                src={flower.src}
                alt={flower.alt}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* حالت دسکتاپ (Grid) */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {flowers.map((flower) => (
          <div key={flower.id}>
            <img
              src={flower.src}
              alt={flower.alt}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
