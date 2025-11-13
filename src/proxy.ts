import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    // 🔥 Forward cookies to backend (required!)
    const cookie = request.headers.get("cookie") ?? "";
    const response = await fetch("http://localhost:5000/me", {
      method: "GET",
      headers: {
        cookie, 
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/upload-notes/:path*",
  ],
};
