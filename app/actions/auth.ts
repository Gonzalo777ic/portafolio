"use server";

import { redirect } from "next/navigation";
import { isAdminEmail, hasSupabaseEnv } from "@/lib/auth";
import { ADMIN_HOME_PATH } from "@/lib/admin-nav";
import { LOGIN_PATH } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error: string | null };

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  if (!hasSupabaseEnv()) {
    return { error: "Faltan las variables de Supabase en .env.local." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "No se pudo iniciar sesión. Revisa tus credenciales." };
  }

  if (!isAdminEmail(email)) {
    await supabase.auth.signOut();
    return { error: "Este usuario no tiene acceso al panel." };
  }

  redirect(ADMIN_HOME_PATH);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(LOGIN_PATH);
}
