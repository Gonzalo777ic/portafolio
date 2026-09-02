"use client";

import { archiveSkill } from "@/app/actions/skill";
import { SkillAddForm } from "@/components/admin/skill-add-form";
import { Button } from "@/components/ui/button";
import {
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
} from "@/lib/skill";

function SkillAreaAdmin({
  category,
  skills,
}: {
  category: SkillCategory;
  skills: Skill[];
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">
        {SKILL_CATEGORY_LABELS[category]}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={skill.iconUrl} alt="" className="h-5 w-5 object-contain" />
              <span className="truncate text-sm text-white">{skill.name}</span>
            </div>
            {skill.id.startsWith("d-") ? (
              <span className="text-xs text-neutral-500">SQL</span>
            ) : (
              <form action={archiveSkill.bind(null, skill.id)}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="h-8 text-neutral-400 hover:text-white"
                >
                  Archivar
                </Button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <SkillAddForm category={category} />
    </div>
  );
}

export function SkillsManager({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {SKILL_CATEGORIES.map((category) => (
        <SkillAreaAdmin
          key={category}
          category={category}
          skills={skills.filter((skill) => skill.category === category)}
        />
      ))}
    </div>
  );
}
