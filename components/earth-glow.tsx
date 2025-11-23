"use client";
import React from "react";

export function EarthGlow() {
  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">

      {/* 1. GLOW PÚRPURA (Sin cambios, esto está bien) */}
      <div
        className="
          absolute 
          left-1/2 
          bottom-[2vh] md:bottom-[20vh]
          -translate-x-1/2
          w-[80vw] md:w-[1000px]
          h-[700px]
          z-50
        "
        style={{
          background: `radial-gradient(
            ellipse at 50% 100%, 
            rgba(130, 60, 255, 0.6) 0%,  
            rgba(100, 0, 200, 0.3) 30%, 
            transparent 70%
          )`,
          filter: "blur(60px)",
          opacity: 0.9
        }}
      />

      {/* 2. CURVATURA */}
      <div
        className="
          absolute 
          left-1/2 
          -translate-x-1/2 
          bottom-0
          translate-y-[97%] 
          w-[300%] sm:w-[400%]
          aspect-square
          rounded-full
          bg-transparent
          z-10
        "
        style={{
          // Sombra ambiental lejana (Halo azulado/blanco)
          boxShadow: `
            0 -25px 50px rgba(255, 255, 255, 0.3),
            0 0 100px rgba(120, 100, 255, 0.2)
          `,
        }}
      >
        {/* === AQUÍ ESTÁN LOS CAMBIOS PARA BRILLO Y FIX DE LÍNEA NEGRA === */}
        <div
          className="w-full h-full rounded-full"
          style={{
            /* 1. Usamos blanco puro hexadecimal */
            borderTop: "3px solid #ffffff", 
            
            /* 2. FIX DE BRILLO: Agregamos una sombra blanca sólida pegada a la línea 
               para que parezca neón incandescente */
            boxShadow: "0 0 20px 2px #ffffff, 0 0 10px 1px rgba(255,255,255,0.8)",

            /* 3. FIX DE LÍNEA NEGRA: Un desenfoque mínimo (0.5px) elimina 
               los artefactos de píxeles negros en curvas gigantes */
            filter: "blur(0.5px)",

            /* Máscara (Mantenemos tu configuración, funciona bien) */
            maskImage:
              "linear-gradient(to right, transparent 40%, black 50%, transparent 60%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 40%, black 50%, transparent 60%)",
          }}
        />
      </div>

    </div>
  );
}