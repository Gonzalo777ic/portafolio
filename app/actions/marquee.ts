"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { marqueeIdSchema, marqueeWordSchema } from "@/lib/marquee-schema";

export type MarqueeFormState = {
  error: string | null;
  success: boolean;
};

function revalidateMarquee() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createMarqueeWord(
  _prev: MarqueeFormState,
  formData: FormData
): Promise<MarqueeFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = marqueeWordSchema.safeParse({
    label: formData.get("label"),
    rowIndex: formData.get("rowIndex"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.marqueeWord.create({
      data: {
        label: parsed.data.label.toUpperCase(),
        rowIndex: parsed.data.rowIndex,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo crear la palabra. Revisa Prisma y marquee_words.",
      success: false,
    };
  }

  revalidateMarquee();
  return { error: null, success: true };
}

export async function updateMarqueeWord(
  _prev: MarqueeFormState,
  formData: FormData
): Promise<MarqueeFormState> {
  const id = marqueeIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = marqueeWordSchema.safeParse({
    label: formData.get("label"),
    rowIndex: formData.get("rowIndex"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.marqueeWord.updateMany({
      where: { id: id.data, deletedAt: null },
      data: {
        label: parsed.data.label.toUpperCase(),
        rowIndex: parsed.data.rowIndex,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return { error: "No se pudo guardar la palabra.", success: false };
  }

  revalidateMarquee();
  return { error: null, success: true };
}

export async function archiveMarqueeWord(
  id: string
): Promise<MarqueeFormState> {
  const parsedId = marqueeIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.marqueeWord.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar la palabra.", success: false };
  }

  revalidateMarquee();
  return { error: null, success: true };
}
