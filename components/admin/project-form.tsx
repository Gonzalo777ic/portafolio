"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  createProject,
  updateProject,
  type ProjectFormState,
} from "@/app/actions/project";
import { ProjectImageUploader } from "@/components/admin/project-image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/lib/projects-data";

const initialState: ProjectFormState = { error: null, success: false };

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

export function ProjectForm({ project }: { project?: Project }) {
  const action = project ? updateProject : createProject;
  const [state, formAction] = useActionState(action, initialState);
  const [images, setImages] = useState(project?.images ?? []);

  return (
    <form action={formAction} className="space-y-4">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="space-y-2">
        <Label className="text-white">Título</Label>
        <Input
          name="title"
          required
          defaultValue={project?.title}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Descripción</Label>
        <Textarea
          name="description"
          required
          defaultValue={project?.description}
          rows={4}
          className="bg-white/5 border-white/10 text-white min-h-28"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Puntos clave (uno por línea)</Label>
        <Textarea
          name="features"
          defaultValue={project?.features.join("\n")}
          rows={4}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Etiquetas (separadas por coma)</Label>
        <Input
          name="tags"
          defaultValue={project?.tags.join(", ")}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">GitHub (frontend o repo principal)</Label>
        <Input
          name="github"
          defaultValue={project?.github}
          placeholder="https://github.com/..."
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">GitHub backend (opcional)</Label>
        <Input
          name="githubBackend"
          defaultValue={project?.githubBackend}
          placeholder="https://github.com/..."
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Demo o enlace externo (opcional)</Label>
        <Input
          name="demo"
          defaultValue={project?.demo}
          placeholder="https://..."
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="size-4"
          />
          Destacado en “Algunos Proyectos”
        </label>
        <Input
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={project?.sortOrder ?? 0}
          className="h-11 w-24 bg-white/5 border-white/10 text-white"
        />
      </div>

      <ProjectImageUploader urls={images} onChange={setImages} />

      {state.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Proyecto guardado.</p>
      ) : null}

      <SaveButton label={project ? "Guardar" : "Añadir proyecto"} />
    </form>
  );
}
