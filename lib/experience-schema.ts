import { z } from "zod";
import {
  EXPERIENCE_KINDS,
  type ExperienceKind,
} from "@/lib/experience";

const monthSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}$/, "Usa una fecha con mes y año.");

export const experienceSchema = z
  .object({
    orgName: z.string().trim().min(1, "El lugar o empresa es obligatorio").max(120),
    role: z.string().trim().min(1, "El rol es obligatorio").max(120),
    kind: z.enum(EXPERIENCE_KINDS as [ExperienceKind, ...ExperienceKind[]]),
    kindDetail: z.string().trim().max(80),
    startOn: monthSchema,
    endOn: z.union([monthSchema, z.literal("")]),
    isCurrent: z.boolean(),
    summary: z.string().trim().max(800),
    imageUrl: z.string().trim().max(500),
    sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  })
  .superRefine((value, ctx) => {
    if (value.kind === "other" && !value.kindDetail) {
      ctx.addIssue({
        code: "custom",
        message: "Describe el tipo de trabajo.",
        path: ["kindDetail"],
      });
    }
    if (!value.isCurrent && !value.endOn) {
      ctx.addIssue({
        code: "custom",
        message: "Indica la fecha de fin o marca que es actual.",
        path: ["endOn"],
      });
    }
    if (!value.isCurrent && value.endOn && value.endOn < value.startOn) {
      ctx.addIssue({
        code: "custom",
        message: "La fecha de fin no puede ser anterior al inicio.",
        path: ["endOn"],
      });
    }
  });

export const experienceIdSchema = z.string().uuid();
