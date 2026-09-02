"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  createExperience,
  updateExperience,
  type ExperienceFormState,
} from "@/app/actions/experience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminMedia } from "@/components/admin/admin-media-provider";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import {
  EXPERIENCE_KIND_LABELS,
  EXPERIENCE_KINDS,
  toMonthInput,
  type Experience,
  type ExperienceKind,
} from "@/lib/experience";

const initialState: ExperienceFormState = { error: null, success: false };

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

export function ExperienceForm({ item }: { item?: Experience }) {
  const action = item ? updateExperience : createExperience;
  const [state, formAction] = useActionState(action, initialState);
  const [kind, setKind] = useState<ExperienceKind>(item?.kind ?? "employment");
  const [isCurrent, setIsCurrent] = useState(item?.isCurrent ?? false);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? "");
  const [previewUrl, setPreviewUrl] = useState(item?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { cloudinaryReady } = useAdminMedia();

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file, "portafolio/experience");
      setImageUrl(url);
      setPreviewUrl(url);
      URL.revokeObjectURL(localPreview);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "No se pudo subir la imagen."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="imageUrl" value={imageUrl} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-white">Empresa o lugar</Label>
          <Input
            name="orgName"
            required
            defaultValue={item?.orgName}
            placeholder="Nombre, marca o Freelance"
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Rol</Label>
          <Input
            name="role"
            required
            defaultValue={item?.role}
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-white">Tipo</Label>
          <Select
            value={kind}
            onValueChange={(value) => setKind(value as ExperienceKind)}
          >
            <SelectTrigger className="h-11 w-full bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_KINDS.map((name) => (
                <SelectItem key={name} value={name}>
                  {EXPERIENCE_KIND_LABELS[name]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Detalle del tipo</Label>
          <Input
            name="kindDetail"
            defaultValue={item?.kindDetail}
            placeholder={kind === "other" ? "Ej. Mentoría, Open source" : "Opcional"}
            required={kind === "other"}
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-white">Inicio</Label>
          <Input
            name="startOn"
            type="month"
            required
            defaultValue={toMonthInput(item?.startOn)}
            className="h-11 border-white/10 bg-white/5 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Fin</Label>
          <Input
            name="endOn"
            type="month"
            defaultValue={toMonthInput(item?.endOn)}
            disabled={isCurrent}
            required={!isCurrent}
            className="h-11 border-white/10 bg-white/5 text-white disabled:opacity-40"
          />
          <p className="text-xs text-neutral-500">
            Obligatorio si no es trabajo actual.
          </p>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Orden</Label>
          <Input
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={item?.sortOrder ?? 0}
            className="h-11 border-white/10 bg-white/5 text-white"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-300">
        <input
          type="checkbox"
          name="isCurrent"
          value="on"
          checked={isCurrent}
          onChange={(event) => setIsCurrent(event.target.checked)}
          className="size-4 rounded border-white/20 bg-white/5"
        />
        Trabajo actual
      </label>

      <div className="space-y-2">
        <Label className="text-white">Resumen</Label>
        <Textarea
          name="summary"
          defaultValue={item?.summary}
          rows={3}
          className="bg-white/5 border-white/10 text-white min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Logo o foto</Label>
        {!cloudinaryReady ? (
          <p className="text-xs text-amber-400">
            Configura Cloudinary en las variables de entorno para subir la
            imagen.
          </p>
        ) : null}
        <div className="flex items-center gap-4">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt=""
              className="size-16 rounded-xl border border-white/10 object-cover"
            />
          ) : (
            <div className="size-16 rounded-xl border border-dashed border-white/15 bg-white/5" />
          )}
          <Input
            type="file"
            accept="image/*"
            disabled={!cloudinaryReady || uploading}
            onChange={(event) => handleUpload(event.target.files?.[0])}
            className="h-11 border-white/10 bg-white/5 text-white file:text-white"
          />
        </div>
        {uploading ? (
          <p className="text-xs text-neutral-400">Subiendo…</p>
        ) : null}
        {uploadError ? (
          <p className="text-sm text-red-400">{uploadError}</p>
        ) : null}
      </div>

      {state.error ? <p className="text-sm text-red-400">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">
          {item ? "Experiencia actualizada." : "Experiencia añadida."}
        </p>
      ) : null}
      <SaveButton label={item ? "Guardar" : "Añadir"} />
    </form>
  );
}
