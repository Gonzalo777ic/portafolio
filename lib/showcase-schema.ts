import { z } from "zod";

export const showcaseSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(200),
  titleAccent: z.string().trim().max(120),
  subtitle: z.string().trim().min(1, "El subtítulo es obligatorio").max(500),
});

export type ShowcaseInput = z.infer<typeof showcaseSchema>;
