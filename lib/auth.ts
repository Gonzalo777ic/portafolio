export function isAdminEmail(email: string | undefined | null) {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!admin || !email) return false;
  return email.trim().toLowerCase() === admin;
}

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
