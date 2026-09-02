export const SKILL_CATEGORIES = [
  "frontend",
  "backend",
  "devops",
  "other",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  other: "Other",
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  iconUrl: string;
  iconKey: string;
  sortOrder: number;
};

export function isSkillCategory(value: string): value is SkillCategory {
  return (SKILL_CATEGORIES as readonly string[]).includes(value);
}

export function groupSkillsByCategory(skills: Skill[]) {
  return SKILL_CATEGORIES.map((category) => ({
    category,
    label: SKILL_CATEGORY_LABELS[category],
    skills: skills.filter((skill) => skill.category === category),
  }));
}
