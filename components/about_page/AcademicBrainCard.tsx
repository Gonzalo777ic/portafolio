"use client";

import { GraduationCap, Award } from "lucide-react";
import type { AcademicNode } from "@/lib/academic";

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

function AcademicCard({ root }: { root: AcademicNode }) {
  const subtitles = root.children.filter((child) => child.children.length === 0);
  const groups = root.children.filter((child) => child.children.length > 0);

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl p-6 space-y-6">
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 shadow-inner">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{root.label}</h3>
          {subtitles.map((item) => (
            <p key={item.id} className="text-sm text-white/60">
              {item.label}
            </p>
          ))}
        </div>
      </div>

      {groups.length > 0 ? (
        <>
          <div className="h-px w-full bg-white/10" />
          <div className="flex flex-wrap gap-3">
            {groups.map((group) => (
              <span key={group.id} className="contents">
                <AchievementBadge text={group.label} isHighlight />
                {group.children.map((tag) => (
                  <AchievementBadge key={tag.id} text={tag.label} />
                ))}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function AcademicBrainCard({ roots }: { roots: AcademicNode[] }) {
  if (roots.length === 0) return null;
  return (
    <div className="space-y-4">
      {roots.map((root) => (
        <AcademicCard key={root.id} root={root} />
      ))}
    </div>
  );
}
