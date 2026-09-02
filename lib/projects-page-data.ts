import { hasDatabase, prisma } from "@/lib/prisma";
import {
  PROJECTS_PAGE_ID,
  defaultProjectsPage,
  type ProjectsPage,
} from "@/lib/projects-page";

export async function getProjectsPage(): Promise<ProjectsPage> {
  if (!hasDatabase()) return defaultProjectsPage;

  try {
    const row = await prisma.projectsPage.findFirst({
      where: { id: PROJECTS_PAGE_ID, deletedAt: null },
    });
    if (!row) return defaultProjectsPage;
    return {
      kicker: row.kicker || defaultProjectsPage.kicker,
      title: row.title || defaultProjectsPage.title,
      subtitle: row.subtitle || defaultProjectsPage.subtitle,
    };
  } catch {
    return defaultProjectsPage;
  }
}
