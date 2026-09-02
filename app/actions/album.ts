"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { toSpotifyEmbedUrl } from "@/lib/album";
import { albumIdSchema, albumSchema } from "@/lib/album-schema";

export type AlbumFormState = {
  error: string | null;
  success: boolean;
};

function revalidateAlbums() {
  revalidatePath("/");
  revalidatePath("/admin");
}

function parseAlbum(formData: FormData) {
  return albumSchema.safeParse({
    title: formData.get("title"),
    artist: formData.get("artist"),
    albumUrl: formData.get("albumUrl"),
    imageUrl: formData.get("imageUrl"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });
}

export async function createAlbum(
  _prev: AlbumFormState,
  formData: FormData
): Promise<AlbumFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseAlbum(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.album.create({
      data: {
        title: parsed.data.title,
        artist: parsed.data.artist,
        albumUrl: toSpotifyEmbedUrl(parsed.data.albumUrl),
        imageUrl: parsed.data.imageUrl,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo crear el álbum. Revisa Prisma y albums.",
      success: false,
    };
  }

  revalidateAlbums();
  return { error: null, success: true };
}

export async function updateAlbum(
  _prev: AlbumFormState,
  formData: FormData
): Promise<AlbumFormState> {
  const id = albumIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseAlbum(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.album.updateMany({
      where: { id: id.data, deletedAt: null },
      data: {
        title: parsed.data.title,
        artist: parsed.data.artist,
        albumUrl: toSpotifyEmbedUrl(parsed.data.albumUrl),
        imageUrl: parsed.data.imageUrl,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return { error: "No se pudo guardar el álbum.", success: false };
  }

  revalidateAlbums();
  return { error: null, success: true };
}

export async function archiveAlbum(id: string): Promise<AlbumFormState> {
  const parsedId = albumIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.album.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar el álbum.", success: false };
  }

  revalidateAlbums();
  return { error: null, success: true };
}
