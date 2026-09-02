"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isChromeHidden } from "@/lib/routes";
import type { SocialLink } from "@/lib/social";
import { SocialIcon } from "@/components/social-icon";
import type { FooterContent } from "@/lib/footer";

export function Footer({
  socials,
  content,
}: {
  socials: SocialLink[];
  content: FooterContent;
}) {
  const pathname = usePathname();
  if (isChromeHidden(pathname)) return null;

  const currentYear = new Date().getFullYear();
  const badgeParts = (content.badgeText ?? "")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10 px-4 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* SECCIÓN 1: LOGO Y BIO */}
          {/* Mobile: Centrado | Desktop: Izquierda */}
          <div className="md:col-span-5 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="/static/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-sm mx-auto md:mx-0 whitespace-pre-line">
              {content.bio}
            </p>
          </div>

          {/* SECCIÓN 2: LINKS (GENERAL Y MÁS) */}
          {/* Mobile: Usamos un sub-grid de 2 columnas para que no ocupen tanto espacio vertical */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-center md:text-left">
            {/* General */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg">General</h4>
              <ul className="space-y-3 text-neutral-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    Sobre mí
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-white transition-colors"
                  >
                    Proyectos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Más */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg">Más</h4>
              <ul className="space-y-3 text-neutral-400">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* SECCIÓN 3: FOTO CIRCULAR */}
          {/* Mobile: Centrado | Desktop: Alineado a la derecha */}
          <div className="md:col-span-3 flex justify-center md:justify-end items-start">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/10 transition-all duration-500 hover:scale-105 shadow-2xl">
              <Image
                src={content.photoUrl}
                alt="Gonzalo Isique"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR (COPYRIGHT & SOCIALS) */}
        {/* Mobile: Columna centrada | Desktop: Fila justificada */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6 md:gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} {content.copyrightText}
            </p>

            {badgeParts.length > 0 ? (
              <div className="hidden md:flex items-center gap-2 text-xs text-neutral-600 font-mono bg-neutral-900/50 px-3 py-1 rounded-full border border-white/5">
                {badgeParts.map((part, index) => (
                  <span key={part}>
                    {index > 0 ? (
                      <span className="text-neutral-700 mx-1">|</span>
                    ) : null}
                    {index === 0 ? `⚡ ${part}` : part}
                  </span>
                ))}
              </div>
            ) : null}
            {badgeParts.length > 0 ? (
              <div className="md:hidden flex items-center gap-2 text-[10px] text-neutral-600 font-mono bg-neutral-900/50 px-3 py-1 rounded-full border border-white/5 mt-2">
                {badgeParts.map((part, index) => (
                  <span key={part}>
                    {index > 0 ? (
                      <span className="text-neutral-700 mx-1">|</span>
                    ) : null}
                    {index === 0 ? `⚡ ${part}` : part}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex gap-6">
            {socials.map((social) => (
              <SocialLink
                key={social.id}
                href={social.href}
                icon={<SocialIcon name={social.icon} size={20} />}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-500 hover:text-white transition-colors hover:scale-110 transform duration-200 p-2"
    >
      {icon}
    </a>
  );
}
