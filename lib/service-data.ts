import { hasDatabase, prisma } from "@/lib/prisma";
import {
  defaultServices,
  isServiceColor,
  isServiceIconName,
  type Service,
} from "@/lib/service";

export async function getServices(): Promise<Service[]> {
  if (!hasDatabase()) return defaultServices;

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
    return defaultServices;
  }
}
