import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createUrl from "../createUrl";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain:
          process.env.NODE_ENV === "production" ? ".cogniba.com" : undefined,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },

      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = user !== null;

  const { pathname, hostname } = request.nextUrl;
  const isAppSubdomain = hostname === "app.cogniba.com";
  const fullPathname = isAppSubdomain
    ? `/app${pathname !== "/" ? pathname : ""}`
    : pathname;

  if (!isAuthenticated) {
    if (
      fullPathname.startsWith("/app") ||
      fullPathname.startsWith("/change-password")
    ) {
      const newUrl = createUrl("/sign-in");
      return NextResponse.redirect(newUrl);
    }
  } else if (isAuthenticated) {
    if (
      fullPathname === "/" ||
      fullPathname.startsWith("/sign-in") ||
      fullPathname.startsWith("/sign-up")
    ) {
      const newUrl = createUrl("/app");
      return NextResponse.redirect(newUrl);
    } else if (fullPathname === "/app") {
      const newUrl = createUrl("/app/play");
      return NextResponse.redirect(newUrl);
    }
  }

  return supabaseResponse;
}
