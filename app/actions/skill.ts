"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { skillIdSchema, skillSchema } from "@/lib/skill-schema";

export type SkillFormState = {
  error: string | null;
  success: boolean;
};

function revalidateSkills() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
}

function parseSkill(formData: FormData) {
  return skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    iconUrl: formData.get("iconUrl"),
    iconKey: formData.get("iconKey") || "custom",
    sortOrder: formData.get("sortOrder") ?? 0,
  });
}

export async function createSkill(
  _prev: SkillFormState,
  formData: FormData
): Promise<SkillFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseSkill(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.skill.create({
      data: {
        name: parsed.data.name,
        category: parsed.data.category,
        iconUrl: parsed.data.iconUrl,
        iconKey: parsed.data.iconKey,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo crear la tecnología. Revisa Prisma y skills.",
      success: false,
    };
  }

  revalidateSkills();
  return { error: null, success: true };
}

export async function archiveSkill(id: string): Promise<SkillFormState> {
  const parsedId = skillIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.skill.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar la tecnología.", success: false };
  }

  revalidateSkills();
  return { error: null, success: true };
}
