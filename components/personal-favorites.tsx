"use client"

import { motion } from "framer-motion"
import { Mail, Copy, Check, Play } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { usePlayer } from "./player-context"

export function PersonalFavorites() {
  return (
    <section className="w-full py-32 px-4 relative z-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            MÁS SOBRE MÍ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Explora, experimenta <br/>
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              && di hola
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ToolsCard />
          <ContactCard />
          <SpotifyCustomCard />
        </div>
      </div>
    </section>
  )
}

// --- TARJETA DE HERRAMIENTAS (SETUP) ---
function ToolsCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Diseño unificado: bg-black, border sutil, centrado
      className="group relative p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all h-[350px] flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Iconos en fila centrada */}
        <div className="flex gap-3 mb-6 justify-center">
          <ToolIcon src="https://cdn.simpleicons.org/intellijidea/000000" alt="IntelliJ" />
          <ToolIcon src="https://cdn.simpleicons.org/postman/FF6C37" alt="Postman" />
          <ToolIcon src="https://cdn.simpleicons.org/figma/F24E1E" alt="Figma" />
        </div>
        
        <h3 className="text-neutral-500 text-xs font-bold mb-2 uppercase tracking-widest">SETUP</h3>
        <p className="text-xl font-bold text-white leading-tight max-w-[200px]">
          Algunas herramientas de uso frecuente
        </p>
      </div>
      
      {/* Decoración de fondo muy sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/30 pointer-events-none" />
    </motion.div>
  )
}

// --- TARJETA DE CONTACTO ---
function ContactCard() {
  const [copied, setCopied] = useState(false)
  const email = "gonzaloisique777@gmail.com"

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
      // Diseño unificado: bg-black, border sutil, centrado
      // Nota: Quitamos el gradiente violeta fuerte para que sea igual a las otras, 
      // pero dejamos un toquecito sutil en hover o detalle.
      className="group relative p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all h-[350px] flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl"
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 text-violet-400 group-hover:scale-110 transition-transform border border-violet-500/20">
          <Mail size={24} />
        </div>
        
        <h3 className="text-neutral-500 text-xs font-bold mb-2 uppercase tracking-widest">CONTACTO</h3>
        <p className="text-xl font-bold text-white leading-tight mb-6 max-w-[220px]">
          Mi email
        </p>
        
        <button 
          onClick={handleCopy}
          className="w-full max-w-[240px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium text-white group/btn active:scale-95"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="text-green-400">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={16} className="text-neutral-400 group-hover/btn:text-white transition-colors" />
              <span className="truncate">{email}</span>
            </>
          )}
        </button>
      </div>
      
      {/* Decoración violeta muy sutil en el fondo */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-violet-900/10 to-transparent pointer-events-none" />
    </motion.div>
  )
}

// --- TARJETA DE SPOTIFY (Ya estaba en estilo Dark, la mantenemos igual) ---
function SpotifyCustomCard() {
  const { setIsOpen } = usePlayer()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
      onClick={() => setIsOpen(true)}
      className="group relative p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all h-[350px] flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer shadow-2xl"
    >
      <div className="relative w-32 h-32 mb-6 group-hover:scale-105 transition-transform duration-500">
        <Image 
          src="static/seekae.jpeg" 
          alt="Album Art" 
          fill 
          className="object-cover rounded-lg shadow-2xl"
        />
        <div className="absolute inset-0 bg-white/20 blur-xl -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      </div>

      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1 px-4 w-full">
        The Sound Of Trees...
      </h3>
      <p className="text-neutral-500 text-sm mb-6">Seekae</p>

      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white">
        <Play size={14} fill="currentColor" />
        Reproducir en segundo plano
      </div>
    </motion.div>
  )
}

// Icono Helper (Fondo oscuro para integrar)
function ToolIcon({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center p-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300" title={alt}>
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  )
}