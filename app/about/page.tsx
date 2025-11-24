"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TechBadge } from "@/components/tech-badge"
import { Code2, Palette, Zap, Users, Target, Lightbulb } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Desarrollo Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS",
  },
  {
    icon: Zap,
    title: "Backend Development",
    description: "Node.js, APIs, Databases, Authentication",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Component Design, User Experience",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Team Leadership, Code Review, Mentoring",
  },
  {
    icon: Target,
    title: "Performance",
    description: "Optimization, Web Vitals, Scalability",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Architecture, Best Practices, Innovation",
  },
]

const techStack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Docker",
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div className="space-y-6 mb-16" variants={containerVariants} initial="hidden" animate="visible">
            <motion.p variants={itemVariants} className="text-primary font-semibold tracking-widest uppercase text-sm">
              About Me
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-foreground">
              Full-Stack Developer & Creative Builder
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              With over 5 years of experience in web development, I specialize in building modern, scalable applications
              that users love. My passion lies at the intersection of code, design, and user experience.
            </motion.p>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            className="mb-16 space-y-4 text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p>
              I started my journey in web development during college when I built my first website. Since then, I've had
              the opportunity to work on projects ranging from startups to enterprise applications, learning something
              new along the way.
            </p>
            <p>
              When I'm not coding, you can find me contributing to open-source projects, writing technical blogs, or
              exploring new technologies. I believe in continuous learning and staying updated with the latest industry
              trends.
            </p>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-border">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">Core Competencies</h2>
            <p className="text-muted-foreground">What I bring to every project</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:border-primary/50 transition-all">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{skill.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{skill.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Tech Stack Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 border-t border-border">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">Tech Stack</h2>
            <p className="text-muted-foreground">Technologies I work with regularly</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech) => (
              <motion.div key={tech} variants={itemVariants}>
                <TechBadge name={tech} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </>
  )
}
