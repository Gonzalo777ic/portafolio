"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavGroups } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6" aria-label="Secciones del panel">
      {adminNavGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-white/10 font-medium text-white"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
