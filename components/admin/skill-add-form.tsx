"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createSkill, type SkillFormState } from "@/app/actions/skill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findCatalogItem, TECH_CATALOG } from "@/lib/skill-catalog";
import { hasCloudinaryEnv, uploadImageToCloudinary } from "@/lib/cloudinary";
import type { SkillCategory } from "@/lib/skill";

const initialState: SkillFormState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200"
    >
      {pending ? "Añadiendo…" : "Añadir"}
    </Button>
  );
}

export function SkillAddForm({ category }: { category: SkillCategory }) {
  const [state, formAction] = useActionState(createSkill, initialState);
  const [mode, setMode] = useState<"catalog" | "custom">("catalog");
  const [catalogKey, setCatalogKey] = useState(TECH_CATALOG[0]?.key ?? "react");
  const [customName, setCustomName] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const catalogItem = findCatalogItem(catalogKey);
  const name = mode === "catalog" ? catalogItem?.name ?? "" : customName;
  const iconUrl = mode === "catalog" ? catalogItem?.iconUrl ?? "" : customUrl;
  const iconKey = mode === "catalog" ? catalogKey : "custom";

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file, "portafolio/skills");
      setCustomUrl(url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "No se pudo subir el logo."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="iconUrl" value={iconUrl} />
      <input type="hidden" name="iconKey" value={iconKey} />

      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "catalog" ? "secondary" : "ghost"}
          className="flex-1"
          onClick={() => setMode("catalog")}
        >
          Icono del catálogo
        </Button>
        <Button
          type="button"
          variant={mode === "custom" ? "secondary" : "ghost"}
          className="flex-1"
          onClick={() => setMode("custom")}
        >
          Nombre + logo
        </Button>
      </div>

      {mode === "catalog" ? (
        <div className="space-y-2">
          <Label className="text-white">Tecnología</Label>
          <Select value={catalogKey} onValueChange={setCatalogKey}>
            <SelectTrigger className="h-11 w-full bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TECH_CATALOG.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor={`skill-name-${category}`} className="text-white">
              Nombre
            </Label>
            <Input
              id={`skill-name-${category}`}
              value={customName}
              onChange={(event) => setCustomName(event.target.value)}
              placeholder="PyTorch"
              className="h-11 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Logo</Label>
            {!hasCloudinaryEnv() ? (
              <p className="text-xs text-amber-400">
                Configura Cloudinary para subir un logo.
              </p>
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
            {customUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={customUrl} alt="" className="h-8 w-8 object-contain" />
            ) : null}
            {uploadError ? (
              <p className="text-xs text-red-400">{uploadError}</p>
            ) : null}
          </div>
        </div>
      )}

      {state.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Tecnología añadida.</p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
