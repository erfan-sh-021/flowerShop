"use client";

import { useState } from "react";
import { Instagram, Send, Facebook, Youtube } from "lucide-react";

const sections = [
  {
    title: "لینک های مفید",
    items: [
      "بازار گل تهران",
      "بازار گل محلاتی",
      "بازار گل امام رضا",
      "ایمیل فروشی",
      "زیبار",
    ],
  },
  {
    title: "ماژول های کاربردی",
    items: [
      "سفارش تاج گل",
      "سفارش دسته گل",
      "سفارش سبد گل",
      "سفارش گل خانگی",
      "پرسه‌مدی مدالوا",
    ],
  },
  {
    title: "شبکه های اجتماعی",
    items: ["اینستاگرام", "تلگرام", "فیسبوک", "یوتیوب"],
  },
];

export default function MobileAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (title: string) => {
    setOpen(open === title ? null : title);
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* لوگو */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="images/FlowerLogo.png"
          alt="Flower Logo"
          className="w-40 h-30 mb-2"
        />
        <span className="text-2xl font-semibold italic text-white">flower</span>
      </div>

      {/* آکاردئون */}
      <div className="w-full">
        {sections.map((section) => (
          <div key={section.title} className="border-b border-gray-400 py-2">
            <button
              className="w-full flex justify-between items-center font-semibold"
              onClick={() => toggle(section.title)}
            >
              {section.title}
              <span>{open === section.title ? "−" : "+"}</span>
            </button>
            {open === section.title && (
              <ul className="mt-2 space-y-1 text-sm">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* آیکون‌ها */}
      <div className="flex gap-4 mt-6 text-gray-700">
        <Instagram className="w-6 h-6 cursor-pointer text-red-500" />
        <Send className="w-6 h-6 cursor-pointer text-blue-500" />
        <Facebook className="w-6 h-6 cursor-pointer text-blue-700" />
        <Youtube className="w-6 h-6 cursor-pointer text-red-600" />
      </div>
    </div>
  );
}
