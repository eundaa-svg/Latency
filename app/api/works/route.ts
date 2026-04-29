import { NextResponse } from "next/server";
import { getWorks } from "@/lib/db";

export async function GET() {
  const works = await getWorks();
  return NextResponse.json(works);
}
