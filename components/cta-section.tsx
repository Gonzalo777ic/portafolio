"use client";

import { motion, type Variants } from "framer-motion"; // 1. Importamos el tipo Variants
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// 2. Tipamos explícitamente los objetos de animación
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
      delayChildren: 0.3   
    }
  }
};

export function CtaSection() {
  return (
    <section className="w-full relative h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
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

      {/* Agregamos px-4 y w-full para asegurar márgenes en móvil */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full text-center flex flex-col items-center justify-center h-full">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 relative w-20 h-20 md:w-32 md:h-32"
        >
          <Image 
            src="/static/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain drop-shadow-2xl" 
            priority
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-[90vw]" // Asegura que no se desborde el contenedor
        >
          {/* CAMBIO DE TAMAÑO DE TEXTO AQUÍ */}
          {/* De text-5xl pasamos a text-3xl en móvil, luego sube a 5xl, 7xl y 8xl progresivamente */}
          <motion.h2 
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight md:leading-[1.1] mb-10 break-words"
          >
            <motion.span variants={textVariants} className="block">
              DEL CONCEPTO A LA{" "}
            </motion.span>
            
            {/* break-words asegura que IMPLEMENTACIÓN baje si es necesario, 
                pero con text-3xl debería entrar bien */}
            <motion.span variants={textVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 break-words">
              IMPLEMENTACIÓN
            </motion.span>
            
            <motion.span variants={textVariants} className="block mt-2 md:mt-0">
              DE SISTEMAS <span className="italic font-serif font-light">COMPLETOS!</span>
            </motion.span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }} 
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 space-y-4 px-2"
        >
          <h3 className="text-lg md:text-2xl font-semibold text-white">
            Entendimiento de las necesidades del cliente
          </h3>
          <p className="text-neutral-400 max-w-xl mx-auto text-base md:text-lg">
            Priorizando aplicaciones usables y amigables que brindan
            experiencias de usuario fluidas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}