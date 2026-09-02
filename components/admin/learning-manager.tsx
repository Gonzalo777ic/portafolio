"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  archiveLearningTopic,
  createLearningTopic,
  updateLearningTitle,
  updateLearningTopic,
  type LearningFormState,
} from "@/app/actions/learning";
import { LearningTopicFields } from "@/components/admin/learning-topic-fields";
import { LearningGlyph } from "@/components/learning-glyph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  isSeedLearningId,
  type LearningColor,
  type LearningIconName,
  type LearningSection,
  type LearningTopic,
} from "@/lib/learning";

const initialState: LearningFormState = { error: null, success: false };

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

function TitleForm({ title }: { title: string }) {
  const [state, formAction] = useActionState(updateLearningTitle, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="learning-title" className="text-white">
          Título del apartado
        </Label>
        <Input
          id="learning-title"
          name="title"
          required
          defaultValue={title}
          className="h-11 bg-white/5 border-white/10 text-white"
        />
      </div>
      {state.error ? <p className="text-sm text-red-400">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Título actualizado.</p>
      ) : null}
      <SaveButton label="Guardar título" />
    </form>
  );
}

function TopicEditor({ topic }: { topic: LearningTopic }) {
  const [state, formAction] = useActionState(updateLearningTopic, initialState);
  const [icon, setIcon] = useState<LearningIconName>(topic.icon);
  const [iconColor, setIconColor] = useState<LearningColor>(topic.iconColor);
  const seeded = isSeedLearningId(topic.id);

  return (
    <li className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <LearningGlyph name={icon} color={iconColor} className="w-6 h-6" />
        <p className="text-sm font-medium text-white">{topic.title}</p>
      </div>
      {seeded ? (
        <p className="text-xs text-neutral-500">
          Estos temas son de ejemplo. Añade los reales con el formulario de abajo.
        </p>
      ) : (
        <>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={topic.id} />
            <LearningTopicFields
              idPrefix={topic.id}
              title={topic.title}
              description={topic.description}
              icon={icon}
              iconColor={iconColor}
              sortOrder={topic.sortOrder}
              onIconChange={setIcon}
              onColorChange={setIconColor}
            />
            {state.error ? (
              <p className="text-sm text-red-400">{state.error}</p>
            ) : null}
            {state.success ? (
              <p className="text-sm text-emerald-400">Tema actualizado.</p>
            ) : null}
            <SaveButton label="Guardar" />
          </form>
          <form action={archiveLearningTopic.bind(null, topic.id)}>
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

function CreateTopicForm() {
  const [state, formAction] = useActionState(createLearningTopic, initialState);
  const [icon, setIcon] = useState<LearningIconName>("brain");
  const [iconColor, setIconColor] = useState<LearningColor>("violet");

  return (
    <form action={formAction} className="space-y-4 border-t border-white/10 pt-6">
      <h3 className="text-sm font-medium text-white">Añadir tema</h3>
      <LearningTopicFields
        idPrefix="new-learn"
        icon={icon}
        iconColor={iconColor}
        onIconChange={setIcon}
        onColorChange={setIconColor}
      />
      {state.error ? <p className="text-sm text-red-400">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm text-emerald-400">Tema añadido.</p>
      ) : null}
      <SaveButton label="Añadir" />
    </form>
  );
}

export function LearningManager({ learning }: { learning: LearningSection }) {
  const seeded = learning.topics.some((topic) => isSeedLearningId(topic.id));

  return (
    <div className="space-y-8">
      {seeded ? (
        <p className="text-sm text-neutral-400">
          Estos temas son de ejemplo. Configura DATABASE_URL para usar Prisma.
        </p>
      ) : (
        <TitleForm title={learning.title} />
      )}
      <ul className="space-y-4">
        {learning.topics.map((topic) => (
          <TopicEditor key={topic.id} topic={topic} />
        ))}
      </ul>
      {seeded ? null : <CreateTopicForm />}
    </div>
  );
}
