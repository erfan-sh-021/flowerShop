"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useCartStore from "@/store/useCartStore";
import FlowerCard from "./flowerCard";

type Flower = {
  id?: number | string;
  title?: string;
  price?: number | string;
  desc?: string[] | string;
  src?: string;
};

export default function FlowerDetailClient({
  flower,
  images,
  allFlowers = [],
  palette = 5,
}: {
  flower: Flower;
  images: string[];
  allFlowers?: Flower[];
  palette?: 1 | 2 | 3 | 4 | 5;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleAddToCart = () => {
    if (!flower.id || !flower.title || !flower.price) return;
    addToCart(
      {
        id: String(flower.id),
        name: flower.title!,
        price: Number(flower.price),
        image: images[activeIndex],
      },
      quantity
    );
    setQuantity(1);
  };

  const formattedPrice = flower.price
    ? Number(flower.price).toLocaleString("fa-IR")
    : "—";

  const similarFlowers = allFlowers
    .filter((f) => f.id !== flower.id)
    .slice(0, 4);

  return (
    <>
      {/* نوار بالای صفحه */}
      <section className="w-full bg-[#f9faf9] py-10 mt-20 border-t border-gray-100">
        <h2 className="text-center text-xl font-semibold text-[#496a52] tracking-wide">
          باکس گل
        </h2>
      </section>

      <div
        dir="rtl"
        className="max-w-6xl mx-auto px-4 pb-16 pt-10 text-gray-800"
      >
        {/* بخش بالایی */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* عکس اصلی */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={images[activeIndex]}
                alt={flower.title || "flower"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* تصاویر کوچک */}
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                  className={`relative w-14 h-14 border rounded-md overflow-hidden transition-all duration-300 ${
                    index === activeIndex
                      ? "border-green-700"
                      : "border-gray-300 hover:border-green-600"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`thumbnail-${index}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* توضیحات */}
          <div className="flex flex-col justify-start text-right">
            <span className="text-xs text-gray-400 mb-2">
              کد محصول: {flower.id}
            </span>

            <h1 className="text-xl font-semibold mb-4">{flower.title}</h1>

            <div className="text-gray-600 text-sm leading-8 space-y-3 mb-8 max-w-[600px] mx-auto text-justify leading-relaxed">
              {Array.isArray(flower.desc) ? (
                flower.desc.map((d, i) =>
                  d.trim().startsWith("✔") ? (
                    <li
                      key={i}
                      className="list-none flex items-start gap-2 before:content-['✔'] before:text-green-600 before:ml-2"
                    >
                      {d.replace("✔", "")}
                    </li>
                  ) : (
                    <p key={i}>{d}</p>
                  )
                )
              ) : (
                <p>{flower.desc}</p>
              )}
            </div>

            {/* قیمت */}
            {flower.price && (
              <div className="mb-8">
                <span className="block text-sm text-gray-400 mb-1">قیمت</span>
                <span className="block text-md font-semibold text-green-700">
                  {formattedPrice} تومان
                </span>
              </div>
            )}

            {/* دکمه خرید */}
            <div className="flex items-center gap-3 mb-8">
              <input
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-gray-300 py-1.5 px-2 rounded-md text-center text-sm focus:border-green-600 outline-none"
              />
              <button
                onClick={handleAddToCart}
                className="py-2 px-6 bg-darkgreen text-white text-sm rounded-md hover:bg-firstgreen transition-colors"
              >
                خرید
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 text-blue-700 text-xs py-3 px-4 rounded-md leading-6">
              به دلیل فصلی بودن گل‌های طبیعی، ممکن است ترکیب نهایی تا ۳۰٪ متفاوت
              باشد.
            </div>
          </div>
        </div>

        {/* جداکننده با دایره توخالی */}
        <div className="relative my-16 flex items-center justify-center">
          <div className="flex-1 h-px bg-gray-200"></div>
          <div className="mx-4 w-5 h-5 border border-gray-400 rounded-full"></div>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* محصولات مشابه */}
        {similarFlowers.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-8 text-right">
              محصولات مشابه
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarFlowers.map((f) => (
                <FlowerCard key={f.id} flower={f as any} palette={palette} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
