"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { aboutSchema } from "@/lib/about-schema";
import { ABOUT_ID } from "@/lib/about";
import { prisma } from "@/lib/prisma";

export type AboutFormState = {
  error: string | null;
  success: boolean;
};

export async function updateAbout(
  _prev: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const admin = await requireAdmin();
  if (!admin.ok) return { error: admin.error, success: false };

  const parsed = aboutSchema.safeParse({
    label: formData.get("label"),
    title: formData.get("title"),
    titleAccent: formData.get("titleAccent") ?? "",
    body: formData.get("body"),
    pageTitle: formData.get("pageTitle"),
    pageTitleAccent: formData.get("pageTitleAccent") ?? "",
    pageBody: formData.get("pageBody"),
    carouselCaption: formData.get("carouselCaption") ?? "",
    roleTags: String(formData.get("roleTags") ?? "")
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean),
    imageUrls: formData.getAll("imageUrls").map(String).filter(Boolean),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
      success: false,
    };
  }

  try {
    await prisma.about.upsert({
      where: { id: ABOUT_ID },
      create: {
        id: ABOUT_ID,
        label: parsed.data.label,
        title: parsed.data.title,
        titleAccent: parsed.data.titleAccent,
        body: parsed.data.body,
        pageTitle: parsed.data.pageTitle,
        pageTitleAccent: parsed.data.pageTitleAccent,
        pageBody: parsed.data.pageBody,
        carouselCaption: parsed.data.carouselCaption,
        roleTags: parsed.data.roleTags,
        imageUrls: parsed.data.imageUrls,
      },
      update: {
        label: parsed.data.label,
        title: parsed.data.title,
        titleAccent: parsed.data.titleAccent,
        body: parsed.data.body,
        pageTitle: parsed.data.pageTitle,
        pageTitleAccent: parsed.data.pageTitleAccent,
        pageBody: parsed.data.pageBody,
        carouselCaption: parsed.data.carouselCaption,
        roleTags: parsed.data.roleTags,
        imageUrls: parsed.data.imageUrls,
      },
    });
  } catch {
    return {
      error: "No se pudo guardar. Revisa Prisma y la tabla about.",
      success: false,
    };
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin");
  return { error: null, success: true };
}
