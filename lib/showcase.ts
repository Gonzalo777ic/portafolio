import { hasDatabase, prisma } from "@/lib/prisma";

export const SHOWCASE_ID = 1;

export type Showcase = {
  id: number;
  title: string;
  titleAccent: string;
  subtitle: string;
};

export const defaultShowcase: Showcase = {
  id: SHOWCASE_ID,
  title: "Desarrollo full stack escalable y sostenible",
  titleAccent: "experiencias digitales",
  subtitle:
    "Hola soy **Gonzalo Isique**, un **Fullstack Developer** e **Ingeniero de Software**.",
};

export async function getShowcase(): Promise<Showcase> {
  if (!hasDatabase()) return defaultShowcase;

  try {
    const row = await prisma.showcase.findFirst({
      where: { id: SHOWCASE_ID, deletedAt: null },
    });
    if (!row) return defaultShowcase;
    return {
      id: row.id,
      title: row.title,
      titleAccent: row.titleAccent,
      subtitle: row.subtitle,
    };
  } catch {
    return defaultShowcase;
  }
}
