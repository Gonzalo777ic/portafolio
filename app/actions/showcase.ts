"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { showcaseSchema } from "@/lib/showcase-schema";
import { SHOWCASE_ID } from "@/lib/showcase";
import { prisma } from "@/lib/prisma";

export type ShowcaseFormState = {
  error: string | null;
  success: boolean;
};

export async function updateShowcase(
  _prev: ShowcaseFormState,
  formData: FormData
): Promise<ShowcaseFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = showcaseSchema.safeParse({
    title: formData.get("title"),
    titleAccent: formData.get("titleAccent") ?? "",
    subtitle: formData.get("subtitle"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.showcase.upsert({
      where: { id: SHOWCASE_ID },
      create: {
        id: SHOWCASE_ID,
        title: parsed.data.title,
        titleAccent: parsed.data.titleAccent,
        subtitle: parsed.data.subtitle,
      },
      update: {
        title: parsed.data.title,
        titleAccent: parsed.data.titleAccent,
        subtitle: parsed.data.subtitle,
      },
    });
  } catch {
    return {
      error: "No se pudo guardar. Revisa Prisma y la tabla showcase.",
      success: false,
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { error: null, success: true };
}
