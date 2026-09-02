import { hasDatabase, prisma } from "@/lib/prisma";
import { defaultAcademicLabels, type AcademicLabel } from "@/lib/academic";

export async function getAcademicLabels(): Promise<AcademicLabel[]> {
  if (!hasDatabase()) return defaultAcademicLabels;

  try {
    const rows = await prisma.academicLabel.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return [];
    return rows.map((row) => ({
      id: row.id,
      parentId: row.parentId,
      label: row.label,
      sortOrder: row.sortOrder,
    }));
  } catch {
    return defaultAcademicLabels;
  }
}
