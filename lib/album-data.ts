import { hasDatabase, prisma } from "@/lib/prisma";
import type { Album } from "@/lib/album";

/** Solo filas reales. Sin mocks hardcodeados. */
export async function getAlbums(): Promise<Album[]> {
  if (!hasDatabase()) return [];

  try {
    const rows = await prisma.album.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      artist: row.artist,
      albumUrl: row.albumUrl,
      imageUrl: row.imageUrl,
      sortOrder: row.sortOrder,
    }));
  } catch {
    return [];
  }
}
