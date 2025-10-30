"use client";

import Link from "next/link";
import useColorStore from "@/store/useColorStore";
import { colorPalettes } from "@/utils/colorPlatte";
import { useEffect, useState } from "react";

export default function MoreArticlesButton() {
  const { currentPalette, initializePalette } = useColorStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // پالت ذخیره‌شده را از localStorage بخوان
    initializePalette();
    setMounted(true);
  }, [initializePalette]);

  if (!mounted) {
    return (
      <button className="px-6 py-2 rounded-md border transition-all font-medium text-gray-700 border-gray-300">
        مطالب بیشتر
      </button>
    );
  }

  const palette = colorPalettes[currentPalette];

  return (
    <Link href="/articles">
      <button
        className="px-6 py-2 rounded-md border transition-all font-medium"
        style={{
          color: palette.linkActive,
          borderColor: palette.linkActive,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = palette.linkHover + "20";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f5f5f5";
          e.currentTarget.style.color = palette.linkActive;
        }}
      >
        مطالب بیشتر
      </button>
    </Link>
  );
}
