"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { phoneIdSchema, phoneNumberSchema } from "@/lib/phone-schema";

export type PhoneFormState = {
  error: string | null;
  success: boolean;
};

function revalidatePhones() {
  revalidatePath("/contact");
  revalidatePath("/admin", "layout");
}

export async function createPhoneNumber(
  _prev: PhoneFormState,
  formData: FormData
): Promise<PhoneFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = phoneNumberSchema.safeParse({
    label: formData.get("label"),
    number: formData.get("number"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.phoneNumber.create({
      data: {
        label: parsed.data.label,
        number: parsed.data.number,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch {
    return {
      error: "No se pudo guardar. Ejecuta pnpm db:push si falta la tabla.",
      success: false,
    };
  }

  revalidatePhones();
  return { error: null, success: true };
}

export async function archivePhoneNumber(id: string): Promise<PhoneFormState> {
  const parsedId = phoneIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.phoneNumber.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar el número.", success: false };
  }

  revalidatePhones();
  return { error: null, success: true };
}
