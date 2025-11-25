"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
  images: string[]
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!project) return null

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % project.images.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length)

  const currentImage = project.images[currentIndex]

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
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-[110]"
          >
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
               <AnimatePresence mode="wait">
                 <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                 >
                   <Image 
                     src={currentImage} 
                     alt={`${project.title} screenshot ${currentIndex + 1}`} 
                     fill 
                     className="object-contain" 
                     priority
                   />
                 </motion.div>
               </AnimatePresence>

               {project.images.length > 1 && (
                  <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }} 
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                          <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                          <ChevronRight size={24} />
                      </button>
                  </>
               )}
            </div>

            <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col items-center gap-3 pointer-events-none">
                <h3 className="text-white text-xl font-bold drop-shadow-md tracking-tight">{project.title}</h3>
                
                {project.images.length > 1 && (
                  <div className="flex gap-2 pointer-events-auto">
                    {project.images.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-blue-500 w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                      />
                    ))}
                  </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ProjectCard(project: Project & { index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const thumbnail = project.images && project.images.length > 0 
    ? project.images[0] 
    : "/static/placeholder.jpg"

  return (
    <>
        <motion.div 
            className="group rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden flex flex-col h-full cursor-pointer hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-blue-900/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setModalOpen(true)} 
            whileHover={{ y: -5 }}
        >
            <div className="relative w-full aspect-video overflow-hidden bg-neutral-800">
                <Image 
                    src={thumbnail} 
                    alt={`Preview of ${project.title}`} 
                    fill 
                    className={`object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-2 shadow-xl">
                        <ExternalLink size={20} /> Ver Galería
                    </span>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <div className="flex gap-3">
                      <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10"
                          onClick={(e) => e.stopPropagation()}
                          title="View Code"
                      >
                          <Github size={24} />
                      </a>
                      <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10"
                          onClick={(e) => e.stopPropagation()}
                          title="Live Demo"
                      >
                          <ExternalLink size={24} />
                      </a>
                  </div>
                </div>
                
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
        
        <ProjectModal project={modalOpen ? project : null} onClose={() => setModalOpen(false)} />
    </>
  )
}