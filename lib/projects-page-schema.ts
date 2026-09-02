import { z } from "zod";

export const projectsPageSchema = z.object({
  kicker: z.string().trim().min(1, "La etiqueta es obligatoria").max(40),
  title: z.string().trim().min(1, "El título es obligatorio").max(80),
  subtitle: z.string().trim().min(1, "El subtítulo es obligatorio").max(240),
});
