import { NextRequest, NextResponse } from "next/server";
import { ordersStore } from "@/lib/orders";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const order = ordersStore.find((o) => o.id === params.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (body.status) order.status = body.status;
  return NextResponse.json({ ok: true, order });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const idx = ordersStore.findIndex((o) => o.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  ordersStore.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
