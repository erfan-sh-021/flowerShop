import { create } from "zustand";

interface Item {
  id: string;
  title: string;
  desc: string;
  price?: number; // articles قیمت ندارند
  src: string;
}

interface Store {
  flowers: Item[];
  articles: Item[];
  totalFlowersCount: number;
  totalArticlesCount: number;
  loading: boolean;
  fetchFlowers: (page?: number, limit?: number) => Promise<void>;
  fetchArticles: (page?: number, limit?: number) => Promise<void>;
  addFlower: (flower: Item) => Promise<void>;
  addArticle: (article: Item) => Promise<void>;
  deleteFlower: (id: string) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  updateFlower: (flower: Item) => Promise<void>;
  updateArticle: (article: Item) => Promise<void>;
}

const useFlowerStore = create<Store>((set, get) => ({
  flowers: [],
  articles: [],
  totalFlowersCount: 0,
  totalArticlesCount: 0,
  loading: false,

  fetchFlowers: async (page = 1, limit = 6) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/data?type=flowers&page=${page}&limit=${limit}`);
      const result = await res.json();
      set({
        flowers: result?.data || [],
        totalFlowersCount: result?.totalCount || 0,
      });
    } catch (error) {
      console.error("Fetch flowers error:", error);
      set({ flowers: [], totalFlowersCount: 0 });
    } finally {
      set({ loading: false });
    }
  },

  fetchArticles: async (page = 1, limit = 6) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/data?type=articles&page=${page}&limit=${limit}`);
      const result = await res.json();
      set({
        articles: result?.data || [],
        totalArticlesCount: result?.totalCount || 0,
      });
    } catch (error) {
      console.error("Fetch articles error:", error);
      set({ articles: [], totalArticlesCount: 0 });
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

  addArticle: async (article) => {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      await get().fetchArticles();
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

  deleteArticle: async (id) => {
    try {
      await fetch(`/api/data?id=${id}`, { method: "DELETE" });
      await get().fetchArticles();
    } catch (error) {
      console.error(error);
    }
  },

  updateFlower: async (flower) => {
    try {
      await fetch(`/api/data?id=${flower.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flower),
      });
      await get().fetchFlowers();
    } catch (error) {
      console.error("Update flower error:", error);
    }
  },

  updateArticle: async (article) => {
    try {
      await fetch(`/api/data?id=${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      await get().fetchArticles();
    } catch (error) {
      console.error("Update article error:", error);
    }
  },
}));

export default useFlowerStore;
