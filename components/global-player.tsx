"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Minimize2, Music, ExternalLink } from "lucide-react"
import { usePlayer } from "./player-context"
import { useState } from "react"

export function GlobalPlayer() {
  const { isOpen, setIsOpen } = usePlayer()
  const [isMinimized, setIsMinimized] = useState(false)

  // URL del álbum para abrir en la app nativa
  const spotifyUrl = "https://open.spotify.com/album/2jQaXpmaoRQDQLViaR41AR"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`fixed z-[100] transition-all duration-500 ease-in-out shadow-2xl overflow-hidden border border-white/10 bg-neutral-950
            ${isMinimized 
              ? "bottom-4 right-4 w-16 h-16 rounded-full cursor-pointer border-white/20" 
              : "bottom-4 right-4 w-[90vw] max-w-md h-[450px] rounded-2xl"
            }
          `}
        >
          {/* --- VISTA MINIMIZADA --- */}
          <div 
            onClick={() => setIsMinimized(false)}
            className={`absolute inset-0 w-full h-full bg-[#1DB954] flex items-center justify-center hover:scale-110 transition-transform z-20 cursor-pointer
              ${isMinimized ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
          >
            <Music className="text-black w-8 h-8 animate-pulse" />
          </div>

          {/* --- VISTA COMPLETA --- */}
          <div 
            className={`relative w-full h-full bg-neutral-900 transition-opacity duration-300 z-10 flex flex-col
              ${isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
            `}
          >
            
            {/* Barra superior de controles */}
            <div className="absolute top-3 right-3 z-50 flex gap-2">
              {/* Botón EXTRA: Abrir en Spotify (Útil para móviles) */}
              <a 
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-500/90 backdrop-blur-md rounded-full text-black hover:bg-green-400 transition-all border border-transparent shadow-lg"
                title="Abrir en App"
              >
                <ExternalLink size={16} />
              </a>

              <button 
                onClick={() => setIsMinimized(true)}
                className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all border border-white/10"
                title="Minimizar"
              >
                <Minimize2 size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white/70 hover:text-red-400 hover:bg-black/80 transition-all border border-white/10"
                title="Cerrar"
              >
                <X size={16} />
              </button>
            </div>

            {/* Iframe */}
            <iframe 
              style={{ borderRadius: "12px", backgroundColor: "#121212" }} 
              src="https://open.spotify.com/embed/album/2jQaXpmaoRQDQLViaR41AR?utm_source=generator&theme=0" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="w-full h-full flex-1"
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}