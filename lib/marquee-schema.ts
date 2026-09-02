import { z } from "zod";

export const marqueeWordSchema = z.object({
  label: z.string().trim().min(1, "La palabra es obligatoria").max(40),
  rowIndex: z.coerce.number().int().refine((value) => value === 1 || value === 2, {
    message: "Fila inválida",
  }),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const marqueeIdSchema = z.string().uuid();
