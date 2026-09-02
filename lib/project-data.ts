import { hasDatabase, prisma } from "@/lib/prisma";
import type { Project } from "@/lib/projects-data";

/** Solo filas reales de la BD. Sin mocks hardcodeados. */
export async function getProjects(): Promise<Project[]> {
  if (!hasDatabase()) return [];

  try {
    const rows = await prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      features: row.features,
      tags: row.tags,
      images: row.imageUrls.filter(Boolean),
      github: row.github,
      githubBackend: row.githubBackend || undefined,
      demo: row.demo || undefined,
      featured: row.featured,
      sortOrder: row.sortOrder,
    }));
  } catch {
    return [];
  }
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 3);
}
