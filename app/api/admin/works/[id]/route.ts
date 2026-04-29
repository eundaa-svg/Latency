import { NextRequest, NextResponse } from "next/server";
import { getWorkById, updateWork, deleteWork } from "@/lib/db";
import { isValidSession, SESSION_COOKIE } from "@/lib/auth";

async function guard(req: NextRequest) {
  return isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const work = await getWorkById(params.id);
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(work);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body    = await req.json();
  const updated = await updateWork(params.id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const deleted = await deleteWork(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
