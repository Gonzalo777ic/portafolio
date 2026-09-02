"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { FOOTER_ID } from "@/lib/footer";
import { footerSchema } from "@/lib/footer-schema";

export type FooterFormState = {
  error: string | null;
  success: boolean;
};

export async function updateFooter(
  _prev: FooterFormState,
  formData: FormData
): Promise<FooterFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = footerSchema.safeParse({
    bio: formData.get("bio"),
    photoUrl: formData.get("photoUrl"),
    copyrightText: formData.get("copyrightText"),
    badgeText: formData.get("badgeText") ?? "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.footer.upsert({
      where: { id: FOOTER_ID },
      create: {
        id: FOOTER_ID,
        bio: parsed.data.bio,
        photoUrl: parsed.data.photoUrl,
        copyrightText: parsed.data.copyrightText,
        badgeText: parsed.data.badgeText,
      },
      update: {
        bio: parsed.data.bio,
        photoUrl: parsed.data.photoUrl,
        copyrightText: parsed.data.copyrightText,
        badgeText: parsed.data.badgeText,
      },
    });
  } catch {
    return {
      error: "No se pudo guardar. Revisa Prisma y footer.",
      success: false,
    };
  }

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin", "layout");
  return { error: null, success: true };
}
