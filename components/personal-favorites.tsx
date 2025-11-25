"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { usePlayer } from "./player-context";

export function PersonalFavorites() {
  return (
    <section className="w-full py-32 px-4 relative z-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            SPOTIFY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Álbumes de spotify<br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              Spotify
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ÁLBUM: Chick Corea - Light Years */}
          <SpotifyCustomCard
            albumUrl="https://open.spotify.com/embed/album/6LhTsVh7o6NUHyecScBJ14"
            imageUrl="static/corea.jpeg"
            title="Light Years"
            artist="Chick Corea Elektric Band"
          />

          {/* ÁLBUM: Seekae */}
          <SpotifyCustomCard
            albumUrl="https://open.spotify.com/embed/album/2jQaXpmaoRQDQLViaR41AR"
            imageUrl="static/seekae.jpeg"
            title="The Sound Of Trees Falling on People"
            artist="Seekae"
          />

          {/* ÁLBUM: Caravan - Cunning Stunts */}
          <SpotifyCustomCard
            albumUrl="https://open.spotify.com/embed/album/3JUX7aD27mjSoOLS1vZMpc"
            imageUrl="static/caravan.jpeg"
            title="Cunning Stunts"
            artist="Caravan"
          />
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => playAlbum(albumUrl)} 
      className="group relative p-8 rounded-3xl bg-black border border-white/10 hover:border-white/20 transition-all h-[350px] flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer shadow-2xl"
    >
      {/* Imagen del Álbum */}
      <div className="relative w-32 h-32 mb-6 group-hover:scale-105 transition-transform duration-500">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-lg shadow-2xl border border-white/5"
        />
        <div className="absolute inset-0 bg-white/20 blur-xl -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1 px-4 w-full">
        {title}
      </h3>
      <p className="text-neutral-500 text-sm mb-6 line-clamp-1 px-2">
        {artist}
      </p>

      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white group-hover:scale-105 transform duration-200 border border-white/5">
        <Play size={14} fill="currentColor" />
        Reproducir
      </div>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/30 pointer-events-none" />
    </motion.div>
  );
}
