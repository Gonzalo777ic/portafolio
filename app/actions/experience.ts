"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { monthToDate } from "@/lib/experience";
import { experienceIdSchema, experienceSchema } from "@/lib/experience-schema";

export type ExperienceFormState = {
  error: string | null;
  success: boolean;
};

function revalidateExperience() {
  revalidatePath("/about");
  revalidatePath("/admin");
}

function parseExperience(formData: FormData) {
  return experienceSchema.safeParse({
    orgName: formData.get("orgName"),
    role: formData.get("role"),
    kind: formData.get("kind"),
    kindDetail: formData.get("kindDetail") ?? "",
    startOn: formData.get("startOn"),
    endOn: formData.get("endOn") ?? "",
    isCurrent: formData.get("isCurrent") === "on",
    summary: formData.get("summary") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    sortOrder: formData.get("sortOrder") ?? 0,
  });
}

function toDay(value: string) {
  return new Date(`${value}T12:00:00.000Z`);
}

export async function createExperience(
  _prev: ExperienceFormState,
  formData: FormData
): Promise<ExperienceFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseExperience(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.experience.create({
      data: {
        orgName: parsed.data.orgName,
        role: parsed.data.role,
        kind: parsed.data.kind,
        kindDetail: parsed.data.kindDetail,
        startOn: toDay(monthToDate(parsed.data.startOn)),
        endOn:
          parsed.data.isCurrent || !parsed.data.endOn
            ? null
            : toDay(monthToDate(parsed.data.endOn)),
        isCurrent: parsed.data.isCurrent,
        summary: parsed.data.summary,
        imageUrl: parsed.data.imageUrl,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo crear. Revisa Prisma y experience.",
      success: false,
    };
  }

  revalidateExperience();
  return { error: null, success: true };
}

export async function updateExperience(
  _prev: ExperienceFormState,
  formData: FormData
): Promise<ExperienceFormState> {
  const id = experienceIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseExperience(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.experience.updateMany({
      where: { id: id.data, deletedAt: null },
      data: {
        orgName: parsed.data.orgName,
        role: parsed.data.role,
        kind: parsed.data.kind,
        kindDetail: parsed.data.kindDetail,
        startOn: toDay(monthToDate(parsed.data.startOn)),
        endOn:
          parsed.data.isCurrent || !parsed.data.endOn
            ? null
            : toDay(monthToDate(parsed.data.endOn)),
        isCurrent: parsed.data.isCurrent,
        summary: parsed.data.summary,
        imageUrl: parsed.data.imageUrl,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return { error: "No se pudo guardar la experiencia.", success: false };
  }

  revalidateExperience();
  return { error: null, success: true };
}

export async function archiveExperience(
  id: string
): Promise<ExperienceFormState> {
  const parsedId = experienceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.experience.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar.", success: false };
  }

  revalidateExperience();
  return { error: null, success: true };
}
