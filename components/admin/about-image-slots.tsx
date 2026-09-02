"use client";

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { hasCloudinaryEnv, uploadImageToCloudinary } from "@/lib/cloudinary";
import { ABOUT_IMAGE_SLOTS } from "@/lib/about";

type AboutImageSlotsProps = {
  urls: string[];
  onChange: (urls: string[]) => void;
};

export function AboutImageSlots({ urls, onChange }: AboutImageSlotsProps) {
  const [busyIndex, setBusyIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cloudReady = hasCloudinaryEnv();
  const slots = Array.from({ length: ABOUT_IMAGE_SLOTS }, (_, i) => urls[i] ?? "");

  async function handleFile(index: number, file: File | undefined) {
    if (!file) return;
    setError(null);
    setBusyIndex(index);
    try {
      const url = await uploadImageToCloudinary(file);
      const next = [...slots];
      next[index] = url;
      onChange(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen.");
    } finally {
      setBusyIndex(null);
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-white">Imágenes del cubo (4 caras)</Label>
      {!cloudReady ? (
        <p className="text-xs text-amber-400">
          Configura Cloudinary en .env.local para reemplazar fotos.
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        {slots.map((url, index) => (
          <label
            key={index}
            className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
          >
            {url ? (
              <Image src={url} alt={`Cara ${index + 1}`} fill className="object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-neutral-500">
                Vacío
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center text-xs text-white">
              {busyIndex === index ? "Subiendo…" : `Cara ${index + 1}`}
            </span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={!cloudReady || busyIndex !== null}
              onChange={(event) => handleFile(index, event.target.files?.[0])}
            />
            {url ? <input type="hidden" name="imageUrls" value={url} /> : null}
          </label>
        ))}
      </div>
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
