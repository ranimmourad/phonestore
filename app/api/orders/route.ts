import { NextRequest, NextResponse } from "next/server";
import { addOrder, ordersStore } from "@/lib/orders";

export async function GET() {
  return NextResponse.json({ orders: ordersStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.customer?.name || !body?.customer?.phone || !body?.customer?.address)
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    if (!Array.isArray(body.items) || body.items.length === 0)
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });

    const order = addOrder({
      customer: body.customer,
      items: body.items,
      total: Number(body.total) || 0,
    });
    return NextResponse.json({ ok: true, order });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erreur serveur" }, { status: 500 });
  }
}
