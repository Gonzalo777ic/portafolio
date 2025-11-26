"use client";

import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/projects/project-card"; // Asegúrate de la ruta
import { motion } from "framer-motion";
import { CtaSection } from "@/components/cta-section";
import { projectsData } from "@/lib/projects-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Projects() {
  return (
    <div className="relative min-h-screen bg-black text-foreground">
      {/* Fondo */}
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url('/static/bw.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">
              PORTAFOLIO
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg tracking-tight">
              Todos los Proyectos
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Explora mi colección completa de desarrollos, desde aplicaciones
              web hasta soluciones cloud.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8" // gap-8 es suficiente
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projectsData.map((project, index) => (
              <motion.div key={project.id} variants={containerVariants}>
                {/* Pasamos el objeto project completo */}
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <CtaSection />
    </div>
  );
}