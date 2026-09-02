"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { socialIdSchema, socialLinkSchema } from "@/lib/social-schema";
import { normalizeSocialHref, type SocialIconName } from "@/lib/social";

export type SocialFormState = {
  error: string | null;
  success: boolean;
};

function revalidateSocials() {
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin");
}

export async function createSocialLink(
  _prev: SocialFormState,
  formData: FormData
): Promise<SocialFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = socialLinkSchema.safeParse({
    label: formData.get("label"),
    href: formData.get("href"),
    handle: formData.get("handle") ?? "",
    icon: formData.get("icon"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.socialLink.create({
      data: {
        label: parsed.data.label,
        href: normalizeSocialHref(
          parsed.data.icon as SocialIconName,
          parsed.data.href
        ),
        handle: parsed.data.handle,
        icon: parsed.data.icon,
      },
    });
  } catch {
    return {
      error: "No se pudo crear el enlace. Revisa Prisma y social_links.",
      success: false,
    };
  }

  revalidateSocials();
  return { error: null, success: true };
}

export async function archiveSocialLink(id: string): Promise<SocialFormState> {
  const parsedId = socialIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Id inválido.", success: false };

  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  try {
    await prisma.socialLink.updateMany({
      where: { id: parsedId.data, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch {
    return { error: "No se pudo archivar el enlace.", success: false };
  }

  revalidateSocials();
  return { error: null, success: true };
}
