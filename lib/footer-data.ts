import { hasDatabase, prisma } from "@/lib/prisma";
import { FOOTER_ID, defaultFooter, type FooterContent } from "@/lib/footer";

export async function getFooterContent(): Promise<FooterContent> {
  if (!hasDatabase()) return defaultFooter;

  try {
    const row = await prisma.footer.findFirst({
      where: { id: FOOTER_ID, deletedAt: null },
    });
    if (!row) return defaultFooter;
    return {
      id: row.id,
      bio: row.bio,
      photoUrl: row.photoUrl,
      copyrightText: row.copyrightText,
      badgeText: row.badgeText,
    };
  } catch {
    return defaultFooter;
  }
}
