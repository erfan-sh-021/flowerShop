// components/ThemeUpdater.tsx
"use client";

import { useEffect } from "react";
import useColorStore from "@/store/useColorStore";
import { colorPalettes } from "@/utils/colorPlatte";

export default function ThemeUpdater() {
  const currentPalette = useColorStore((state) => state.currentPalette);

  useEffect(() => {
    const colors = colorPalettes[currentPalette];

    document.documentElement.style.setProperty("--bg-from", colors.bgFrom);
    document.documentElement.style.setProperty("--bg-to", colors.bgTo);
    document.documentElement.style.setProperty("--text-color", colors.text);
    document.documentElement.style.setProperty("--title-color", colors.title);
    document.documentElement.style.setProperty("--button-from", colors.buttonFrom);
  }, [currentPalette]);

  return null; // فقط رنگ‌ها رو ست می‌کنه
}
