"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  updateProjectsPage,
  type ProjectsPageFormState,
} from "@/app/actions/projects-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectsPage } from "@/lib/projects-page";

const initialState: ProjectsPageFormState = { error: null, success: false };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200"
    >
      {pending ? "Guardando…" : "Guardar encabezado"}
    </Button>
  );
}

export function ProjectsPageForm({ page }: { page: ProjectsPage }) {
  const [state, formAction] = useActionState(updateProjectsPage, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Etiqueta</Label>
        <Input
          name="kicker"
          required
          defaultValue={page.kicker}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Título</Label>
        <Input
          name="title"
          required
          defaultValue={page.title}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Subtítulo</Label>
        <Textarea
          name="subtitle"
          required
          defaultValue={page.subtitle}
          rows={3}
          className="bg-white/5 border-white/10 text-white min-h-20"
        />
      </div>
      {state.error ? <p className="text-sm text-red-400">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Encabezado actualizado.</p>
      ) : null}
      <SaveButton />
    </form>
  );
}
