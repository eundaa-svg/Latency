import { NextRequest, NextResponse } from "next/server";
import { reorderWorks } from "@/lib/db";
import { isValidSession, SESSION_COOKIE } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  if (!await isValidSession(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { ids } = await req.json();
  await reorderWorks(ids);
  return NextResponse.json({ ok: true });
}
