import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail, hasSupabaseEnv } from "@/lib/auth";
import { ADMIN_HOME_PATH } from "@/lib/admin-nav";
import { ADMIN_PATH, LOGIN_PATH } from "@/lib/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith(ADMIN_PATH);
  const isLoginRoute = path === LOGIN_PATH;

  if (!hasSupabaseEnv()) {
    if (isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = LOGIN_PATH;
      url.searchParams.set("error", "missing_env");
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && user && !isAdminEmail(user.email)) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && user && isAdminEmail(user.email)) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_HOME_PATH;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
