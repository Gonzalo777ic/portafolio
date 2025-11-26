"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePlayer } from "./player-context";
import { spotifyAlbums } from "@/lib/spotify-data";

export function PersonalFavorites() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Detectar el tamaño de pantalla para mostrar 1 o 3 elementos
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(3); // PC y Tablet horizontal: 3 items
      } else {
        setItemsPerPage(1); // Móvil: 1 item
      }
    };

    handleResize(); // Ejecutar al inicio
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < spotifyAlbums.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="w-full py-32 px-4 relative z-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            SPOTIFY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Algunos álbumes
            <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              Spotify
            </span>
          </h2>
        </div>

        {/* Carrusel Contenedor */}
        <div className="relative group">
          
          {/* Botón Izquierda (Solo visible si no estamos al inicio) */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all -ml-4 md:-ml-12 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Botón Derecha (Solo visible si hay más items) */}
          {currentIndex < spotifyAlbums.length - itemsPerPage && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all -mr-4 md:-mr-12 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Ventana de visión (Overflow hidden) */}
          <div className="overflow-hidden w-full px-2">
            <motion.div
              className="flex"
              // La magia: movemos el contenedor en porcentaje basado en el índice
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {spotifyAlbums.map((album, index) => (
                <div
                  key={index}
                  // En móvil ocupa 100%, en escritorio 1/3 (33.33%)
                  className="min-w-full md:min-w-[33.333%] px-3 flex-shrink-0"
                >
                  <SpotifyCustomCard
                    albumUrl={album.albumUrl}
                    imageUrl={album.imageUrl}
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
    <motion.div
      // Eliminamos el viewport animation aquí para evitar bugs visuales al scrollear rápido el carrusel
      whileHover={{ y: -5 }}
      onClick={() =>
        playAlbum(albumUrl, {
          title,
          artist,
          image: imageUrl,
        })
      }
      className="group relative p-8 rounded-3xl bg-black border border-white/10 hover:border-white/20 transition-all h-[380px] flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer shadow-2xl"
    >
      <div className="relative w-36 h-36 mb-6 group-hover:scale-105 transition-transform duration-500">
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
      <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white group-hover:scale-105 transform duration-200 border border-white/5">
        <Play size={16} fill="currentColor" />
        Reproducir
      </div>
      
      {/* Gradiente decorativo sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-80" />
    </motion.div>
  );
}