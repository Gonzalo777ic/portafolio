import { z } from "zod";
import {
  LEARNING_ICON_NAMES,
  type LearningColor,
  type LearningIconName,
} from "@/lib/learning";
import { SERVICE_COLORS } from "@/lib/service";

export const learningTitleSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(80),
});

export const learningTopicSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(80),
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria")
    .max(2000),
  icon: z.enum(LEARNING_ICON_NAMES as [LearningIconName, ...LearningIconName[]]),
  iconColor: z.enum(SERVICE_COLORS as [LearningColor, ...LearningColor[]]),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const learningTopicIdSchema = z.string().uuid();
