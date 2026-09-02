"use client";

import { archiveAlbum } from "@/app/actions/album";
import { AlbumForm } from "@/components/admin/album-form";
import { Button } from "@/components/ui/button";
import type { Album } from "@/lib/album";

export function AlbumsManager({ albums }: { albums: Album[] }) {
  return (
    <div className="space-y-8">
      <ul className="space-y-6">
        {albums.map((album) => (
          <li
            key={album.id}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-sm font-medium text-white">
              {album.title}{" "}
              <span className="text-neutral-400">· {album.artist}</span>
            </p>
            {album.id.startsWith("a-") ? (
              <p className="text-xs text-neutral-500">
                Ítem de ejemplo (sin fila en la base). Añade uno nuevo abajo.
              </p>
            ) : (
              <>
                <AlbumForm album={album} />
                <form action={archiveAlbum.bind(null, album.id)}>
                  <Button
                    type="submit"
                    variant="ghost"
                    className="text-neutral-400 hover:text-white"
                  >
                    Archivar
                  </Button>
                </form>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="border-t border-white/10 pt-6">
        <h3 className="mb-4 text-sm font-medium text-white">Nuevo álbum</h3>
        <AlbumForm />
      </div>
    </div>
  );
}
