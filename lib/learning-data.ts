import { hasDatabase, prisma } from "@/lib/prisma";
import {
  defaultLearning,
  isLearningColor,
  isLearningIconName,
  LEARNING_SECTION_ID,
  type LearningSection,
  type LearningTopic,
} from "@/lib/learning";

export async function getLearning(): Promise<LearningSection> {
  if (!hasDatabase()) return defaultLearning;

  try {
    const [section, topics] = await Promise.all([
      prisma.learningSection.findFirst({
        where: { id: LEARNING_SECTION_ID, deletedAt: null },
      }),
      prisma.learningTopic.findMany({
        where: { deletedAt: null },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    ]);

    const mapped = topics
      .map((row): LearningTopic | null => {
        if (!isLearningIconName(row.icon) || !isLearningColor(row.iconColor)) {
          return null;
        }
        return {
          id: row.id,
          title: row.title,
          description: row.description,
          icon: row.icon,
          iconColor: row.iconColor,
          sortOrder: row.sortOrder,
        };
      })
      .filter((item): item is LearningTopic => item !== null);

    if (!section && mapped.length === 0) {
      return { title: defaultLearning.title, topics: [] };
    }

    return {
      title: section?.title || defaultLearning.title,
      topics: mapped,
    };
  } catch {
    return defaultLearning;
  }
}
