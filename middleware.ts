import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isValidSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Disable admin entirely when ADMIN_ENABLED != "true"
  if (process.env.ADMIN_ENABLED !== "true") {
    return new NextResponse(null, { status: 404 });
  }

  // Login page is always accessible
  if (pathname === "/admin/login") return NextResponse.next();

  // All other /admin/* routes require a valid session
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const valid  = await isValidSession(cookie);
  if (!valid) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
