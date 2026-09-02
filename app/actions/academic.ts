"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { academicDepth } from "@/lib/academic";
import { getAcademicLabels } from "@/lib/academic-data";
import { academicIdSchema, academicLabelSchema } from "@/lib/academic-schema";

export type AcademicFormState = {
  error: string | null;
  success: boolean;
};

function revalidateAcademic() {
  revalidatePath("/about");
  revalidatePath("/admin");
}

export async function createAcademicLabel(
  _prev: AcademicFormState,
  formData: FormData
): Promise<AcademicFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parentRaw = String(formData.get("parentId") ?? "").trim();
  const parsed = academicLabelSchema.safeParse({
    label: formData.get("label"),
    parentId: parentRaw || null,
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  const labels = await getAcademicLabels();
  const parentDepth = academicDepth(labels, parsed.data.parentId);
  if (parentDepth >= 3) {
    return { error: "Máximo 3 niveles de etiquetas.", success: false };
  }

  const siblingMax = labels
    .filter((item) => item.parentId === parsed.data.parentId)
    .reduce((max, item) => Math.max(max, item.sortOrder), -1);

  try {
    await prisma.academicLabel.create({
      data: {
        label: parsed.data.label,
        parentId: parsed.data.parentId,
        sortOrder: siblingMax + 1,
      },
    });
  } catch {
    return {
      error: "No se pudo crear la etiqueta. Revisa Prisma y academic_labels.",
      success: false,
    };
  }

  revalidateAcademic();
  return { error: null, success: true };
}

export async function archiveAcademicLabel(
  id: string
): Promise<AcademicFormState> {
  const parsedId = academicIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const labels = await getAcademicLabels();
  const ids = collectDescendants(labels, parsedId.data);

  try {
    await prisma.academicLabel.updateMany({
      where: { id: { in: ids }, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar la etiqueta.", success: false };
  }

  revalidateAcademic();
  return { error: null, success: true };
}

function collectDescendants(
  labels: { id: string; parentId: string | null }[],
  rootId: string
) {
  const ids = [rootId];
  const queue = [rootId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    labels
      .filter((item) => item.parentId === current)
      .forEach((child) => {
        ids.push(child.id);
        queue.push(child.id);
      });
  }
  return ids;
}
