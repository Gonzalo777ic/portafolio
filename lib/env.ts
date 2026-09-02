/** Quita espacios y comillas accidentales (p. ej. al pegar en Vercel). */
export function stripEnv(value: string | undefined) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/^["'""''`]+|["'""''`]+$/g, "").trim() || undefined;
}

/** Normaliza DATABASE_URL para Prisma + pooler de Supabase. */
export function sanitizeDatabaseUrl(raw: string | undefined) {
  const url = stripEnv(raw);
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const isSupabasePooler = host.includes("pooler.supabase.com");
    if (isSupabasePooler && !parsed.searchParams.has("pgbouncer")) {
      parsed.searchParams.set("pgbouncer", "true");
    }
    if (isSupabasePooler && !parsed.searchParams.has("connection_limit")) {
      parsed.searchParams.set("connection_limit", "1");
    }
    if (!parsed.searchParams.has("sslmode")) {
      parsed.searchParams.set("sslmode", "require");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Aplica sanitización al arrancar el módulo (serverless / Prisma). */
export function applyDatabaseUrlEnv() {
  const sanitized = sanitizeDatabaseUrl(process.env.DATABASE_URL);
  if (sanitized) {
    process.env.DATABASE_URL = sanitized;
  }
  return sanitized;
}
