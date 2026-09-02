import { hasDatabase, prisma } from "@/lib/prisma";
import { defaultSkills } from "@/lib/skill-defaults";
import {
  groupSkillsByCategory,
  isSkillCategory,
  type Skill,
} from "@/lib/skill";

export async function getSkills(): Promise<Skill[]> {
  if (!hasDatabase()) return defaultSkills;

  try {
    const rows = await prisma.skill.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows
      .map((row) => {
        if (!isSkillCategory(row.category)) return null;
        return {
          id: row.id,
          name: row.name,
          category: row.category,
          iconUrl: row.iconUrl,
          iconKey: row.iconKey,
          sortOrder: row.sortOrder,
        } satisfies Skill;
      })
      .filter((skill): skill is Skill => skill !== null);
  } catch {
    return defaultSkills;
  }
}

export async function getSkillGroups() {
  return groupSkillsByCategory(await getSkills());
}
