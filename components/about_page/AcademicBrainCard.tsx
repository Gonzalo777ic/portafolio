"use client";

import { GraduationCap, Award } from "lucide-react";
import React from "react";

function AchievementBadge({
  text,
  isHighlight,
}: {
  text: string;
  isHighlight?: boolean;
}) {
  const baseClasses =
    "px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-300 shadow-lg";
  const styleClasses = isHighlight
    ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20"
    : "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20";

  return (
    <span className={`${baseClasses} ${styleClasses} flex items-center gap-2`}>
      {isHighlight && <Award className="w-4 h-4" />}
      {text}
    </span>
  );
}

export function AcademicBrainCard() {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl p-6 space-y-6">
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 shadow-inner">
          <GraduationCap className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            Situación académica
          </h3>
          <p className="text-sm text-white/60">
            Universidad Ricardo Palma – Ingeniería Informática
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <AchievementBadge
            text="Décimo Superior en los semestres:"
            isHighlight={true}
          />
          <AchievementBadge text="Período 2025-2" />
          <AchievementBadge text="Período 2025-1" />
          <AchievementBadge text="Período 2024-2" />
          <AchievementBadge text="Período 2024-1" />
          <AchievementBadge text="Período 2023-2" />
          <AchievementBadge text="Período 2023-1" />
          <AchievementBadge
            text="Beca por rendimiento académico en los semestres:"
            isHighlight={true}
          />
          <AchievementBadge text="Período 2025-1" />
          <AchievementBadge text="Período 2025-2" />
        </div>
      </div>
    </div>
  );
}

