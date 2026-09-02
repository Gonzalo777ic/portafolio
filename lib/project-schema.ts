import { z } from "zod";

function splitList(value: unknown) {
  return String(value ?? "")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export const projectSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria")
    .max(1200),
  features: z.array(z.string().trim().min(1)).max(12).default([]),
  tags: z.array(z.string().trim().min(1)).max(20).default([]),
  images: z.array(z.string().trim().min(1)).max(20).default([]),
  github: z.string().trim().max(300).default(""),
  githubBackend: z.string().trim().max(300).default(""),
  demo: z.string().trim().max(300).default(""),
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const projectIdSchema = z.string().uuid();

export function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    features: splitList(formData.get("features")),
    tags: splitList(formData.get("tags")),
    images: formData.getAll("images").map(String).filter(Boolean),
    github: formData.get("github") ?? "",
    githubBackend: formData.get("githubBackend") ?? "",
    demo: formData.get("demo") ?? "",
    featured: formData.get("featured") === "on",
    sortOrder: formData.get("sortOrder") ?? 0,
  });
}
