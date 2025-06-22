import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

const PROTECTED_PATHS = [
  "/admin",
  "/settings",
  "/stars",
  "/dashboard",
  "/prompt",
  "/community",
];

export async function middleware(request: NextRequest) {
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    try {
      const session = await getSession(request);

      if (!session) {
        const signInUrl = new URL("/auth/sign-in", request.url);
        signInUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
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
