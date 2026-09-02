import { hasDatabase, prisma } from "@/lib/prisma";
import {
  defaultMarqueeWords,
  type MarqueeRowIndex,
  type MarqueeWord,
} from "@/lib/marquee";

export async function getMarqueeWords(): Promise<MarqueeWord[]> {
  if (!hasDatabase()) return defaultMarqueeWords;

  try {
    const rows = await prisma.marqueeWord.findMany({
      where: { deletedAt: null },
      orderBy: [{ rowIndex: "asc" }, { sortOrder: "asc" }],
    });
    const mapped = rows
      .filter((row) => row.rowIndex === 1 || row.rowIndex === 2)
      .map((row) => ({
        id: row.id,
        label: row.label,
        rowIndex: row.rowIndex as MarqueeRowIndex,
        sortOrder: row.sortOrder,
      }));
    return mapped;
  } catch {
    return defaultMarqueeWords;
  }
}
