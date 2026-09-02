"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  createAlbum,
  updateAlbum,
  type AlbumFormState,
} from "@/app/actions/album";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hasCloudinaryEnv, uploadImageToCloudinary } from "@/lib/cloudinary";
import { albumCoverSrc, type Album } from "@/lib/album";

const initialState: AlbumFormState = { error: null, success: false };

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200"
    >
      {pending ? "Guardando…" : label}
    </Button>
  );
}

export function AlbumForm({ album }: { album?: Album }) {
  const action = album ? updateAlbum : createAlbum;
  const [state, formAction] = useActionState(action, initialState);
  const [imageUrl, setImageUrl] = useState(album?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file, "portafolio/albums");
      setImageUrl(url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "No se pudo subir la portada."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-4">
      {album ? <input type="hidden" name="id" value={album.id} /> : null}
      <input type="hidden" name="imageUrl" value={imageUrl} />

      <div className="space-y-2">
        <Label className="text-white">Título</Label>
        <Input
          name="title"
          required
          defaultValue={album?.title}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Artista</Label>
        <Input
          name="artist"
          required
          defaultValue={album?.artist}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">URL de Spotify</Label>
        <Input
          name="albumUrl"
          required
          defaultValue={album?.albumUrl}
          placeholder="https://open.spotify.com/album/..."
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Orden</Label>
        <Input
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={album?.sortOrder ?? 0}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Portada (Cloudinary)</Label>
        {!hasCloudinaryEnv() ? (
          <p className="text-xs text-amber-400">
            Configura Cloudinary para subir la imagen.
          </p>
        ) : null}
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={albumCoverSrc(imageUrl)}
            alt=""
            className="h-20 w-20 rounded-lg object-cover"
          />
        ) : null}
        <Input
          type="file"
          accept="image/*"
          disabled={!hasCloudinaryEnv() || uploading}
          onChange={(event) => handleUpload(event.target.files?.[0])}
          className="bg-white/5 border-white/10 text-white"
        />
        {uploading ? (
          <p className="text-xs text-neutral-400">Subiendo…</p>
        ) : null}
        {uploadError ? (
          <p className="text-xs text-red-400">{uploadError}</p>
        ) : null}
      </div>

      {state.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Álbum guardado.</p>
      ) : null}
      <SaveButton label={album ? "Guardar" : "Añadir álbum"} />
    </form>
  );
}
