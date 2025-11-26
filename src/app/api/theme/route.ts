import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { palette } = await req.json();

  const res = NextResponse.json({ ok: true });
  res.cookies.set("palette", String(palette), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
