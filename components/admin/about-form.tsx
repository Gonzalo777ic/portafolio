"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateAbout, type AboutFormState } from "@/app/actions/about";
import { AboutImageSlots } from "@/components/admin/about-image-slots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cubeImageUrls, defaultAbout, type About } from "@/lib/about";

const initialState: AboutFormState = { error: null, success: false };

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

export function AboutForm({ about }: { about: About }) {
  const [state, formAction] = useActionState(updateAbout, initialState);
  const [imageUrls, setImageUrls] = useState(() => cubeImageUrls(about.imageUrls));

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="about-label" className="text-white">
          Etiqueta
        </Label>
        <Input
          id="about-label"
          name="label"
          required
          defaultValue={about.label}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about-title" className="text-white">
          Título
        </Label>
        <Input
          id="about-title"
          name="title"
          required
          defaultValue={about.title}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about-titleAccent" className="text-white">
          Título (gradiente)
        </Label>
        <Textarea
          id="about-titleAccent"
          name="titleAccent"
          defaultValue={about.titleAccent}
          rows={3}
          className="bg-white/5 border-white/10 text-white min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about-body" className="text-white">
          Contenido
        </Label>
        <Textarea
          id="about-body"
          name="body"
          required
          defaultValue={about.body}
          rows={8}
          className="bg-white/5 border-white/10 text-white min-h-40"
        />
        </div>

        <div className="space-y-2">
          <Label htmlFor="about-roles" className="text-white">
            Roles (Contacto)
          </Label>
          <Input
            id="about-roles"
            name="roleTags"
            defaultValue={(about.roleTags ?? defaultAbout.roleTags).join(", ")}
            placeholder="Developer, Software Engineer"
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>

      <div className="border-t border-white/10 pt-6 space-y-6">
        <p className="text-sm text-neutral-400">
          Página Acerca de. Las imágenes son las mismas del cubo en Home.
        </p>
        <div className="space-y-2">
          <Label htmlFor="about-pageTitle" className="text-white">
            Título (Acerca de)
          </Label>
          <Input
            id="about-pageTitle"
            name="pageTitle"
            required
            defaultValue={about.pageTitle || defaultAbout.pageTitle}
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-pageTitleAccent" className="text-white">
            Título gradiente (Acerca de)
          </Label>
          <Input
            id="about-pageTitleAccent"
            name="pageTitleAccent"
            defaultValue={about.pageTitleAccent ?? defaultAbout.pageTitleAccent}
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-pageBody" className="text-white">
            Descripción (Acerca de)
          </Label>
          <Textarea
            id="about-pageBody"
            name="pageBody"
            required
            defaultValue={about.pageBody || defaultAbout.pageBody}
            rows={10}
            className="bg-white/5 border-white/10 text-white min-h-48"
          />
          <p className="text-xs text-neutral-500">
            Separa párrafos con una línea en blanco. Usa **texto** para negrita.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="about-caption" className="text-white">
            Pie del carrusel
          </Label>
          <Input
            id="about-caption"
            name="carouselCaption"
            defaultValue={about.carouselCaption || defaultAbout.carouselCaption}
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <AboutImageSlots urls={imageUrls} onChange={setImageUrls} />

      {state.error ? (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-emerald-400">Sobre mí y Acerca de actualizados.</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
