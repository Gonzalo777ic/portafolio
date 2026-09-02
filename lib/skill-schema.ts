import { z } from "zod";
import { SKILL_CATEGORIES, type SkillCategory } from "@/lib/skill";

export const skillSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(60),
  category: z.enum(SKILL_CATEGORIES as [SkillCategory, ...SkillCategory[]]),
  iconUrl: z.string().trim().min(1, "Elige un icono o sube un logo").max(500),
  iconKey: z.string().trim().min(1).max(80),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const skillIdSchema = z.string().uuid();
