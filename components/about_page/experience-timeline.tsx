"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase } from "lucide-react";
import {
  experienceKindLabel,
  formatExperienceRange,
  type Experience,
} from "@/lib/experience";

function TimelineItem({
  item,
  index,
  reducedMotion,
}: {
  item: Experience;
  index: number;
  reducedMotion: boolean;
}) {
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: {
          duration: 0.55,
          delay: index * 0.07,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  return (
    <motion.li
      {...motionProps}
      className="relative ms-10 md:ms-12 mb-12 last:mb-0"
    >
      <motion.span
        {...(reducedMotion
          ? {}
          : {
              initial: { opacity: 0, scale: 0.85, y: 12 },
              whileInView: { opacity: 1, scale: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
              transition: {
                duration: 0.45,
                delay: index * 0.07 + 0.05,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            })}
        className="absolute -start-4 md:-start-5 top-0 flex size-8 md:size-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-neutral-900 shadow-[0_0_0_4px_rgba(0,0,0,0.9)]"
      >
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
      </motion.span>

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
    </motion.li>
  );
}

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const reducedMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto">
      <motion.div
        className="text-center mb-12"
        {...(reducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
            })}
      >
        <h2 className="text-3xl font-bold text-white mb-3">Experiencia</h2>
        <p className="text-neutral-400">
          Empresas, freelance y otras formas de trabajo.
        </p>
      </motion.div>

      <div className="relative ml-4 md:ml-6">
        <div
          className="pointer-events-none absolute inset-y-0 start-0 w-px bg-white/10"
          aria-hidden
        />
        {!reducedMotion ? (
          <div
            className="pointer-events-none absolute inset-y-0 start-0 w-px overflow-hidden"
            aria-hidden
          >
            <div className="experience-timeline-flow h-28 w-full bg-gradient-to-b from-transparent via-emerald-400/70 to-cyan-400/40 blur-[0.5px]" />
          </div>
        ) : null}

        <ol className="relative">
          {items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              reducedMotion={Boolean(reducedMotion)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
