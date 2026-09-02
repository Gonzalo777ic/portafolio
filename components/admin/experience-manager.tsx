"use client";

import { archiveExperience } from "@/app/actions/experience";
import { ExperienceForm } from "@/components/admin/experience-form";
import { Button } from "@/components/ui/button";
import type { Experience } from "@/lib/experience";

export function ExperienceManager({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-8">
      <ul className="space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-sm font-medium text-white">
              {item.orgName}{" "}
              <span className="text-neutral-400">· {item.role}</span>
            </p>
            <ExperienceForm item={item} />
            <form action={archiveExperience.bind(null, item.id)}>
              <Button
                type="submit"
                variant="ghost"
                className="text-neutral-400 hover:text-white"
              >
                Archivar
              </Button>
            </form>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/10 pt-6">
        <h3 className="mb-4 text-sm font-medium text-white">Nueva experiencia</h3>
        <ExperienceForm />
      </div>
    </div>
  );
}
