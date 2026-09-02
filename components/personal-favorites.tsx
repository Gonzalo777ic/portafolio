"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { usePlayer } from "@/components/player-context";
import { albumCoverSrc, type Album } from "@/lib/album";

export function PersonalFavorites({ albums }: { albums: Album[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (albums.length === 0) return null;

  const maxIndex = Math.max(0, albums.length - itemsPerPage);
  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative z-20 w-full bg-neutral-950 py-28 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center md:mb-16">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Spotify
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Algunos álbumes
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400 md:text-base">
            Pulsa reproducir o usa el botón verde de la esquina para abrir el
            player.
          </p>
          <span className="mt-4 inline-block bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 bg-clip-text font-serif text-3xl italic text-transparent md:text-4xl">
            Spotify
          </span>
        </div>

        <div className="relative">
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Anterior"
              className="absolute left-0 top-1/2 z-30 -ml-2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-3 text-white backdrop-blur-md transition hover:scale-105 hover:border-white/25 hover:bg-black/90 md:-ml-12"
            >
              <ChevronLeft size={22} />
            </button>
          ) : null}

          {currentIndex < maxIndex ? (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente"
              className="absolute right-0 top-1/2 z-30 -mr-2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-3 text-white backdrop-blur-md transition hover:scale-105 hover:border-white/25 hover:bg-black/90 md:-mr-12"
            >
              <ChevronRight size={22} />
            </button>
          ) : null}

          <div className="w-full overflow-hidden px-1">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="min-w-full flex-shrink-0 px-2.5 md:min-w-[33.333%]"
                >
                  <SpotifyCustomCard
                    albumUrl={album.albumUrl}
                    imageUrl={albumCoverSrc(album.imageUrl)}
                    title={album.title}
                    artist={album.artist}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotifyCustomCard({
  albumUrl,
  imageUrl,
  title,
  artist,
}: {
  albumUrl: string;
  imageUrl: string;
  title: string;
  artist: string;
}) {
  const { playAlbum } = usePlayer();

  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      onClick={() =>
        playAlbum(albumUrl, {
          title,
          artist,
          image: imageUrl,
        })
      }
      className="group relative flex h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-black px-6 py-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition hover:border-emerald-400/30"
    >
      <div className="relative mb-6 h-40 w-40">
        <div className="absolute -inset-3 rounded-2xl bg-[#1DB954]/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-xl object-cover shadow-2xl ring-1 ring-white/10 transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="mb-1 w-full px-2 text-lg font-semibold tracking-tight text-white line-clamp-1">
        {title}
      </h3>
      <p className="mb-7 w-full px-2 text-sm text-neutral-400 line-clamp-1">
        {artist}
      </p>

      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-[#1DB954]/15 px-6 py-2.5 text-sm font-medium text-emerald-100 transition group-hover:border-emerald-300/40 group-hover:bg-[#1DB954]/25 group-hover:text-white">
        <Play size={15} fill="currentColor" />
        Reproducir
      </span>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
    </motion.button>
  );
}
