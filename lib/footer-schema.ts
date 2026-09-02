import { z } from "zod";

export const footerSchema = z.object({
  bio: z.string().trim().min(1, "El texto es obligatorio").max(400),
  photoUrl: z.string().trim().min(1, "Sube la foto").max(500),
  copyrightText: z.string().trim().min(1, "El copyright es obligatorio").max(160),
  badgeText: z.string().trim().max(120),
});
