"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  archiveAcademicLabel,
  createAcademicLabel,
  type AcademicFormState,
} from "@/app/actions/academic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buildAcademicTree,
  isSeedAcademicId,
  type AcademicLabel,
  type AcademicNode,
} from "@/lib/academic";

const initialState: AcademicFormState = { error: null, success: false };

function AddButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full bg-white text-black hover:bg-neutral-200 h-9 px-4"
    >
      {pending ? "…" : label}
    </Button>
  );
}

function AddLabelForm({
  parentId,
  placeholder,
  buttonLabel,
}: {
  parentId: string | null;
  placeholder: string;
  buttonLabel: string;
}) {
  const [state, formAction] = useActionState(createAcademicLabel, initialState);

  return (
    <form action={formAction} className="flex flex-wrap gap-2 items-center">
      {parentId ? <input type="hidden" name="parentId" value={parentId} /> : null}
      <Input
        name="label"
        required
        placeholder={placeholder}
        className="h-9 min-w-48 flex-1 bg-white/5 border-white/10 text-white"
      />
      <AddButton label={buttonLabel} />
      {state.error ? <p className="text-xs text-red-400 w-full">{state.error}</p> : null}
    </form>
  );
}

function LabelNode({ node, depth }: { node: AcademicNode; depth: number }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-white">
          <span className="text-neutral-500 mr-2">N{depth}</span>
          {node.label}
        </p>
        <form action={archiveAcademicLabel.bind(null, node.id)}>
          <Button type="submit" variant="ghost" className="text-neutral-400 hover:text-white h-8">
            Archivar
          </Button>
        </form>
      </div>
      {depth < 3 ? (
        <AddLabelForm
          parentId={node.id}
          placeholder={depth === 1 ? "Subtítulo o grupo (nivel 2)" : "Etiqueta (nivel 3)"}
          buttonLabel="Añadir hijo"
        />
      ) : null}
      {node.children.length > 0 ? (
        <ul className="space-y-3 pl-3 border-l border-white/10">
          {node.children.map((child) => (
            <LabelNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function AcademicLabelsManager({ labels }: { labels: AcademicLabel[] }) {
  const seeded = labels.some((item) => isSeedAcademicId(item.id));
  const roots = buildAcademicTree(labels);

  return (
    <div className="space-y-6">
      {seeded ? (
        <p className="text-sm text-neutral-400">
          Estas etiquetas son de ejemplo. Añade las reales con el formulario.
        </p>
      ) : (
        <>
          <AddLabelForm
            parentId={null}
            placeholder="Título de la tarjeta (nivel 1)"
            buttonLabel="Añadir tarjeta"
          />
          <ul className="space-y-4">
            {roots.map((root) => (
              <LabelNode key={root.id} node={root} depth={1} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
