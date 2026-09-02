import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader />
      <div className="flex">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-60 shrink-0 overflow-y-auto border-r border-white/10 px-3 py-8 lg:block">
          <AdminNav />
        </aside>
        <div className="min-w-0 flex-1 px-4 py-10 lg:px-10">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
