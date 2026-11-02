import { NextResponse } from "next/server";

export function GET(request: Request) {
  const response = NextResponse.redirect(
    new URL("/auth/companies", request.url),
  );

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    sameSite: "lax",
  });

  return response;
}
