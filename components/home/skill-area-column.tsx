"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import type { Skill } from "@/lib/skill";

const VISIBLE_LIMIT = 8;

export function SkillAreaColumn({
  label,
  icon,
  skills,
  index,
}: {
  label: string;
  icon: ReactNode;
  skills: Skill[];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? skills : skills.slice(0, VISIBLE_LIMIT);
  const hasMore = skills.length > VISIBLE_LIMIT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="space-y-4 bg-neutral-900/40 rounded-2xl p-4 border border-white/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-2 px-1">
        <div className="p-2 rounded-lg bg-white/10 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-white drop-shadow-md tracking-wide">
          {label}
        </h3>
      </div>

      <div className="flex flex-col gap-3 relative">
        <AnimatePresence initial={false}>
          {visible.map((tech) => (
            <motion.div
              layout
              key={tech.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-800/80 border border-white/10 hover:bg-neutral-700 hover:border-white/30 transition-all duration-200"
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.iconUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-100 tracking-wide">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          {expanded ? (
            <>
              Menos <ChevronUp size={14} />
            </>
          ) : (
            <>
              Ver {skills.length - VISIBLE_LIMIT} más <ChevronDown size={14} />
            </>
          )}
        </button>
      ) : null}
    </motion.div>
  );
}
