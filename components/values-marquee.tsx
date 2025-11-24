"use client"

import React from "react"
import { motion } from "framer-motion"

// VALORES TÉCNICOS Y CONCEPTUALES (Ciclo de Ingeniería)
const row1 = [
  "ABSTRACCIÓN", 
  "IMPLEMENTACIÓN", 
  "VISIÓN", 
  "EJECUCIÓN", 
  "ESTRATEGIA", 
  "CÓDIGO", 
  "DISEÑO", 
  "LÓGICA", 
  "GRANULARIDAD", 
  "MODULARIDAD", 
  "FLEXIBILIDAD"
]

// VALORES HUMANOS Y DE IDENTIDAD (El motor del ingeniero)
const row2 = [
  "IDENTIDAD",
  "RIGOR",
  "TRAZA",
  "CURIOSIDAD",
  "ITERACIÓN INTENCIONAL",
  "PRAXIS CONSCIENTE",
  "MULTIESCALAR",
  "DIRECCIÓN INTERNA",
  "TRANSFORMACIÓN"
]

export function ValuesMarquee() {
  return (
    <section className="w-full py-20 overflow-hidden bg-black relative z-10">
      
      {/* Fila 1: Mueve a la izquierda */}
      <div className="flex relative w-full mb-8 rotate-[-2deg] scale-110">
        <MarqueeRow items={row1} direction="left" speed={50} color="text-neutral-800" separatorColor="text-neutral-800" />
      </div>

      {/* Fila 2: Mueve a la derecha */}
      <div className="flex relative w-full rotate-[2deg] scale-110">
        <MarqueeRow items={row2} direction="right" speed={50} color="text-white" separatorColor="text-blue-500" />
      </div>

      {/* Overlay de gradiente para suavizar bordes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
    </section>
  )
}

function MarqueeRow({ 
  items, 
  direction, 
  speed, 
  color, 
  separatorColor 
}: { 
  items: string[], 
  direction: "left" | "right", 
  speed: number, 
  color: string, 
  separatorColor: string 
}) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div 
        className="flex gap-8 pr-8 items-center" // Ajustado gap para incluir separador
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ 
          duration: speed, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {/* Duplicamos la lista varias veces para asegurar el loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span 
              className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${color} select-none`}
            >
              {item}
            </span>
            {/* EL SEPARADOR (Estrella) */}
            <span className={`text-4xl md:text-5xl ${separatorColor} opacity-50`}>
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}