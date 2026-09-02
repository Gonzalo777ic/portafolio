import {
  Cloud,
  Code,
  Database,
  Globe,
  Layout,
  PenTool,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceColor, ServiceIconName } from "@/lib/service";

const icons: Record<ServiceIconName, LucideIcon> = {
  code: Code,
  server: Server,
  "pen-tool": PenTool,
  smartphone: Smartphone,
  cloud: Cloud,
  database: Database,
  layout: Layout,
  sparkles: Sparkles,
  wrench: Wrench,
  globe: Globe,
};

const colors: Record<ServiceColor, string> = {
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  pink: "text-pink-400",
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  orange: "text-orange-400",
};

export function ServiceGlyph({
  name,
  color,
  className = "w-8 h-8",
}: {
  name: ServiceIconName;
  color: ServiceColor;
  className?: string;
}) {
  const Icon = icons[name] ?? Code;
  return <Icon className={`${className} ${colors[color]}`} />;
}
