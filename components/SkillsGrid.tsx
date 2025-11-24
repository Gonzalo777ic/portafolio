"use client";

import { motion } from "framer-motion";

export function SkillsGrid({ skills }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Object.entries(skills).map(([category, data], index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              {data.icon}
            </div>
            <h3 className="font-semibold text-xl text-neutral-200">
              {category}
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {data.techs.map((tech) => (
              <div
                key={tech.name}
                className="
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  bg-neutral-900/80 backdrop-blur-sm border border-white/5
                  hover:border-white/20 hover:bg-neutral-800
                  transition-all duration-300 group cursor-default
                "
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />

                <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
