import { hasDatabase, prisma } from "@/lib/prisma";
import { defaultAlbums, type Album } from "@/lib/album";

export async function getAlbums(): Promise<Album[]> {
  if (!hasDatabase()) return defaultAlbums;

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
    return defaultAlbums;
  }
}
