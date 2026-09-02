import { PrismaClient } from "@prisma/client";
import { applyDatabaseUrlEnv } from "@/lib/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

applyDatabaseUrlEnv();

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;

export function formatPrismaError(error: unknown) {
  if (!error || typeof error !== "object") {
    return "Error desconocido de base de datos.";
  }

  const err = error as {
    code?: string;
    message?: string;
    meta?: { table?: string; column?: string; target?: string };
  };

  if (err.code === "P2021") {
    return "Falta la tabla en la BD. Corre `pnpm db:push` con la misma DATABASE_URL.";
  }
  if (err.code === "P1001" || err.code === "P1000") {
    return "No se pudo conectar a Postgres. Revisa DATABASE_URL (pooler + ?pgbouncer=true).";
  }
  if (err.code === "P2034" || /prepared statement/i.test(err.message ?? "")) {
    return "Conflicto con PgBouncer. Usa el pooler de Supabase con ?pgbouncer=true.";
  }
  if (err.code === "P2002") {
    return "Ya existe un registro con ese valor único.";
  }
  if (/must start with the protocol/i.test(err.message ?? "")) {
    return "DATABASE_URL inválida: debe empezar por postgresql:// (sin comillas en el valor).";
  }

  return err.message ?? "Error de Prisma.";
}

// Re-export para tests o scripts
export { sanitizeDatabaseUrl } from "@/lib/env";
