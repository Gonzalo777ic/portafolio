import { z } from "zod";

export const albumSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  artist: z.string().trim().min(1, "El artista es obligatorio").max(120),
  albumUrl: z.string().trim().min(1, "El enlace de Spotify es obligatorio").max(400),
  imageUrl: z.string().trim().min(1, "Sube la portada").max(500),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const albumIdSchema = z.string().uuid();
