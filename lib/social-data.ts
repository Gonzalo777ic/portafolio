import { hasDatabase, prisma } from "@/lib/prisma";
import {
  defaultSocialLinks,
  isSocialIconName,
  type SocialLink,
} from "@/lib/social";

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!hasDatabase()) return defaultSocialLinks;

  try {
    const rows = await prisma.socialLink.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      label: row.label,
      href: row.href,
      handle: row.handle,
      icon: isSocialIconName(row.icon) ? row.icon : "globe",
      sortOrder: row.sortOrder,
    }));
  } catch {
    return defaultSocialLinks;
  }
}
