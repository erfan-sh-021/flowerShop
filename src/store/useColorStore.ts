// store/useColorStore.ts
import { create } from "zustand";
import { PaletteId } from "@/types/colorPalette";

interface ColorState {
  currentPalette: PaletteId;
  setPalette: (palette: PaletteId) => void;
  initializePalette: () => void; // 👈 برای مقداردهی بعد از mount
}

const useColorStore = create<ColorState>((set) => ({
  currentPalette: 5, // 👈 مقدار پایدار اولیه (برای SSR)
  
  setPalette: (palette) => {
    set({ currentPalette: palette });
    if (typeof window !== "undefined") {
      localStorage.setItem("palette", String(palette));
    }
  },

  initializePalette: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("palette");
      if (saved) set({ currentPalette: Number(saved) as PaletteId });
    }
  },
}));

export default useColorStore;
