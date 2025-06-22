import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/settings") ||
    request.nextUrl.pathname.startsWith("/stars") ||
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/prompt")
  ) {
    try {
      // Get the session from the request
      const session = await getSession(request);

      // If no session, redirect to sign-in
      if (!session) {
        const signInUrl = new URL("/auth/sign-in", request.url);
        signInUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
      // If there's an error getting the session, redirect to sign-in
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
