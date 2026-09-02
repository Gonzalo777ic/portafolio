"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { parseProjectForm, projectIdSchema } from "@/lib/project-schema";

export type ProjectFormState = {
  error: string | null;
  success: boolean;
};

function revalidateProjects() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin", "layout");
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function createProject(
  _prev: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.project.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        features: parsed.data.features,
        tags: parsed.data.tags,
        imageUrls: parsed.data.images,
        github: normalizeUrl(parsed.data.github),
        githubBackend: normalizeUrl(parsed.data.githubBackend),
        demo: normalizeUrl(parsed.data.demo),
        featured: parsed.data.featured,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo crear el proyecto. Revisa Prisma y projects.",
      success: false,
    };
  }

  revalidateProjects();
  return { error: null, success: true };
}

export async function updateProject(
  _prev: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const id = projectIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.project.updateMany({
      where: { id: id.data, deletedAt: null },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        features: parsed.data.features,
        tags: parsed.data.tags,
        imageUrls: parsed.data.images,
        github: normalizeUrl(parsed.data.github),
        githubBackend: normalizeUrl(parsed.data.githubBackend),
        demo: normalizeUrl(parsed.data.demo),
        featured: parsed.data.featured,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return { error: "No se pudo guardar el proyecto.", success: false };
  }

  revalidateProjects();
  return { error: null, success: true };
}

export async function archiveProject(id: string): Promise<ProjectFormState> {
  const parsedId = projectIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.project.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar el proyecto.", success: false };
  }

  revalidateProjects();
  return { error: null, success: true };
}
