import { isAdminEmail, hasSupabaseEnv } from "@/lib/auth";
import { hasDatabase } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!hasSupabaseEnv()) {
    return {
      error: "Faltan las variables de Supabase en las variables de entorno.",
      ok: false as const,
    };
  }

  if (!hasDatabase()) {
    return {
      error: "Falta DATABASE_URL en las variables de entorno (Prisma → Postgres).",
      ok: false as const,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return { error: "No autorizado.", ok: false as const };
  }

  return { error: null, ok: true as const };
}
