"use client"

import { motion } from "framer-motion"
import { skillsData } from "../skills-data"
import { useMemo } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01, 
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

const colors: Record<string, string> = {
  front: "bg-cyan-900/20 text-cyan-300 border-cyan-500/30 md:shadow-[0_0_15px_rgba(40,255,255,0.2)]",
  back: "bg-violet-900/20 text-violet-300 border-violet-500/30 md:shadow-[0_0_15px_rgba(150,50,255,0.2)]",
  devops: "bg-emerald-900/20 text-emerald-300 border-emerald-500/30 md:shadow-[0_0_15px_rgba(0,255,100,0.2)]",
  other: "bg-orange-900/20 text-orange-300 border-orange-500/30 md:shadow-[0_0_15px_rgba(255,165,0,0.2)]",
}

export function SkillsScatter() {
  const skillsForScatter = useMemo(() => {
    const flattenedSkills: { name: string; category: string }[] = []
    const categoryMap: Record<string, string> = {
      Frontend: "front",
      Backend: "back",
      DevOps: "devops",
      Other: "other",
    }

    Object.entries(skillsData).forEach(([categoryName, categoryData]) => {
      const shortCategory = categoryMap[categoryName]
      if (shortCategory) {
        categoryData.techs.forEach((tech) => {
          flattenedSkills.push({
            name: tech.name,
            category: shortCategory,
          })
        })
      }
    })
    return flattenedSkills
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} 
      className="w-full py-10 flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto"
    >
      {skillsForScatter.map((skill, index) => (
        <motion.div
          key={`${skill.name}-${index}`}
          variants={itemVariants}
          whileHover={{ scale: 1.05, zIndex: 10 }} 
          className={`
            px-3 py-1.5 md:px-5 md:py-3 rounded-full border font-medium text-xs md:text-sm cursor-default
            ${colors[skill.category]}
            transition-colors duration-200 
            
            /* OPTIMIZACIÓN MÓVIL CRÍTICA: */
            backdrop-blur-none md:backdrop-blur-sm 
            will-change-transform
          `}
        >
          {skill.name}
        </motion.div>
      ))}
    </motion.div>
  )
}