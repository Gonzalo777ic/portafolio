import { z } from "zod";

export const academicLabelSchema = z.object({
  label: z.string().trim().min(1, "El texto es obligatorio").max(120),
  parentId: z.string().uuid().nullable(),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const academicIdSchema = z.string().uuid();
