import { hasDatabase, prisma } from "@/lib/prisma";
import type { PhoneNumber } from "@/lib/phone";

export async function getPhoneNumbers(): Promise<PhoneNumber[]> {
  if (!hasDatabase()) return [];

  try {
    const rows = await prisma.phoneNumber.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      label: row.label,
      number: row.number,
      sortOrder: row.sortOrder,
    }));
  } catch {
    return [];
  }
}
