"use client"

import { motion } from "framer-motion"
import { Code, Server, PenTool, Smartphone } from "lucide-react"

const services = [
  {
    title: "Frontend Development",
    description: "Construyo interfaces web y móviles modernas, rápidas y accesibles. Transformo diseños complejos en código pixel-perfect usando React, Next.js y Tailwind.",
    icon: <Code className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Backend Development",
    description: "Diseño arquitecturas de servidor robustas y escalables. Creo APIs seguras, gestiono bases de datos complejas y optimizo el rendimiento del lado del servidor.",
    icon: <Server className="w-8 h-8 text-violet-400" />,
  },
  {
    title: "Web & UI Design",
    description: "Diseño experiencias de usuario intuitivas y sistemas visuales atractivos. Me enfoco en la usabilidad y la estética para asegurar que el producto destaque.",
    icon: <PenTool className="w-8 h-8 text-pink-400" />,
  },
]

export function ServicesSection() {
  return (
    <section className="w-full py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            LO QUE HAGO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Mis <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Servicios</span>
          </h2>
        </div>

        {/* GRID DE SERVICIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl border border-white/5 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors duration-300 backdrop-blur-sm"
    >
      {/* Icono con círculo brillante */}
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>

      {/* Título */}
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {service.title}
      </h3>

      {/* Descripción */}
      <p className="text-neutral-400 leading-relaxed text-sm">
        {service.description}
      </p>

      {/* Borde degradado en hover (Opcional, efecto premium) */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/10 transition-colors pointer-events-none" />
    </motion.div>
  )
}