"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/projects/project-card";
import { motion } from "framer-motion";
import { CtaSection } from "@/components/cta-section";

// --- DATOS DE EJEMPLO ---
const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Una plataforma de comercio electrónico completa con catálogo de productos, carrito de compras, pasarela de pago segura y panel de administración.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    // Asegúrate de que estas imágenes existan en la carpeta public/static/
    images: ["static/1.jpeg", "static/2.jpeg", "static/3.jpeg"],
  },
  {
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas en tiempo real con funciones colaborativas, seguimiento de progreso y notificaciones push.",
    tags: ["React", "Firebase", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    images: ["/static/1.jpeg"],
  },
  {
    title: "Analytics Dashboard",
    description:
      "Dashboard interactivo de análisis que muestra datos en tiempo real con gráficos dinámicos y reportes automatizados.",
    tags: ["Next.js", "Recharts", "TypeScript", "Supabase"],
    github: "https://github.com",
    demo: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Weather App",
    description:
      "Aplicación meteorológica minimalista con datos en tiempo real, pronósticos por hora y detección de ubicación automática.",
    tags: ["React", "OpenWeather API", "Tailwind CSS", "Geolocation"],
    github: "https://github.com",
    demo: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    ],
  },
  {
    title: "Blog Platform",
    description:
      "Markdown-based blogging platform with search, categories, and dark mode support.",
    tags: ["Next.js", "MDX", "Contentful", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1499750310159-5254f412d278?w=800&q=80",
    ],
  },
  {
    title: "Social Media Feed",
    description:
      "Social media feed with infinite scroll, likes, comments, and real-time notifications.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    ],
  },
];

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
      {/* FONDO FIJO CON TEXTURA BW */}
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          // Usamos la propiedad `backgroundImage` de CSS
          backgroundImage: `url('/static/bw.jpg')`,
          // Propiedades para que la imagen cubra todo y se mantenga fija al hacer scroll
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          // Opcional: Oscurecer un poco la imagen para el contraste, usando un pseudo-elemento o un overlay en la imagen
        }}
      >
        {/* Overlay sutil para oscurecer la imagen de fondo si es necesario y garantizar el contraste */}
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {" "}
          {/* max-w-5xl para que no se estiren demasiado */}
          {/* Header Section */}
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
              Algunos Proyectos
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Proyectos
            </p>
          </motion.div>
          {/* Projects Grid - CAMBIADO A 1 COLUMNA PARA HACERLAS GIGANTES */}
          <motion.div
            className="grid grid-cols-1 gap-16" // Gap grande para separar proyectos gigantes
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={containerVariants}>
                <ProjectCard {...project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <CtaSection />
    </div>
  );
}
