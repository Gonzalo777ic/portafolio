"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Minimize2, Music, X } from "lucide-react";
import { isChromeHidden } from "@/lib/routes";
import { usePlayer } from "@/components/player-context";

const DEFAULT_EMBED =
  "https://open.spotify.com/embed/album/2jQaXpmaoRQDQLViaR41AR";

function toEmbed(url: string) {
  if (url.includes("/embed/")) return url;
  return url.replace("open.spotify.com/", "open.spotify.com/embed/");
}

export function GlobalPlayer() {
  const pathname = usePathname();
  const { isOpen, setIsOpen, currentUrl, currentMeta } = usePlayer();
  const [isMinimized, setIsMinimized] = useState(true);

  const hidden = isChromeHidden(pathname);
  const activeUrl = currentUrl || DEFAULT_EMBED;
  const embedUrl = toEmbed(activeUrl);
  const openSpotifyUrl = activeUrl.replace("/embed", "");

  useEffect(() => {
    if (isOpen && currentUrl) setIsMinimized(false);
  }, [currentUrl, isOpen]);

  if (hidden) return null;

  const openExpanded = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const showFab = !isOpen || isMinimized;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] md:bottom-6 md:right-6">
      <AnimatePresence mode="wait">
        {showFab ? (
          <motion.button
            key="fab"
            type="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            onClick={openExpanded}
            aria-label="Abrir reproductor de Spotify"
            className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-emerald-400/30 bg-[#1DB954] text-black shadow-[0_12px_40px_rgba(29,185,84,0.35)] transition hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
          >
            {currentMeta?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentMeta.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
              />
            ) : null}
            <span className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <Music className="relative z-10 h-6 w-6 drop-shadow" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow" />
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ y: 48, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="pointer-events-auto flex h-[min(70vh,460px)] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-2xl border border-white/12 bg-neutral-950/95 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1DB954]/15 text-[#1DB954]">
                  <Music className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {currentMeta?.title ?? "Spotify"}
                  </p>
                  <p className="truncate text-xs text-neutral-400">
                    {currentMeta?.artist ?? "Elige un álbum abajo"}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href={openSpotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  title="Abrir en Spotify"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="rounded-full p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Minimizar"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(true);
                  }}
                  className="rounded-full p-2 text-neutral-300 transition hover:bg-white/10 hover:text-red-300"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <iframe
              key={embedUrl}
              title="Spotify player"
              src={`${embedUrl}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="min-h-0 flex-1 bg-[#121212]"
            />

            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="flex items-center justify-center gap-2 border-t border-white/10 py-2 text-xs text-neutral-400 transition hover:bg-white/5 hover:text-white md:hidden"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              Colapsar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
