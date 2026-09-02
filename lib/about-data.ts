import { ABOUT_ID, defaultAbout, type About } from "@/lib/about";
import { hasDatabase, prisma } from "@/lib/prisma";

export async function getAbout(): Promise<About> {
  if (!hasDatabase()) return defaultAbout;

  try {
    const row = await prisma.about.findFirst({
      where: { id: ABOUT_ID, deletedAt: null },
    });
    if (!row) return defaultAbout;
    const urls = row.imageUrls.filter(Boolean);
    return {
      ...defaultAbout,
      id: row.id,
      label: row.label,
      title: row.title,
      titleAccent: row.titleAccent,
      body: row.body,
      imageUrls: urls.length > 0 ? urls : defaultAbout.imageUrls,
      pageTitle: row.pageTitle || defaultAbout.pageTitle,
      pageTitleAccent: row.pageTitleAccent ?? defaultAbout.pageTitleAccent,
      pageBody: row.pageBody || defaultAbout.pageBody,
      carouselCaption: row.carouselCaption || defaultAbout.carouselCaption,
      roleTags:
        row.roleTags.filter(Boolean).length > 0
          ? row.roleTags.filter(Boolean)
          : defaultAbout.roleTags,
    };
  } catch {
    return defaultAbout;
  }
}
