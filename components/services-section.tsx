"use client";

import { motion } from "framer-motion";
import { ServiceGlyph } from "@/components/service-glyph";
import type { Service } from "@/lib/service";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="w-full py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
            LO QUE HAGO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Mis{" "}
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Servicios
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl border border-white/5 bg-neutral-900/50 hover:bg-neutral-900/80 transition-colors duration-300 backdrop-blur-sm"
    >
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
        <ServiceGlyph name={service.icon} color={service.iconColor} />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-neutral-400 leading-relaxed text-sm whitespace-pre-line">
        {service.description}
      </p>
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/10 transition-colors pointer-events-none" />
    </motion.div>
  );
}
