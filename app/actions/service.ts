"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { serviceIdSchema, serviceSchema } from "@/lib/service-schema";

export type ServiceFormState = {
  error: string | null;
  success: boolean;
};

function revalidateServices() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

function parseService(formData: FormData) {
  return serviceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    iconColor: formData.get("iconColor"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });
}

export async function createService(
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseService(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.service.create({
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
      error: "No se pudo crear el servicio. Revisa Prisma y services.",
      success: false,
    };
  }

  revalidateServices();
  return { error: null, success: true };
}

export async function updateService(
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const id = serviceIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = parseService(formData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.service.updateMany({
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
    return { error: "No se pudo guardar el servicio.", success: false };
  }

  revalidateServices();
  return { error: null, success: true };
}

export async function archiveService(id: string): Promise<ServiceFormState> {
  const parsedId = serviceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.service.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar el servicio.", success: false };
  }

  revalidateServices();
  return { error: null, success: true };
}
