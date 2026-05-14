import { NextRequest, NextResponse } from "next/server";
import { products as base } from "@/data/products";

declare global {
  // eslint-disable-next-line no-var
  var __PSM6_PRODUCTS_OVERRIDE__: any[] | undefined;
}
const store: any[] = globalThis.__PSM6_PRODUCTS_OVERRIDE__ ?? (globalThis.__PSM6_PRODUCTS_OVERRIDE__ = [...base]);

export async function GET() {
  return NextResponse.json({ products: store });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.name || !body?.price || !body?.category)
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  const p = {
    id: body.id || "p-" + Date.now().toString(36),
    name: body.name,
    price: Number(body.price),
    oldPrice: body.oldPrice ? Number(body.oldPrice) : undefined,
    category: body.category,
    image: body.image || "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
    description: body.description || "",
    stock: Number(body.stock) || 0,
    rating: 5,
    featured: !!body.featured,
    badge: body.badge,
  };
  store.unshift(p);
  return NextResponse.json({ ok: true, product: p });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const idx = store.findIndex((p) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  store[idx] = { ...store[idx], ...body };
  return NextResponse.json({ ok: true, product: store[idx] });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const idx = store.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  store.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
