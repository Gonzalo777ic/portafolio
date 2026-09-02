import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-2">
          <AdminMobileNav />
          <p className="text-sm font-medium text-white">Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="text-neutral-300 hover:text-white"
          >
            <Link href="/">Ver sitio</Link>
          </Button>
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              Salir
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
