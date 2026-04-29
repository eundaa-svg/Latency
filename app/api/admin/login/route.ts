import { NextRequest, NextResponse } from "next/server";
import { deriveToken, SESSION_COOKIE, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await deriveToken(password);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path:     "/",
    maxAge:   COOKIE_MAX_AGE,
    secure:   process.env.NODE_ENV === "production",
  });
  return res;
}
