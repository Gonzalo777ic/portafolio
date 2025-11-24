"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Variantes para la animación del texto
const textVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, // Empieza invisible, abajo y borroso
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", // Termina nítido y en su lugar
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

// Contenedor para orquestar la aparición secuencial
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Cada hijo aparece 0.2s después del anterior
      delayChildren: 0.3    // Espera un poco antes de empezar
    }
  }
};

export function CtaSection() {
  return (
    <section className="w-full relative h-[110vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/static/bw.jpg"
          alt="Background texture"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      {/* 2. CONTENIDO CENTRAL */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12 relative w-24 h-24 md:w-32 md:h-32"
        >
          <Image 
            src="/static/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain drop-shadow-2xl" 
            priority
          />
        </motion.div>

        {/* TITULAR ANIMADO ELEGANTE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Se activa un poco antes de llegar al centro
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-10"
          >
            <motion.span variants={textVariants} className="block">
              DEL CONCEPTO A LA{" "}
            </motion.span>
            
            <motion.span variants={textVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
              IMPLEMENTACIÓN
            </motion.span>
            
            <motion.span variants={textVariants} className="block">
              DE SISTEMAS <span className="italic font-serif font-light">COMPLETOS!</span>
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* BOTÓN CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }} // Aparece al final de todo
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg font-medium text-white">Contacto</span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
          </Link>
        </motion.div>

        {/* TEXTO INFERIOR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 space-y-4"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            Entendimiento de las necesidades del cliente y del usuario final
          </h3>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Priorizando aplicaciones usables y amigables que brindan
            experiencias de usuario fluidas y memorables.
          </p>
        </motion.div>
      </div>

    </section>
  );
}