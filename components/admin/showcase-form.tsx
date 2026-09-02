"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateShowcase, type ShowcaseFormState } from "@/app/actions/showcase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Showcase } from "@/lib/showcase";

const initialState: ShowcaseFormState = { error: null, success: false };

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

export function ShowcaseForm({ showcase }: { showcase: Showcase }) {
  const [state, formAction] = useActionState(updateShowcase, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">
          Título
        </Label>
        <Textarea
          id="title"
          name="title"
          required
          defaultValue={showcase.title}
          rows={3}
          className="bg-white/5 border-white/10 text-white min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="titleAccent" className="text-white">
          Énfasis (itálica)
        </Label>
        <Input
          id="titleAccent"
          name="titleAccent"
          defaultValue={showcase.titleAccent}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle" className="text-white">
          Subtítulo
        </Label>
        <Textarea
          id="subtitle"
          name="subtitle"
          required
          defaultValue={showcase.subtitle}
          rows={4}
          className="bg-white/5 border-white/10 text-white min-h-28"
        />
        <p className="text-xs text-neutral-500">
          Usa **texto** para resaltar en negrita.
        </p>
      </div>

      {state.error ? (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-emerald-400">Escaparate actualizado.</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
