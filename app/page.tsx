"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TechBadge } from "@/components/tech-badge"
import { ArrowRight } from "lucide-react"

const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"]

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background to-card/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="space-y-2">
                <motion.p
                  variants={itemVariants}
                  className="text-primary font-semibold tracking-widest uppercase text-sm"
                >
                  Welcome to my portfolio
                </motion.p>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground"
                >
                  Full-Stack Developer
                </motion.h1>
              </motion.div>

              <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                I craft beautiful, accessible digital experiences using modern web technologies. Passionate about clean
                code, performance optimization, and creating user-centric solutions.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/projects" className="group">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute top-0 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20" />
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ready to work together?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Let's create something amazing. Whether you have a project in mind or just want to chat, feel free to
              reach out.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
