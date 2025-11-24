"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

// --- DATOS DE PROYECTOS (MOCK) ---
// Reemplaza con tus datos reales
const projects = [
  {
    id: "runeai",
    title: "RuneAI",
    description: "RuneAI is a revolutionary AI-powered educational platform that transforms learning through personalized experiences. It features 24/7 intelligent tutoring, adaptive practice tests, and performance analytics.",
    features: [
      "AI-powered personalized learning",
      "Adaptive practice tests & analytics",
      "Collaborative learning hub"
    ],
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "OpenAI", "Appwrite"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Dashboard dark
    link: "#"
  },
  {
    id: "finance-dashboard",
    title: "FinTrack Pro",
    description: "A comprehensive financial dashboard for tracking investments, expenses, and savings goals in real-time. Includes data visualization with interactive charts and secure bank integration.",
    features: [
      "Real-time market data integration",
      "Interactive portfolio visualization",
      "Secure banking API connections"
    ],
    tags: ["Vue.js", "D3.js", "Firebase", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Charts dashboard
    link: "#"
  },
  {
    id: "eco-commerce",
    title: "EcoMarket",
    description: "Sustainable e-commerce marketplace connecting eco-conscious buyers with ethical brands. Features carbon footprint tracking per order and blockchain-verified supply chain transparency.",
    features: [
      "Carbon footprint calculator",
      "Blockchain supply chain verification",
      "Ethical brand vetting system"
    ],
    tags: ["React Native", "Solidity", "GraphQL", "AWS"],
    image: "https://images.unsplash.com/photo-1472851294608-4155f2118c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // E-commerce
    link: "#"
  }
]

export function CuratedWork() {
  const [activeProject, setActiveProject] = useState(projects[0])

  return (
<section className="w-full py-32 px-4 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER DE LA SECCIÓN */}
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            FEATURED CASE STUDIES
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Curated <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">work</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* COLUMNA IZQUIERDA: LISTA DE IMÁGENES (SCROLLABLE) */}
          <div className="w-full lg:w-3/5 space-y-24">
            {projects.map((project) => (
              <ProjectImageCard 
                key={project.id} 
                project={project} 
                onInView={() => setActiveProject(project)} 
              />
            ))}
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN (STICKY) */}
          <div className="hidden lg:block w-2/5 relative">
            <div className="sticky top-32 h-fit">
              <ProjectDetails activeProject={activeProject} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// --- COMPONENTE: TARJETA DE IMAGEN (IZQUIERDA) ---
function ProjectImageCard({ project, onInView }: { project: any, onInView: () => void }) {
  const ref = useRef(null)
  // Detectamos si el elemento está en el centro de la pantalla (margin: -50% 0px -50% 0px es un truco común)
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" })

  useEffect(() => {
    if (isInView) {
      onInView()
    }
  }, [isInView, onInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative w-full aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
    >
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Overlay Gradiente para texto interno */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* CONTENIDO VISIBLE SOLO EN MÓVIL (Porque en Desktop está a la derecha) */}
      <div className="absolute bottom-0 left-0 p-6 lg:hidden w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-neutral-300 line-clamp-2 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ÍCONO DE FLECHA AL HACER HOVER */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
        <ArrowRight className="text-white w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </div>
    </motion.div>
  )
}

// --- COMPONENTE: DETALLES DEL PROYECTO (DERECHA) ---
function ProjectDetails({ activeProject }: { activeProject: any }) {
  return (
    <div className="relative p-8 rounded-3xl border border-white/5 bg-neutral-900/50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id} // La clave única fuerza la re-renderización animada
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* TÍTULO + DECORACIÓN */}
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-orange-500" />
            <h3 className="text-3xl font-bold text-white">{activeProject.title}</h3>
          </div>

          {/* DESCRIPCIÓN */}
          <p className="text-lg text-neutral-400 leading-relaxed">
            {activeProject.description}
          </p>

          {/* FEATURES LIST */}
          <ul className="space-y-3">
            {activeProject.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-neutral-300">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* TAGS */}
          <div className="pt-4 flex flex-wrap gap-2">
            {activeProject.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-white/10 flex items-center gap-1"
              >
                {/* Aquí podrías mapear iconos si quisieras, por ahora texto */}
                {tag}
              </span>
            ))}
          </div>

          {/* CTA BOTÓN */}
          <div className="pt-6">
            <a 
              href={activeProject.link}
              className="inline-flex items-center gap-2 text-white font-medium hover:text-orange-400 transition-colors group"
            >
              View Case Study 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  )
}