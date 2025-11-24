"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { HomeSkills } from "@/components/home-skills";
import { EarthGlow } from "@/components/earth-glow";
import { AboutSection } from "@/components/about-section";
import { CuratedWork } from "@/components/curated-work";
import { ServicesSection } from "@/components/services-section";
import { ValuesMarquee } from "@/components/values-marquee";
import { PersonalFavorites } from "@/components/personal-favorites";
import { CtaSection } from "@/components/cta-section";
// Variantes de animación (sin cambios)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  return (
    // CORRECCIÓN IMPORTANTE: Eliminado 'overflow-x-hidden' de aquí para que funcione sticky
    <main className="flex flex-col w-full">
      {/* === SECCIÓN 1: HERO === */}
      {/* Movemos el overflow-x-hidden AQUÍ, solo donde está la Tierra */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Contenido del Hero */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-white/80 ring-1 ring-inset ring-white/10 backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponible para nuevos proyectos
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Desarrollo full stack{" "}
              <br className="hidden md:block" />
              escalable y sostenible{" "}
              <span className="font-serif italic font-light text-white/90">
                experiencias digitales
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Hola soy{" "}
              <span className="text-white font-semibold">Gonzalo Isique</span>,
              un{" "}
              <span className="text-white font-semibold">
                Fullstack Developer
              </span>{" "}
              e{" "}
              <span className="text-white font-semibold">
                Ingeniero de Software
              </span>
              .
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 transition-all"
                asChild
              >
                <Link href="/contact" className="group">
                  Contactar
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Link
                href="mailto:gonzaloisique777@gmail.com"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-base px-4 py-2"
              >
                <Mail className="h-5 w-5" />
                <span>gonzaloisique777@gmail.com</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <EarthGlow />
      </section>

      <AboutSection />

      <ServicesSection />

      {/* SECCIÓN SKILLS */}
      <div className="w-full overflow-hidden">
        <HomeSkills />
      </div>

      <CuratedWork />
      <ValuesMarquee />
      <PersonalFavorites/>
      <CtaSection/>

      
    </main>
  );
}
