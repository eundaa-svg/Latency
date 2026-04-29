import { NextRequest, NextResponse } from "next/server";
import { updateCategory, deleteCategory, reorderCategories } from "@/lib/db";
import { isValidSession, SESSION_COOKIE } from "@/lib/auth";

async function guard(req: NextRequest) {
  return isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body    = await req.json();
  const updated = await updateCategory(params.id, { name: body.name, order: body.order });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await deleteCategory(params.id);
  return NextResponse.json(result);
}
