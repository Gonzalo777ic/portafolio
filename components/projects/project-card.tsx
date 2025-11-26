"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { type Project } from "@/lib/projects-data";

// --- MODAL DE IMÁGENES (Sin cambios) ---
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project || !project.images || project.images.length === 0) return null;

  const images = project.images;
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-[110]">
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 w-full h-full bg-black group">
              <Image src={currentImage} alt="Project screen" fill className="object-contain" />
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20"><ChevronLeft /></button>
                  <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white/20"><ChevronRight /></button>
                </>
              )}
            </div>
            <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- CARD INTELIGENTE ---
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // 1. DETECCIÓN: ¿Tiene imágenes?
  const hasImages = project.images && project.images.length > 0;
  const thumbnail = hasImages ? project.images[0] : null;

  return (
    <>
      <motion.div
        className={`group relative rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden flex flex-col md:flex-row transition-all duration-300
          ${hasImages ? "hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer" : "cursor-default border-white/5"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // 2. LÓGICA: Solo abre modal si hay imágenes
        onClick={() => hasImages && setModalOpen(true)}
        whileHover={hasImages ? { y: -4 } : {}}
      >
        
        {/* SECCIÓN DE IMAGEN (Solo se renderiza si hasImages es true) */}
        {hasImages && (
          <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden bg-neutral-800 border-b md:border-b-0 md:border-r border-white/5">
            <Image
              src={thumbnail!}
              alt={`Preview of ${project.title}`}
              fill
              className={`object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
            />
            {/* Overlay "Ver Galería" */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
              <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center gap-2 shadow-xl">
                <ExternalLink size={16} /> Ver Galería
              </span>
            </div>
          </div>
        )}

        {/* SECCIÓN DE CONTENIDO */}
        {/* Si no hay imagen, ocupa el ancho completo (w-full). Si hay imagen, ocupa el resto (md:w-3/5) */}
        <div className={`p-6 md:p-8 flex flex-col justify-between ${hasImages ? "w-full md:w-3/5" : "w-full"}`}>
          
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-2xl font-bold text-white transition-colors ${hasImages ? "group-hover:text-blue-400" : ""}`}>
                {project.title}
              </h3>

              {/* Links a Github / Demo (Estos siempre se muestran si existen) */}
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10"
                    onClick={(e) => e.stopPropagation()}
                    title="Ver Código"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10"
                    onClick={(e) => e.stopPropagation()}
                    title="Ver Demo en Vivo"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-neutral-400 text-base leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MODAL (Renderizado Condicional) */}
      {hasImages && (
        <ProjectModal project={modalOpen ? project : null} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}