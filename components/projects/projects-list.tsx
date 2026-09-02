"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/lib/projects-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <motion.div key={project.id} variants={containerVariants}>
          <ProjectCard project={project} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
