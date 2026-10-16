import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSuperAdminToken } from "src/lib/auth-token";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isSuperAdminPage = request.nextUrl.pathname.startsWith("/owner");

  if (!accessToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/companies", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (accessToken && isSuperAdminPage && !isSuperAdminToken(accessToken)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
