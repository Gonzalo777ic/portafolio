"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { type Project } from "@/lib/projects-data";

interface ProjectImageCardProps {
  project: Project;
  onInView: () => void;
}

export function ProjectImageCard({ project, onInView }: ProjectImageCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative w-full aspect-[5/4] rounded-[2.5rem] bg-neutral-900/50 border border-white/5 p-6 md:p-8 cursor-pointer transition-all duration-500 hover:bg-neutral-900/80 overflow-hidden"
    >
      {/* ANIMACIÓN: Línea de Foco Superior */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#9B53F9] via-[#F2389F] to-[#58A0FF] z-30"
        initial={{ width: "0%" }}
        animate={{ width: isInView ? "100%" : "0%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* GLOW TRASERO EXTERNO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-t from-transparent via-[#F2389F]/20 to-[#9B53F9]/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* PANTALLA INTERNA */}
      <div className="relative h-full w-full z-10 bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 flex flex-col">
        
        {/* Barra de Título */}
        <div className="h-8 bg-neutral-900 border-b border-white/5 flex items-center px-4 gap-2 flex-shrink-0 z-20">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>

        {/* Contenedor de la Imagen + Glow Interno */}
        {/* Usamos flex y items-center para centrar verticalmente el contenido */}
        <div className="relative w-full flex-grow overflow-hidden flex items-center justify-center">
          
          {/* NUEVO: Glow Interno para el espacio sobrante */}
          {/* Este gradiente se ve en los bordes si la imagen no llena el espacio */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#9B53F9]/10 via-transparent to-[#F2389F]/10 z-0" />

          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 z-10">
            {project.images && project.images.length > 0 ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                // CAMBIO 1: object-center para centrar vertical y horizontalmente
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">
                No Image
              </div>
            )}
            
            {/* Gradiente para móvil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity lg:hidden" />
          </div>

          {/* Info móvil */}
          <div className="absolute bottom-0 left-0 p-6 lg:hidden w-full z-30">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-1 rounded-md bg-white/10 text-white/80 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}