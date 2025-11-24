"use client"

import { motion } from "framer-motion"
import { RotatingCube } from "./rotating-cube"

export function AboutSection() {
  return (
    <section className="w-full py-32 flex flex-col items-center justify-center overflow-hidden relative z-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* LADO IZQUIERDO: TEXTO */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2 block">
              Sobre Mí
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Explorador digital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                en 3 dimensiones
              </span>
            </h2>
          </motion.div>
          
          <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Me apasiona conectar puntos entre diseño, lógica y experiencia de usuario. 
            Tengo experiencia creando soluciones escalables y me encanta aprender nuevas tecnologías
            mientras construyo productos digitales memorables.
          </p>
          
          <div className="text-sm text-neutral-500 italic">
            (Haz click y arrastra el cubo para interactuar)
          </div>
        </div>

        {/* LADO DERECHO: EL CUBO */}
        <div className="lg:w-1/2 flex justify-center items-center min-h-[400px] relative z-20">
          {/* Efecto de luz detrás del cubo */}
          <div className="absolute w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <RotatingCube />
        </div>

      </div>
    </section>
  )
}