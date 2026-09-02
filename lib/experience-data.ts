import { hasDatabase, prisma } from "@/lib/prisma";
import {
  isExperienceKind,
  sortExperience,
  type Experience,
} from "@/lib/experience";

function dateToIsoDay(value: Date) {
  return value.toISOString().slice(0, 10);
}

export async function getExperience(): Promise<Experience[]> {
  if (!hasDatabase()) return [];

  try {
    const rows = await prisma.experience.findMany({
      where: { deletedAt: null },
      orderBy: [{ isCurrent: "desc" }, { startOn: "desc" }],
    });
    return sortExperience(
      rows
        .map((row): Experience | null => {
          if (!isExperienceKind(row.kind)) return null;
          return {
            id: row.id,
            orgName: row.orgName,
            role: row.role,
            kind: row.kind,
            kindDetail: row.kindDetail,
            startOn: dateToIsoDay(row.startOn),
            endOn: row.endOn ? dateToIsoDay(row.endOn) : null,
            isCurrent: row.isCurrent,
            summary: row.summary,
            imageUrl: row.imageUrl,
            sortOrder: row.sortOrder,
          };
        })
        .filter((item): item is Experience => item !== null)
    );
  } catch {
    return [];
  }
}
