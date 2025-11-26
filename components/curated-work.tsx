"use client";

import { useState } from "react";
import Link from "next/link"; // <--- Importamos Link
import { ArrowRight } from "lucide-react"; // <--- Importamos el icono
import { projectsData, type Project } from "@/lib/projects-data";
import { ProjectImageCard } from "./project-image-card";
import { ProjectDetails } from "./project-details";

export function CuratedWork() {
  // 1. Filtrado
  const featuredProjects = projectsData.filter((p) => p.featured);

  // 2. Estado
  const [activeProject, setActiveProject] = useState<Project>(
    featuredProjects[0] || projectsData[0]
  );

  if (featuredProjects.length === 0) return null;

  return (
    <section className="w-full py-32 px-4 relative z-20 bg-black/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            PORTFOLIO
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Algunos{" "}
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#9B53F9] via-[#F2389F] to-[#58A0FF]">
              Proyectos
            </span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* Columna Izquierda: Scroll de Imágenes */}
          <div className="w-full lg:w-3/5 space-y-24">
            {featuredProjects.map((project) => (
              <ProjectImageCard
                key={project.id}
                project={project}
                onInView={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* Columna Derecha: Sticky Details */}
          <div className="hidden lg:block w-2/5 relative">
            <div className="sticky top-32 h-fit">
              <ProjectDetails activeProject={activeProject} />
            </div>
          </div>
        </div>

        {/* --- NUEVO BOTÓN VER TODOS --- */}
        <div className="flex justify-center mt-24">
          <Link 
            href="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#F2389F]/50 transition-all duration-300"
          >
            <span className="text-lg font-medium text-white group-hover:text-[#F2389F] transition-colors">
              Ver todos los proyectos
            </span>
            
            <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-[#F2389F] transition-colors duration-300">
              <ArrowRight className="w-4 h-4 text-white group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}