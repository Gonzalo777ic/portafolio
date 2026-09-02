import { hasDatabase, prisma } from "@/lib/prisma";
import {
  isServiceColor,
  isServiceIconName,
  type Service,
} from "@/lib/service";

/** Solo filas reales. Sin mocks hardcodeados. */
export async function getServices(): Promise<Service[]> {
  if (!hasDatabase()) return [];

  try {
    const rows = await prisma.service.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      icon: isServiceIconName(row.icon) ? row.icon : "code",
      iconColor: isServiceColor(row.iconColor) ? row.iconColor : "cyan",
      sortOrder: row.sortOrder,
    }));
  } catch {
    return [];
  }
}
