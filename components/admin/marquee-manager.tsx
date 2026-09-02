"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  archiveMarqueeWord,
  createMarqueeWord,
  updateMarqueeWord,
  type MarqueeFormState,
} from "@/app/actions/marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MarqueeRowIndex, MarqueeWord } from "@/lib/marquee";

const initialState: MarqueeFormState = { error: null, success: false };

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200 h-9"
    >
      {pending ? "…" : label}
    </Button>
  );
}

function WordRow({ word }: { word: MarqueeWord }) {
  const [state, formAction] = useActionState(updateMarqueeWord, initialState);
  const isDefault = word.id.startsWith("d1-") || word.id.startsWith("d2-");

  if (isDefault) {
    return (
      <li className="flex items-center justify-between gap-2 text-sm text-neutral-300">
        <span>{word.label}</span>
        <span className="text-xs text-neutral-500">SQL</span>
      </li>
    );
  }

  return (
    <li className="space-y-2 rounded-xl border border-white/10 p-3">
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        <input type="hidden" name="id" value={word.id} />
        <input type="hidden" name="rowIndex" value={word.rowIndex} />
        <Input
          name="label"
          defaultValue={word.label}
          className="h-9 flex-1 bg-white/5 border-white/10 text-white"
        />
        <Input
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={word.sortOrder}
          className="h-9 w-20 bg-white/5 border-white/10 text-white"
        />
        <SaveButton label="Guardar" />
      </form>
      <form action={archiveMarqueeWord.bind(null, word.id)}>
        <Button type="submit" variant="ghost" className="h-8 text-neutral-400">
          Archivar
        </Button>
      </form>
      {state.error ? <p className="text-xs text-red-400">{state.error}</p> : null}
    </li>
  );
}

function AddWordForm({ rowIndex }: { rowIndex: MarqueeRowIndex }) {
  const [state, formAction] = useActionState(createMarqueeWord, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2 pt-3">
      <input type="hidden" name="rowIndex" value={rowIndex} />
      <Input
        name="label"
        required
        placeholder="Nueva palabra"
        className="h-9 flex-1 bg-white/5 border-white/10 text-white"
      />
      <SaveButton label="Añadir" />
      {state.error ? (
        <p className="w-full text-xs text-red-400">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="w-full text-xs text-emerald-400">Añadida.</p>
      ) : null}
    </form>
  );
}

export function MarqueeManager({ words }: { words: MarqueeWord[] }) {
  const rows: { index: MarqueeRowIndex; title: string }[] = [
    { index: 1, title: "Fila de fondo" },
    { index: 2, title: "Fila principal" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.index}
          className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h3 className="text-sm font-medium text-white">{row.title}</h3>
          <ul className="space-y-2">
            {words
              .filter((word) => word.rowIndex === row.index)
              .map((word) => (
                <WordRow key={word.id} word={word} />
              ))}
          </ul>
          <AddWordForm rowIndex={row.index} />
        </div>
      ))}
    </div>
  );
}
