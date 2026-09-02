"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarthGlow } from "@/components/earth-glow";
import { RichInline } from "@/components/rich-inline";
import { siteConfig } from "@/lib/site-config";
import type { Showcase } from "@/lib/showcase";

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

export function HomeHero({ showcase }: { showcase: Showcase }) {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
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
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] whitespace-pre-line"
          >
            {showcase.title}{" "}
            {showcase.titleAccent ? (
              <span className="font-serif italic font-light text-white/90">
                {showcase.titleAccent}
              </span>
            ) : null}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            <RichInline text={showcase.subtitle} />
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
              href={`mailto:${siteConfig.links.email}`}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-base px-4 py-2"
            >
              <Mail className="h-5 w-5" />
              <span>{siteConfig.links.email}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <EarthGlow />
    </section>
  );
}
