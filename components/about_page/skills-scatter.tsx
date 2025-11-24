"use client"

import { motion } from "framer-motion"
import { skillsData } from "../skills-data" // Importamos el objeto completo


function formatSkillsForScatter(data: typeof skillsData) {
    const flattenedSkills: { name: string, category: string }[] = [];

    const categoryMap: Record<string, string> = {
        Frontend: 'front',
        Backend: 'back',
        DevOps: 'devops',
        Other: 'other',
    };

    Object.entries(data).forEach(([categoryName, categoryData]) => {
        const shortCategory = categoryMap[categoryName];
        if (shortCategory) {
            categoryData.techs.forEach(tech => {
                flattenedSkills.push({
                    name: tech.name,
                    category: shortCategory,
                });
            });
        }
    });

    return flattenedSkills;
}

const colors: Record<string, string> = {
    front: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 shadow-[0_0_15px_rgba(40,255,255,0.2)]",
    back: "bg-violet-500/10 text-violet-300 border-violet-500/20 shadow-[0_0_15px_rgba(150,50,255,0.2)]",
    devops: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 shadow-[0_0_15px_rgba(0,255,100,0.2)]",
    other: "bg-orange-500/10 text-orange-300 border-orange-500/20 shadow-[0_0_15px_rgba(255,165,0,0.2)]",
}

const skillsForScatter = formatSkillsForScatter(skillsData);

export function SkillsScatter() {
  return (
    <div className="w-full py-10 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
      {skillsForScatter.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03, type: "spring", stiffness: 150 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, y: -5, zIndex: 10, filter: "brightness(1.2)" }} 
          className={`
            px-5 py-3 rounded-full border backdrop-blur-sm font-medium text-sm cursor-default
            ${colors[skill.category]}
            transition-colors duration-200 shadow-md 
          `}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  )
}