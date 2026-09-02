"use client";

import { motion } from "framer-motion";
import { AboutCarousel } from "@/components/about_page/about-carousel";
import { AcademicBrainCard } from "@/components/about_page/AcademicBrainCard";
import { LearningNowSection } from "@/components/about_page/learning-now-section";
import { ExperienceTimeline } from "@/components/about_page/experience-timeline";
import { SkillsScatter } from "@/components/about_page/skills-scatter";
import { CtaSection } from "@/components/cta-section";
import { RichInline } from "@/components/rich-inline";
import { cubeImageUrls, defaultAbout, type About } from "@/lib/about";
import type { AcademicNode } from "@/lib/academic";
import type { Experience } from "@/lib/experience";
import type { LearningSection } from "@/lib/learning";
import type { Skill } from "@/lib/skill";

function PageBody({ text }: { text: string }) {
  const paragraphs = (text || "")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  return (
    <div className="prose prose-invert prose-lg max-w-3xl text-neutral-300 leading-relaxed space-y-6">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <RichInline text={paragraph.replace(/\n/g, " ")} />
        </p>
      ))}
    </div>
  );
}

export function AboutPageView({
  about,
  academicRoots,
  skills,
  learning,
  experience,
}: {
  about: About;
  academicRoots: AcademicNode[];
  skills: Skill[];
  learning: LearningSection;
  experience: Experience[];
}) {
  return (
    <div className="bg-black min-h-screen text-foreground relative">
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url('/static/bw.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <div className="relative z-10 bg-transparent">
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto space-y-32">
            <section className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="lg:w-1/2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    {about.pageTitle || defaultAbout.pageTitle} <br />
                    {(about.pageTitleAccent ?? defaultAbout.pageTitleAccent) ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        {about.pageTitleAccent ?? defaultAbout.pageTitleAccent}
                      </span>
                    ) : null}
                  </h1>
                  <PageBody text={about.pageBody || defaultAbout.pageBody} />
                  <AcademicBrainCard roots={academicRoots} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:w-1/2 w-full text-center"
              >
                <AboutCarousel images={cubeImageUrls(about.imageUrls ?? [])} />
                {(about.carouselCaption || defaultAbout.carouselCaption) ? (
                  <p className="text-center text-sm text-neutral-500 mt-4 italic">
                    {about.carouselCaption || defaultAbout.carouselCaption}
                  </p>
                ) : null}
              </motion.div>
            </section>

            <ExperienceTimeline items={experience} />

            <section className="text-center">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Skills</h2>
                <p className="text-neutral-400">
                  Algunas tecnologías con nivel de experiencia y familiaridad en
                  distinto nivel
                </p>
              </div>
              <SkillsScatter skills={skills} />
            </section>

            <LearningNowSection learning={learning} />
          </div>
        </main>
        <CtaSection />
      </div>
    </div>
  );
}
