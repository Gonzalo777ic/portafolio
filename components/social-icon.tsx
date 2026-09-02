import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { SocialIconName } from "@/lib/social";

const icons: Record<SocialIconName, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  globe: Globe,
};

export function SocialIcon({
  name,
  size = 20,
  className,
}: {
  name: SocialIconName;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name] ?? Globe;
  return <Icon size={size} className={className} />;
}
