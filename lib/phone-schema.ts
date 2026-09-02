import { z } from "zod";

export const phoneNumberSchema = z.object({
  label: z.string().trim().min(1, "La etiqueta es obligatoria").max(80),
  number: z.string().trim().min(5, "El número es obligatorio").max(40),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const phoneIdSchema = z.string().uuid();
