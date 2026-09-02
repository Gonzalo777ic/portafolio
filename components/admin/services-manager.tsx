"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  archiveService,
  createService,
  updateService,
  type ServiceFormState,
} from "@/app/actions/service";
import { ServiceFields } from "@/components/admin/service-fields";
import { ServiceGlyph } from "@/components/service-glyph";
import { Button } from "@/components/ui/button";
import type { Service, ServiceColor, ServiceIconName } from "@/lib/service";

const initialState: ServiceFormState = { error: null, success: false };

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

function ServiceEditor({ service }: { service: Service }) {
  const [state, formAction] = useActionState(updateService, initialState);
  const [icon, setIcon] = useState<ServiceIconName>(service.icon);
  const [iconColor, setIconColor] = useState<ServiceColor>(service.iconColor);
  const isDefault = service.id.startsWith("default-");

  return (
    <li className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <ServiceGlyph name={icon} color={iconColor} className="w-6 h-6" />
        <p className="text-sm font-medium text-white">{service.title}</p>
      </div>
      {isDefault ? (
        <p className="text-xs text-neutral-500">
          Ítem de ejemplo (sin fila en la base). Añade uno nuevo abajo.
        </p>
      ) : (
        <>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={service.id} />
            <ServiceFields
              idPrefix={service.id}
              title={service.title}
              description={service.description}
              icon={icon}
              iconColor={iconColor}
              sortOrder={service.sortOrder}
              onIconChange={setIcon}
              onColorChange={setIconColor}
            />
            {state.error ? (
              <p className="text-sm text-red-400">{state.error}</p>
            ) : null}
            {state.success ? (
              <p className="text-sm text-emerald-400">Servicio actualizado.</p>
            ) : null}
            <SaveButton label="Guardar" />
          </form>
          <form action={archiveService.bind(null, service.id)}>
            <Button
              type="submit"
              variant="ghost"
              className="text-neutral-400 hover:text-white"
            >
              Archivar
            </Button>
          </form>
        </>
      )}
    </li>
  );
}

function CreateServiceForm() {
  const [state, formAction] = useActionState(createService, initialState);
  const [icon, setIcon] = useState<ServiceIconName>("code");
  const [iconColor, setIconColor] = useState<ServiceColor>("cyan");

  return (
    <form action={formAction} className="space-y-4 border-t border-white/10 pt-6">
      <h3 className="text-sm font-medium text-white">Añadir servicio</h3>
      <ServiceFields
        idPrefix="new"
        icon={icon}
        iconColor={iconColor}
        onIconChange={setIcon}
        onColorChange={setIconColor}
      />
      {state.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Servicio añadido.</p>
      ) : null}
      <SaveButton label="Añadir" />
    </form>
  );
}

export function ServicesManager({ services }: { services: Service[] }) {
  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {services.map((service) => (
          <ServiceEditor key={service.id} service={service} />
        ))}
      </ul>
      <CreateServiceForm />
    </div>
  );
}
