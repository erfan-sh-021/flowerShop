"use client";

import React, { useState } from "react";

type Flower = {
  id?: string | number;
  title?: string;
  price?: number | string;
  desc?: string;
};

export default function FlowerDetailClient({ flower, images }: { flower: Flower; images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* تصویر و thumbnails */}
      <div className="relative w-full md:order-2 flex flex-col items-center">
        <div className="w-full h-80 md:h-96 overflow-hidden rounded-xl">
          <img
            src={images[activeIndex]}
            alt={flower.title}
            className="w-full h-full object-cover rounded-xl shadow transition-all duration-300"
          />
        </div>

        <div className="flex gap-3 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                index === activeIndex ? "border-green-600 scale-110 shadow-lg" : "border-gray-300"
              }`}
            >
              <img src={img} alt={`thumbnail-${index}`} className="w-full h-full object-cover" />
              {index === activeIndex && (
                <>
                  <div className="absolute inset-0 bg-green-500/20 pointer-events-none"></div>
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-green-600 text-xs font-bold shadow">
                    ✓
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* اطلاعات محصول */}
      <div className="flex flex-col justify-center text-right md:order-1">
        <h1 className="text-2xl font-bold mb-2">{flower.title}</h1>
        <p className="text-green-700 text-xl font-bold mb-4">
          {Number(flower.price ?? 0).toLocaleString("fa-IR")} تومان
        </p>
        <p className="text-gray-600 mb-4">{flower.desc}</p>

        <div className="flex items-center gap-4 mb-4 justify-end">
          <div className="flex items-center gap-3">
            <button className="bg-darkgreen hover:bg-green text-white py-3 px-6 rounded-lg shadow transition">
              خرید
            </button>
            <input type="number" min={1} max={10} defaultValue={1} className="w-20 border rounded-lg p-2 text-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
