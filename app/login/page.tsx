import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950/70 p-8 backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-white mb-2">Panel</h1>
        <p className="text-sm text-neutral-400 mb-8">
          Acceso exclusivo del dueño del portafolio.
        </p>
        <Suspense fallback={<p className="text-neutral-400 text-sm">Cargando…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
