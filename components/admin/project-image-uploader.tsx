"use client";

import { useState } from "react";
import { useAdminMedia } from "@/components/admin/admin-media-provider";
import { Label } from "@/components/ui/label";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export function ProjectImageUploader({
  urls,
  onChange,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cloudinaryReady: cloudReady } = useAdminMedia();

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(
          await uploadImageToCloudinary(file, "portafolio/projects")
        );
      }
      onChange([...urls, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imágenes.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-white">Imágenes (N)</Label>
      {!cloudReady ? (
        <p className="text-xs text-amber-400">
          Configura Cloudinary en las variables de entorno para subir capturas.
        </p>
      ) : null}
      <div className="grid grid-cols-3 gap-2">
        {urls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative aspect-video overflow-hidden rounded-lg border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              className="absolute right-1 top-1 rounded bg-black/70 px-1.5 text-xs text-white"
              onClick={() => onChange(urls.filter((_, i) => i !== index))}
            >
              ×
            </button>
            <input type="hidden" name="images" value={url} />
          </div>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={!cloudReady || busy}
        onChange={(event) => handleFiles(event.target.files)}
        className="text-sm text-neutral-300"
      />
      {busy ? <p className="text-xs text-neutral-400">Subiendo…</p> : null}
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
