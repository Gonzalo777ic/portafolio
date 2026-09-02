import { z } from "zod";
import { SOCIAL_ICON_NAMES, type SocialIconName } from "@/lib/social";

export const socialLinkSchema = z.object({
  label: z.string().trim().min(1, "El nombre es obligatorio").max(40),
  href: z.string().trim().min(1, "El enlace es obligatorio").max(300),
  handle: z.string().trim().max(80),
  icon: z.enum(SOCIAL_ICON_NAMES as [SocialIconName, ...SocialIconName[]]),
});

export const socialIdSchema = z.string().uuid();
