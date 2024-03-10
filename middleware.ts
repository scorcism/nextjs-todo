import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/home")) {
    // check if auth token exists in cookie
    const cookieStore = cookies();
    const authToken = cookieStore.get("AUTH_TOKEN");
    if (!authToken?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    // check if auth token exists in cookie
    const cookieStore = cookies();
    const authToken = cookieStore.get("AUTH_TOKEN");
    if (authToken?.value) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  // else if (request.nextUrl.pathname.startsWith("/")) {
  //     return NextResponse.rewrite(new URL("/home", request.url));
  // }
}
