"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  archiveSocialLink,
  createSocialLink,
  type SocialFormState,
} from "@/app/actions/social";
import { SocialIcon } from "@/components/social-icon";
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
import { SOCIAL_ICON_NAMES, type SocialLink } from "@/lib/social";

const initialState: SocialFormState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200"
    >
      {pending ? "Añadiendo…" : "Añadir enlace"}
    </Button>
  );
}

export function SocialLinksManager({ links }: { links: SocialLink[] }) {
  const [state, formAction] = useActionState(createSocialLink, initialState);
  const [icon, setIcon] = useState<(typeof SOCIAL_ICON_NAMES)[number]>("github");

  return (
    <div className="space-y-8">
      <ul className="space-y-3">
        {links.map((link) => (
          <li
            key={link.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <SocialIcon name={link.icon} className="shrink-0 text-white" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {link.label}
                </p>
                <p className="truncate text-xs text-neutral-400">{link.href}</p>
              </div>
            </div>
            {link.id.startsWith("default-") ? (
              <span className="text-xs text-neutral-500">Ejemplo (sin fila)</span>
            ) : (
              <form action={archiveSocialLink.bind(null, link.id)}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="text-neutral-400 hover:text-white"
                >
                  Archivar
                </Button>
              </form>
            )}
          </li>
        ))}
      </ul>

      <form action={formAction} className="space-y-5 border-t border-white/10 pt-6">
        <input type="hidden" name="icon" value={icon} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="social-label" className="text-white">
              Nombre
            </Label>
            <Input
              id="social-label"
              name="label"
              required
              placeholder="GitHub"
              className="h-11 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Icono</Label>
            <Select
              value={icon}
              onValueChange={(value) =>
                setIcon(value as (typeof SOCIAL_ICON_NAMES)[number])
              }
            >
              <SelectTrigger className="h-11 w-full bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SOCIAL_ICON_NAMES.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="social-href" className="text-white">
            Enlace
          </Label>
          <Input
            id="social-href"
            name="href"
            required
            placeholder="https://… o correo"
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="social-handle" className="text-white">
            Texto visible (opcional)
          </Label>
          <Input
            id="social-handle"
            name="handle"
            placeholder="@usuario"
            className="h-11 bg-white/5 border-white/10 text-white"
          />
        </div>
        {state.error ? (
          <p className="text-sm text-red-400" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="text-sm text-emerald-400">Enlace añadido.</p>
        ) : null}
        <SubmitButton />
      </form>
    </div>
  );
}
