"use client";

import { motion } from "framer-motion";
import { RotatingCube } from "./rotating-cube";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section className="w-full py-32 flex flex-col items-center justify-center overflow-hidden relative z-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full">
        
        {/* Contenedor de Texto */}
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left relative z-10 flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-2 block">
              Sobre Mí
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight break-words">
              <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] block sm:inline">
                Full Stack Developer
              </span>
              <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-none block mt-2 sm:mt-0 break-words">
                apasionado por la arquitectura de sistemas y las abstracciones
                que los hacen posibles.
              </span>
            </h2>
          </motion.div>

          <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto lg:mx-0 break-words">
            Ingeniero de software con enfoque en arquitectura, diseño de
            sistemas y creación de soluciones eficientes. Me caracterizo por mi
            pensamiento lógico, capacidad de integrar visión técnica con
            experiencia de usuario, y mi habilidad para transformar ideas
            complejas en productos claros, escalables y bien construidos.
            Disfruto aprender, optimizar y darle estructura a cada proyecto para
            que cobre sentido y continuidad real.
          </p>

          <div className="flex items-center gap-4 justify-center lg:justify-start pt-2">
            <SocialBtn
              href={siteConfig.links.github}
              icon={<Github size={20} />}
              label="GitHub"
            />

            <SocialBtn
              href={siteConfig.links.linkedin}
              icon={<Linkedin size={20} />}
              label="LinkedIn"
            />

            <SocialBtn
              href={`mailto:${siteConfig.links.email}`}
              icon={<Mail size={20} />}
              label="Email"
            />
          </div>
        </div>

        {/* Contenedor del Cubo */}
        <div className="lg:w-1/2 flex justify-center items-center min-h-[400px] relative z-20 mt-8 lg:mt-0">
          <div className="absolute w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

          <RotatingCube />
        </div>
      </div>
    </section>
  );
}

function SocialBtn({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
