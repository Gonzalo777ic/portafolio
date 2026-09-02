import { stripEnv } from "@/lib/env";

export function isAdminEmail(email: string | undefined | null) {
  const admin = stripEnv(process.env.ADMIN_EMAIL)?.toLowerCase();
  if (!admin || !email) return false;
  return email.trim().toLowerCase() === admin;
}

export function hasSupabaseEnv() {
  return Boolean(
    stripEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      stripEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}
