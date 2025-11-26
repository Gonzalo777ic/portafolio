"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
// 1. Importamos los datos y el tipo desde lib
import { projectsData, type Project } from "@/lib/projects-data";

export function CuratedWork() {
  // 2. Usamos projectsData importado
  const [activeProject, setActiveProject] = useState<Project>(projectsData[0]);

  return (
    <section className="w-full py-32 px-4 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            PROYECTOS
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Algunos{" "}
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              Proyectos
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          <div className="w-full lg:w-3/5 space-y-24">
            {/* 3. Mapeamos sobre projectsData */}
            {projectsData.map((project) => (
              <ProjectImageCard
                key={project.id}
                project={project}
                onInView={() => setActiveProject(project)}
              />
            ))}
          </div>

          <div className="hidden lg:block w-2/5 relative">
            <div className="sticky top-32 h-fit">
              <ProjectDetails activeProject={activeProject} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Añadimos el tipo Project explícito aquí para mejor control
function ProjectImageCard({
  project,
  onInView,
}: {
  project: Project;
  onInView: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

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
      className="group relative w-full aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1">
        {/* Next/Image optimizado */}
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 p-6 lg:hidden w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-neutral-300 line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
        <ArrowRight className="text-white w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}

function ProjectDetails({ activeProject }: { activeProject: Project }) {
  return (
    <div className="relative p-8 rounded-3xl border border-white/5 bg-neutral-900/50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-orange-500" />
            <h3 className="text-3xl font-bold text-white">
              {activeProject.title}
            </h3>
          </div>

          <p className="text-lg text-neutral-400 leading-relaxed">
            {activeProject.description}
          </p>

          <ul className="space-y-3">
            {activeProject.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-neutral-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-wrap gap-2">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-white/10 flex items-center gap-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-6">
            <a
              href={activeProject.demo || activeProject.github || "#"} // <--- CAMBIO: Usa demo o github si existen
              className="..."
              target="_blank"
              rel="noopener noreferrer"
            >
              View Case Study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
