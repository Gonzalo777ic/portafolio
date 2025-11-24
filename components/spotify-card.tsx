"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Play, ExternalLink } from "lucide-react"
import { usePlayer } from "./player-context"

export function SpotifyCard() {
  const { setIsOpen } = usePlayer()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative w-full h-full min-h-[352px] bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col cursor-pointer"
      onClick={() => setIsOpen(true)} // <--- ESTO ACTIVA EL GLOBAL PLAYER
    >
      {/* FONDO VISUAL (Igual que antes) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.scdn.co/image/ab67616d0000b2739c32b32299a7472053b02523" 
          alt="Background blur"
          fill
          className="object-cover opacity-30 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* CONTENIDO INVITACIÓN */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
        
        {/* Carátula */}
        <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
          <Image 
            src="/static/seekae.jpeg" 
            alt="Album Art"
            fill
            className="object-cover"
          />
          {/* Overlay Play */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Play size={24} fill="black" className="text-black" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg">The Sound Of Trees...</h3>
          <p className="text-neutral-400 text-sm">Seekae</p>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/5 text-xs font-medium text-white group-hover:bg-white/20 transition-colors">
          <Play size={12} fill="currentColor" />
          Reproducir en segundo plano
        </span>

      </div>
    </motion.div>
  )
}