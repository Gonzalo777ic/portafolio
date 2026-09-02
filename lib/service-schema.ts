import { z } from "zod";
import {
  SERVICE_COLORS,
  SERVICE_ICON_NAMES,
  type ServiceColor,
  type ServiceIconName,
} from "@/lib/service";

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(80),
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria")
    .max(600),
  icon: z.enum(SERVICE_ICON_NAMES as [ServiceIconName, ...ServiceIconName[]]),
  iconColor: z.enum(SERVICE_COLORS as [ServiceColor, ...ServiceColor[]]),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const serviceIdSchema = z.string().uuid();
