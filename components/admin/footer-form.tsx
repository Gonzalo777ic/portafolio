"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateFooter, type FooterFormState } from "@/app/actions/footer";
import { useAdminMedia } from "@/components/admin/admin-media-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import type { FooterContent } from "@/lib/footer";

const initialState: FooterFormState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200"
    >
      {pending ? "Guardando…" : "Guardar"}
    </Button>
  );
}

export function FooterForm({ footer }: { footer: FooterContent }) {
  const [state, formAction] = useActionState(updateFooter, initialState);
  const [photoUrl, setPhotoUrl] = useState(footer.photoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { cloudinaryReady } = useAdminMedia();

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file, "portafolio/footer");
      setPhotoUrl(url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "No se pudo subir la foto."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="photoUrl" value={photoUrl} />

      <div className="space-y-2">
        <Label className="text-white">Texto</Label>
        <Textarea
          name="bio"
          required
          defaultValue={footer.bio}
          rows={4}
          className="bg-white/5 border-white/10 text-white min-h-28"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Copyright</Label>
        <Input
          name="copyrightText"
          required
          defaultValue={footer.copyrightText}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
        <p className="text-xs text-neutral-500">
          El año se añade solo delante.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Badge</Label>
        <Input
          name="badgeText"
          defaultValue={footer.badgeText}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Foto circular</Label>
        {!cloudinaryReady ? (
          <p className="text-xs text-amber-400">
            Configura Cloudinary en las variables de entorno para cambiar la
            foto.
          </p>
        ) : null}
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt=""
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : null}
        <Input
          type="file"
          accept="image/*"
          disabled={!cloudinaryReady || uploading}
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
        <p className="text-sm text-emerald-400">Footer actualizado.</p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
