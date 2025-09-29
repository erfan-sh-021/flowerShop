"use client";

import React, { useState, useEffect } from "react";
import useCartStore from "@/store/useCartStore";

type Flower = {
  id?: string | number;
  title?: string;
  price?: number | string;
  desc?: string;
};

export default function FlowerDetailClient({
  flower,
  images,
}: {
  flower: Flower;
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    if (!flower.id || !flower.title || !flower.price) return;

    addToCart(
      {
        id: String(flower.id),
        name: flower.title,
        price: Number(flower.price),
        image: images[0],
      },
      quantity
    );

    setQuantity(1);
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative w-full md:order-2 flex flex-col items-center">
        <div className="w-full h-80 md:h-96 overflow-hidden">
          <img
            src={images[activeIndex]}
            alt={flower.title}
            className="w-full h-full object-cover shadow transition-all duration-300"
          />
        </div>

        <div className="flex gap-3 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={`relative w-16 h-16 overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                index === activeIndex
                  ? "border-green-600 scale-110 shadow-lg"
                  : "border-gray-300"
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

      <div className="flex flex-col justify-center text-right md:order-1">
        <h1 className="text-2xl font-bold mb-2">{flower.title}</h1>
        <p className="text-green-700 text-xl font-bold mb-4">
          {Number(flower.price ?? 0).toLocaleString("fa-IR")} تومان
        </p>
        <p className="text-gray-600 mb-4">{flower.desc}</p>

        <div className="flex items-center gap-4 mb-4 justify-end">
          <div className="flex items-center gap-3">
            <button
              className="bg-darkgreen hover:bg-green text-white py-2 px-8 shadow transition"
              onClick={handleAddToCart}
            >
              خرید
            </button>
            <input
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border p-2 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
