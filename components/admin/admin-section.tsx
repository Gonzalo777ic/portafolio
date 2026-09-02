import type { ReactNode } from "react";

export function AdminSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-neutral-400">{description}</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-neutral-950/60 p-6 md:p-8">
        {children}
      </div>
    </section>
  );
}
