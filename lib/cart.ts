"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  category: string;
};

type CartState = {
  items: CartItem[];
  add: (it: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (it, qty = 1) =>
        set((s) => {
          const existing = s.items.find((x) => x.id === it.id);
          if (existing) {
            return {
              items: s.items.map((x) =>
                x.id === it.id ? { ...x, qty: x.qty + qty } : x
              ),
            };
          }
          return { items: [...s.items, { ...it, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
      update: (id, qty) =>
        set((s) => ({
          items: s.items.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((a, b) => a + b.price * b.qty, 0),
      count: () => get().items.reduce((a, b) => a + b.qty, 0),
    }),
    { name: "psm6-cart" }
  )
);
