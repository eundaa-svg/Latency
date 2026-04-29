import { NextRequest, NextResponse } from "next/server";
import { createWork, getWorks } from "@/lib/db";
import { isValidSession, SESSION_COOKIE } from "@/lib/auth";

async function guard(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  return isValidSession(cookie);
}

export async function GET(req: NextRequest) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getWorks());
}

export async function POST(req: NextRequest) {
  if (!await guard(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const work = await createWork({
    title:       body.title,
    categoryId:  body.categoryId,
    description: body.description ?? "",
    role:        body.role        ?? "",
    year:        body.year        ?? "",
    tools:       body.tools       ?? [],
    link:        body.link,
    client:      body.client,
    thumbnail:   body.thumbnail,
    images:      body.images      ?? [],
    accentColor: body.accentColor ?? "#0051FF",
    videoUrl:    body.videoUrl,
    posterUrl:   body.posterUrl,
  });
  return NextResponse.json(work, { status: 201 });
}
