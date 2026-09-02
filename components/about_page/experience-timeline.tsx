"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import {
  experienceKindLabel,
  formatExperienceRange,
  type Experience,
} from "@/lib/experience";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  if (items.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Experiencia</h2>
        <p className="text-neutral-400">
          Empresas, freelance y otras formas de trabajo.
        </p>
      </div>

      <ol className="relative border-s border-white/10 ml-4 md:ml-6">
        {items.map((item) => (
          <li key={item.id} className="ms-10 md:ms-12 mb-12 last:mb-0">
            <span className="absolute -start-4 md:-start-5 flex size-8 md:size-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-neutral-900">
              {item.imageUrl ? (
                <span className="relative block size-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.orgName}
                    fill
                    className="object-cover"
                  />
                </span>
              ) : (
                <Briefcase className="size-4 text-neutral-400" />
              )}
            </span>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-neutral-300">
                {experienceKindLabel(item)}
              </span>
              {item.isCurrent ? (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-300">
                  Actual
                </span>
              ) : null}
              <span className="text-xs text-neutral-500">
                {formatExperienceRange(item)}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">{item.orgName}</h3>
            <p className="text-sm text-neutral-300 mt-1">{item.role}</p>
            {item.summary ? (
              <p className="text-neutral-400 leading-relaxed mt-3 whitespace-pre-line">
                {item.summary}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
