"use client";

import { Brain } from "lucide-react";
import { LearningGlyph } from "@/components/learning-glyph";
import type { LearningSection } from "@/lib/learning";

export function LearningNowSection({ learning }: { learning: LearningSection }) {
  if (learning.topics.length === 0) return null;

  return (
    <section className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Brain className="text-purple-400" />
          {learning.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learning.topics.map((topic) => (
            <div key={topic.id} className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-semibold text-white">
                <LearningGlyph name={topic.icon} color={topic.iconColor} className="w-6 h-6" />
                <h3>{topic.title}</h3>
              </div>
              <p className="text-neutral-400 leading-relaxed whitespace-pre-line">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
