"use client";

import { Truck, Handshake, ThumbsUp, ReceiptText } from "lucide-react";
import { colorPalettes } from "@/utils/colorPlatte";
import useColorStore from "@/store/useColorStore";

export default function ServicesSection() {
  // ✅ گرفتن پالت فعال از Zustand
  const currentPalette = useColorStore((state) => state.currentPalette);
  const colors = colorPalettes[currentPalette];

  // ✅ حالا آیکون‌ها از colors.linkActive رنگ می‌گیرن
  const services = [
    {
      id: 1,
      icon: <ReceiptText className="w-12 h-12 mx-auto" style={{ color: colors.linkActive }} />,
      title: "پرداخت در محل برای تهران",
    },
    {
      id: 2,
      icon: <ThumbsUp className="w-12 h-12 mx-auto" style={{ color: colors.linkActive }} />,
      title: "شرایط فیزیکی سالم",
    },
    {
      id: 3,
      icon: <Handshake className="w-12 h-12 mx-auto" style={{ color: colors.linkActive }} />,
      title: "ارسال سریع",
    },
    {
      id: 4,
      icon: <Truck className="w-12 h-12 mx-auto" style={{ color: colors.linkActive }} />,
      title: "تضمین کیفیت",
    },
  ];

  return (
    <section className="bg-gray-50 pt-16 pb-24 mt-40">
      {/* عنوان بخش */}
      <h2
        className="text-center text-2xl md:text-3xl font-semibold mb-12"
        style={{ color: colors.title }}
      >
        خدماتی که ما ارائه می‌دهیم
      </h2>

      {/* کارت‌های خدمات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md transition-transform hover:scale-105 hover:shadow-xl cursor-pointer group"
          >
            {/* آیکون با subtle bounce */}
            <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-1">
              {service.icon}
            </div>

            {/* متن سرویس */}
            <p className="mt-2 text-sm md:text-base font-medium" style={{ color: colors.text }}>
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
