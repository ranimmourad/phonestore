// In-memory order store (resets on serverless cold start).
// For production replace with a DB (Vercel Postgres / KV / Supabase).
export type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    note?: string;
  };
  items: OrderItem[];
  total: number;
  status: "new" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __PSM6_ORDERS__: Order[] | undefined;
  // eslint-disable-next-line no-var
  var __PSM6_PRODUCTS__: any[] | undefined;
}

export const ordersStore: Order[] = globalThis.__PSM6_ORDERS__ ?? (globalThis.__PSM6_ORDERS__ = []);

export function addOrder(o: Omit<Order, "id" | "status" | "createdAt">): Order {
  const order: Order = {
    ...o,
    id: "PSM-" + Date.now().toString(36).toUpperCase(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  ordersStore.unshift(order);
  return order;
}
