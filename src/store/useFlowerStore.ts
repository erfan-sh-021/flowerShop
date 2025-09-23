import { create } from "zustand";

interface Flower {
  id: string;
  title: string;
  desc: string;
  price: number;
  src: string;
}

interface FlowerStore {
  flowers: Flower[];
  totalCount: number;
  loading: boolean;
  fetchFlowers: (page?: number, limit?: number) => Promise<void>;
  addFlower: (flower: Flower) => Promise<void>;
  deleteFlower: (id: string) => Promise<void>;
  updateFlower: (flower: Flower) => Promise<void>; // 👈 اضافه شد
}

const useFlowerStore = create<FlowerStore>((set, get) => ({
  flowers: [],
  totalCount: 0,
  loading: false,

  fetchFlowers: async (page = 1, limit = 6) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/data?type=flowers&page=${page}&limit=${limit}`);
      const result = await res.json();

      if (result && Array.isArray(result.data)) {
        set({ flowers: result.data, totalCount: result.totalCount });
      } else {
        set({ flowers: [], totalCount: 0 });
      }
    } catch (error) {
      console.error("Fetch flowers error:", error);
      set({ flowers: [], totalCount: 0 });
    } finally {
      set({ loading: false });
    }
  },

  addFlower: async (flower) => {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flower),
      });
      await get().fetchFlowers();
    } catch (error) {
      console.error(error);
    }
  },

  deleteFlower: async (id) => {
    try {
      await fetch(`/api/data?id=${id}`, { method: "DELETE" });
      await get().fetchFlowers();
    } catch (error) {
      console.error(error);
    }
  },

  updateFlower: async (flower) => { // 👈 متد جدید
    try {
      await fetch(`/api/data?id=${flower.id}`, {
        method: "PUT", // یا PATCH اگه فقط بخوای بعضی فیلدها رو آپدیت کنی
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flower),
      });
      await get().fetchFlowers();
    } catch (error) {
      console.error("Update flower error:", error);
    }
  },
}));

export default useFlowerStore;
