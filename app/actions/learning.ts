"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { LEARNING_SECTION_ID } from "@/lib/learning";
import {
  learningTitleSchema,
  learningTopicIdSchema,
  learningTopicSchema,
} from "@/lib/learning-schema";

export type LearningFormState = {
  error: string | null;
  success: boolean;
};

function revalidateLearning() {
  revalidatePath("/about");
  revalidatePath("/admin", "layout");
}

function parseTopic(formData: FormData) {
  return learningTopicSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    iconColor: formData.get("iconColor"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });
}

export async function updateLearningTitle(
  _prev: LearningFormState,
  formData: FormData
): Promise<LearningFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = learningTitleSchema.safeParse({
    title: formData.get("title"),
  });
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.learningSection.upsert({
      where: { id: LEARNING_SECTION_ID },
      create: {
        id: LEARNING_SECTION_ID,
        title: parsed.data.title,
      },
      update: { title: parsed.data.title },
    });
  } catch {
    return {
      error: "No se pudo guardar el título. Revisa Prisma y learning_section.",
      success: false,
    };
  }

  revalidateLearning();
  return { error: null, success: true };
}

export async function createLearningTopic(
  _prev: LearningFormState,
  formData: FormData
): Promise<LearningFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseTopic(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.learningTopic.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        icon: parsed.data.icon,
        iconColor: parsed.data.iconColor,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo crear el tema. Revisa Prisma y learning_topics.",
      success: false,
    };
  }

  revalidateLearning();
  return { error: null, success: true };
}

export async function updateLearningTopic(
  _prev: LearningFormState,
  formData: FormData
): Promise<LearningFormState> {
  const id = learningTopicIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseTopic(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.learningTopic.updateMany({
      where: { id: id.data, deletedAt: null },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        icon: parsed.data.icon,
        iconColor: parsed.data.iconColor,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return { error: "No se pudo guardar el tema.", success: false };
  }

  revalidateLearning();
  return { error: null, success: true };
}

export async function archiveLearningTopic(
  id: string
): Promise<LearningFormState> {
  const parsedId = learningTopicIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.learningTopic.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar el tema.", success: false };
  }

  revalidateLearning();
  return { error: null, success: true };
}
