"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-neutral-300 hover:text-white lg:hidden"
          aria-label="Abrir secciones"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-white/10 bg-neutral-950 text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Secciones</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-2 pb-6">
          <AdminNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
