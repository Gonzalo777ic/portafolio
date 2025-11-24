"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollSpinner } from "./spinner-background";
import { skillsData } from "./skills-data";

export function HomeSkills() {
  const containerRef = useRef<HTMLElement>(null);

  // Configuración de scroll y rotación
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const rotate = useSpring(rawRotate, {
    stiffness: 60,
    damping: 20,
    mass: 0.3,
  });

  // Estado para controlar qué categorías están expandidas
  // Guardamos un objeto con booleans: { Frontend: true, Backend: false ... }
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Límite de items a mostrar inicialmente
  // Desktop: 11, Móvil: 6
  // (Nota: Esto se controla visualmente en el renderizado, aquí ponemos un valor base)
  const INITIAL_LIMIT_DESKTOP = 11;
  const INITIAL_LIMIT_MOBILE = 6;

  return (
    <section
      ref={containerRef}
      className="w-full py-32 px-4 relative z-10 overflow-hidden mt-0"
    >
      <div className="max-w-7xl mx-auto relative">
        {" "}
        {/* Aumenté max-w para dar aire */}
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-24 relative flex flex-col items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-90 pointer-events-none">
            <ScrollSpinner />
          </div>

          <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-neutral-400 uppercase mb-4 drop-shadow-md">
            MI STACK
          </span>

          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight flex flex-col md:flex-row items-center gap-2 md:gap-4 drop-shadow-lg">
            <span>Algunas</span>
            <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 brightness-125">
              Tecnologías
            </span>
          </h2>
        </div>
        {/* GRID DE SKILLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {Object.entries(skillsData).map(([category, data], index) => {
            const isExpanded = expandedCategories[category];
            const items = data.techs;

            // Lógica de corte:
            // En CSS usaremos clases 'hidden md:flex' para controlar la visibilidad
            // de los items extra, o lo hacemos por JS para simplicidad.
            // JS es más seguro para la animación de altura.

            // Definimos el límite dinámico (para simplificar, usamos un valor base y luego CSS media queries si fuera necesario,
            // pero aquí usaremos un límite por defecto y dejaremos que el usuario expanda).
            const limit = isExpanded ? items.length : 8; // Muestro 8 por defecto para que se vea ordenado en ambas vistas
            const visibleItems = items.slice(0, limit);
            const hasMore = items.length > 8;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="space-y-4 bg-neutral-900/40 rounded-2xl p-4 border border-white/5 backdrop-blur-sm"
              >
                {/* TÍTULO DE CATEGORÍA */}
                <div className="flex items-center gap-3 mb-2 px-1">
                  <div className="p-2 rounded-lg bg-white/10 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    {data.icon}
                  </div>
                  <h3 className="font-bold text-xl text-white drop-shadow-md tracking-wide">
                    {category}
                  </h3>
                </div>

                {/* LISTA DE ITEMS */}
                <div className="flex flex-col gap-3 relative">
                  <AnimatePresence initial={false}>
                    {visibleItems.map((tech) => (
                      <motion.div
                        layout
                        key={tech.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1],
                          layout: { duration: 0.35 },
                        }}
                        className="
                            flex items-center gap-3 px-4 py-3 rounded-xl
                            /* FONDO: Más claro por defecto para legibilidad */
                            bg-neutral-800/80 border border-white/10
                            /* HOVER: Se ilumina más */
                            hover:bg-neutral-700 hover:border-white/30
                            transition-all duration-200 group cursor-default
                            shadow-sm relative z-20
                            "
                      >
                        <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain filter drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" // Brillo en el icono siempre
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        {/* TEXTO SIEMPRE BLANCO BRILLANTE */}
                        <span className="text-sm font-semibold text-gray-100 group-hover:text-white tracking-wide">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* BOTÓN DE "VER MÁS" / "VER MENOS" */}
                {hasMore && (
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        Menos <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        Ver {items.length - 8} más <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
