import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "phonestore2074";

export async function POST(req: NextRequest) {
  const { user, pass } = await req.json();
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("psm6_admin", "1", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("psm6_admin");
  return res;
}
