"use client";

import { Layout, Server, Cloud, Terminal } from "lucide-react";
import type { ReactNode } from "react";
import { SkillAreaColumn } from "@/components/home/skill-area-column";
import { ScrollSpinner } from "@/components/spinner-background";
import { type SkillCategory, type Skill } from "@/lib/skill";

const categoryIcons: Record<SkillCategory, ReactNode> = {
  frontend: <Layout className="w-5 h-5 text-cyan-400" />,
  backend: <Server className="w-5 h-5 text-violet-400" />,
  devops: <Cloud className="w-5 h-5 text-emerald-400" />,
  other: <Terminal className="w-5 h-5 text-orange-400" />,
};

export function HomeSkills({
  groups,
}: {
  groups: { category: SkillCategory; label: string; skills: Skill[] }[];
}) {
  return (
    <section className="w-full py-32 px-4 relative z-10 overflow-hidden mt-0">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-24 relative flex flex-col items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-90 pointer-events-none">
            <ScrollSpinner />
          </div>
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-neutral-400 uppercase mb-4 drop-shadow-md">
            MI STACK
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight flex flex-col md:flex-row items-center gap-2 md:gap-4 drop-shadow-lg">
            <span>Algunas</span>
            <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 brightness-125">
              Tecnologías
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {groups.map((group, index) => (
            <SkillAreaColumn
              key={group.category}
              label={group.label}
              icon={categoryIcons[group.category]}
              skills={group.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
