import { z } from "zod";
import { ABOUT_IMAGE_SLOTS } from "@/lib/about";

export const aboutSchema = z.object({
  label: z.string().trim().min(1, "La etiqueta es obligatoria").max(40),
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  titleAccent: z.string().trim().max(240),
  body: z.string().trim().min(1, "El contenido es obligatorio").max(2000),
  pageTitle: z.string().trim().min(1, "El título de Acerca de es obligatorio").max(120),
  pageTitleAccent: z.string().trim().max(160),
  pageBody: z.string().trim().min(1, "La descripción de Acerca de es obligatoria").max(5000),
  carouselCaption: z.string().trim().max(200),
  roleTags: z.array(z.string().trim().min(1).max(40)).max(8).default([]),
  imageUrls: z
    .array(z.string().trim().min(1))
    .min(1, "Sube al menos una imagen")
    .max(ABOUT_IMAGE_SLOTS),
});

export type AboutInput = z.infer<typeof aboutSchema>;
