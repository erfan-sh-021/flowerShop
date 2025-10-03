"use client";

import { useState } from "react";
import { Instagram, Send, Facebook, Youtube } from "lucide-react";
import { colorPalettes } from "@/utils/colorPlatte";

interface MobileAccordionProps {
  palette: 1 | 2 | 3 | 4 | 5;
}

export default function MobileAccordion({ palette }: MobileAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);
  const colors = colorPalettes[palette];

  const sections = [
    {
      title: "لینک های مفید",
      items: ["بازار گل تهران", "بازار گل محلاتی", "بازار گل امام رضا", "ایمیل فروشی", "زیبار"],
    },
    {
      title: "ماژول های کاربردی",
      items: ["سفارش تاج گل", "سفارش دسته گل", "سفارش سبد گل", "سفارش گل خانگی", "پرسه‌مدی مدالوا"],
    },
    {
      title: "شبکه های اجتماعی",
      items: ["اینستاگرام", "تلگرام", "فیسبوک", "یوتیوب"],
    },
  ];

  const toggle = (title: string) => setOpen(open === title ? null : title);

  return (
    <div className="flex flex-col items-center text-center">
      {/* لوگو */}
      <div className="flex flex-col items-center mb-6">
        <img src="/images/FlowerLogo.png" alt="Flower Logo" className="w-28 h-20 mb-2" />
        <span className="text-xl font-semibold italic" style={{ color: colors.title }}>
          flower
        </span>
      </div>

      {/* آکاردئون */}
      <div className="w-full">
        {sections.map((section) => (
          <div key={section.title} className="border-b py-3" style={{ borderColor: colors.text }}>
            <button
              className="w-full flex justify-between items-center font-medium"
              style={{ color: colors.title }}
              onClick={() => toggle(section.title)}
            >
              {section.title}
              <span>{open === section.title ? "−" : "+"}</span>
            </button>
            {open === section.title && (
              <ul className="mt-2 space-y-1 text-sm">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer transition hover:text-[color:var(--linkHover)]"
                    style={{ color: colors.text, "--linkHover": colors.linkHover } as React.CSSProperties}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* آیکون‌ها */}
      <div className="flex gap-4 mt-6">
        {[Instagram, Send, Facebook, Youtube].map((Icon, i) => (
          <a key={i} className="shadow rounded-full p-2 transition hover:scale-110" style={{ backgroundColor: colors.buttonFrom }}>
            <Icon className="w-5 h-5 text-white" />
          </a>
        ))}
      </div>
    </div>
  );
}
