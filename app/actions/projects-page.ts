"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { PROJECTS_PAGE_ID } from "@/lib/projects-page";
import { projectsPageSchema } from "@/lib/projects-page-schema";

export type ProjectsPageFormState = {
  error: string | null;
  success: boolean;
};

export async function updateProjectsPage(
  _prev: ProjectsPageFormState,
  formData: FormData
): Promise<ProjectsPageFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = projectsPageSchema.safeParse({
    kicker: formData.get("kicker"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.projectsPage.upsert({
      where: { id: PROJECTS_PAGE_ID },
      create: {
        id: PROJECTS_PAGE_ID,
        kicker: parsed.data.kicker,
        title: parsed.data.title,
        subtitle: parsed.data.subtitle,
      },
      update: {
        kicker: parsed.data.kicker,
        title: parsed.data.title,
        subtitle: parsed.data.subtitle,
      },
    });
  } catch {
    return {
      error: "No se pudo guardar. Revisa Prisma y projects_page.",
      success: false,
    };
  }

  revalidatePath("/projects");
  revalidatePath("/admin");
  return { error: null, success: true };
}
