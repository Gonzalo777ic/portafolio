"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Acerca de" },
    { href: "/projects", label: "Proyectos" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center px-4">
        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/60 p-2 shadow-xl backdrop-blur-md supports-[backdrop-filter]:bg-neutral-950/60">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-white bg-white/10"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                )}
              </Link>
            );
          })}

          <div className="mx-2 h-4 w-px bg-white/10" />

          <Button
            asChild
            variant="secondary"
            size="sm"
            className="rounded-full bg-neutral-800 text-white hover:bg-neutral-700 border border-white/5 shadow-inner"
          >
            <a
              href={`mailto:${siteConfig.links.email}`}
              onClick={() => setIsOpen(false)}
            >
              Enviar gmail
            </a>
          </Button>
        </nav>
      </header>

      <div className="md:hidden fixed top-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-neutral-950/60 border-white/10 text-white backdrop-blur-md hover:bg-neutral-800 h-12 w-12 shadow-lg"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[70%] sm:w-[350px] bg-neutral-950 border-l border-neutral-800 text-white p-0 [&>button]:hidden"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Navigation</SheetDescription>

            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6">
                <span className="text-xl font-bold tracking-tight">
                  Portfolio
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full text-white hover:bg-neutral-800 h-10 w-10"
                >
                  ✕
                </Button>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-8">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-2xl sm:text-3xl font-light transition-all duration-300 hover:scale-105",
                        isActive
                          ? "text-blue-500 font-semibold"
                          : "text-neutral-400 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 pb-12">
                <Button
                  asChild
                  className="w-full rounded-full bg-white text-black hover:bg-neutral-200 h-10 text-base font-medium"
                >
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Enviar gmail
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
