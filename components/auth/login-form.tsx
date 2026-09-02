"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, type AuthState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthState = { error: null };

const queryErrors: Record<string, string> = {
  unauthorized: "Este usuario no tiene acceso al panel.",
  missing_env: "Faltan las variables de Supabase en .env.local.",
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const queryError = queryErrors[searchParams.get("error") ?? ""] ?? null;
  const error = state.error ?? queryError;

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-11 rounded-full bg-white text-black hover:bg-neutral-200"
      >
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
