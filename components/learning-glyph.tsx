import {
  BookOpen,
  Brain,
  Cloud,
  Code,
  Cpu,
  Database,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { LearningColor, LearningIconName } from "@/lib/learning";

const icons: Record<LearningIconName, LucideIcon> = {
  brain: Brain,
  cpu: Cpu,
  network: Network,
  code: Code,
  cloud: Cloud,
  database: Database,
  sparkles: Sparkles,
  "book-open": BookOpen,
};

const colors: Record<LearningColor, string> = {
  cyan: "text-cyan-300",
  violet: "text-purple-300",
  pink: "text-pink-300",
  blue: "text-blue-300",
  emerald: "text-emerald-300",
  orange: "text-orange-300",
};

export function LearningGlyph({
  name,
  color,
  className = "w-6 h-6",
}: {
  name: LearningIconName;
  color: LearningColor;
  className?: string;
}) {
  const Icon = icons[name] ?? Brain;
  return <Icon className={`${className} ${colors[color]}`} />;
}
