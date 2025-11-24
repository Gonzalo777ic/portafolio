"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { motion } from "framer-motion"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with product catalog, shopping cart, and secure checkout.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Task Management App",
    description: "Real-time task management application with collaborative features and progress tracking.",
    tags: ["React", "Firebase", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Analytics Dashboard",
    description: "Interactive analytics dashboard displaying real-time data with charts and insights.",
    tags: ["Next.js", "Recharts", "TypeScript", "Supabase"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Weather App",
    description: "Beautiful weather application with real-time data, forecasts, and location-based features.",
    tags: ["React", "OpenWeather API", "Tailwind CSS", "Geolocation"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Blog Platform",
    description: "Markdown-based blogging platform with search, categories, and dark mode support.",
    tags: ["Next.js", "MDX", "Contentful", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Social Media Feed",
    description: "Social media feed with infinite scroll, likes, comments, and real-time notifications.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            className="space-y-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-semibold tracking-widest uppercase text-sm">My Work</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Featured Projects</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A selection of projects I'm proud of. Each one showcases different aspects of my expertise in full-stack
              development.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </motion.div>
        </section>
      </main>
    </>
  )
}
