import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAuth } from "./lib/isAuth";

export interface CustomRequest extends NextRequest {
  user?: any;
}

export async function middleware(request: CustomRequest) {
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
  } else if (request.nextUrl.pathname.startsWith("/api/todo")) {
    const cookieStore = cookies();
    const authToken = cookieStore.get("AUTH_TOKEN");

    // validate and get the id from the token
    try {
      const validationResult = await isAuth(authToken?.value);
      if (!validationResult.success) {
        throw "Validation error";
      }
      NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
