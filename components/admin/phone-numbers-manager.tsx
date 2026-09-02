"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  archivePhoneNumber,
  createPhoneNumber,
  type PhoneFormState,
} from "@/app/actions/phone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PhoneNumber } from "@/lib/phone";

const initialState: PhoneFormState = { error: null, success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200"
    >
      {pending ? "Añadiendo…" : "Añadir número"}
    </Button>
  );
}

export function PhoneNumbersManager({ phones }: { phones: PhoneNumber[] }) {
  const [state, formAction] = useActionState(createPhoneNumber, initialState);

  return (
    <div className="space-y-8">
      <ul className="space-y-3">
        {phones.length === 0 ? (
          <li className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-neutral-500">
            Aún no hay números. Añade uno o varios abajo.
          </li>
        ) : (
          phones.map((phone) => (
            <li
              key={phone.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {phone.label}
                </p>
                <p className="truncate text-xs text-neutral-400">{phone.number}</p>
              </div>
              <form action={archivePhoneNumber.bind(null, phone.id)}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="text-neutral-400 hover:text-white"
                >
                  Archivar
                </Button>
              </form>
            </li>
          ))
        )}
      </ul>

      <form
        action={formAction}
        className="space-y-5 border-t border-white/10 pt-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone-label" className="text-white">
              Etiqueta
            </Label>
            <Input
              id="phone-label"
              name="label"
              required
              placeholder="Personal, WhatsApp, Oficina…"
              className="h-11 border-white/10 bg-white/5 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-sort" className="text-white">
              Orden
            </Label>
            <Input
              id="phone-sort"
              name="sortOrder"
              type="number"
              min={0}
              defaultValue={phones.length}
              className="h-11 border-white/10 bg-white/5 text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number" className="text-white">
            Número
          </Label>
          <Input
            id="phone-number"
            name="number"
            required
            placeholder="+51 999 999 999"
            className="h-11 border-white/10 bg-white/5 text-white"
          />
        </div>
        {state.error ? (
          <p className="text-sm text-red-400" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="text-sm text-emerald-400">Número añadido.</p>
        ) : null}
        <SubmitButton />
      </form>
    </div>
  );
}
