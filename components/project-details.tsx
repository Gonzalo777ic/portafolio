"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Project } from "@/lib/projects-data";

interface ProjectDetailsProps {
  activeProject: Project;
}

export function ProjectDetails({ activeProject }: ProjectDetailsProps) {
  const projectLink = activeProject.demo || activeProject.github || "#";

  return (
    <div className="relative p-8 rounded-3xl border border-white/5 bg-neutral-900/80 backdrop-blur-md shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            {/* Línea degradada */}
            <div className="h-[3px] w-12 bg-gradient-to-r from-[#9B53F9] to-[#F2389F] rounded-full" />
            <h3 className="text-3xl font-bold text-white">
              {activeProject.title}
            </h3>
          </div>

          <p className="text-lg text-neutral-400 leading-relaxed">
            {activeProject.description}
          </p>

          <ul className="space-y-3">
            {activeProject.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-neutral-300">
                {/* Bullet point azul */}
                <span className="mt-2 h-2 w-2 rounded-full bg-[#58A0FF] flex-shrink-0 shadow-[0_0_8px_#58A0FF]" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-wrap gap-2">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/5 text-[#F2389F] border border-[#F2389F]/20 flex items-center gap-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-8 flex items-center gap-4">
            <Link
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white font-medium hover:text-[#9B53F9] transition-colors"
            >
              <span className="border-b border-transparent group-hover:border-[#9B53F9] transition-all">
                Ver Detalles del Proyecto
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}