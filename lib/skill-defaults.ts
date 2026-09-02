import type { Skill } from "@/lib/skill";
import { TECH_CATALOG } from "@/lib/skill-catalog";

function fromCatalog(
  id: string,
  category: Skill["category"],
  key: string,
  sortOrder: number,
  name?: string,
  iconUrl?: string
): Skill {
  const item = TECH_CATALOG.find((tech) => tech.key === key);
  return {
    id,
    name: name ?? item?.name ?? key,
    category,
    iconUrl: iconUrl ?? item?.iconUrl ?? "",
    iconKey: key,
    sortOrder,
  };
}

export const defaultSkills: Skill[] = [
  fromCatalog("d-react", "frontend", "react", 0),
  fromCatalog("d-rn", "frontend", "react-native", 1),
  fromCatalog("d-next", "frontend", "nextdotjs", 2),
  fromCatalog("d-js", "frontend", "javascript", 3),
  fromCatalog("d-ts", "frontend", "typescript", 4),
  fromCatalog("d-html", "frontend", "html5", 5),
  fromCatalog("d-css", "frontend", "css3", 6),
  fromCatalog("d-tw", "frontend", "tailwindcss", 7),
  fromCatalog("d-zod", "frontend", "zod", 8),
  fromCatalog("d-zt", "frontend", "zustand", 9),
  fromCatalog("d-bs", "frontend", "bootstrap", 10),
  fromCatalog("d-expo", "frontend", "expo", 11),
  fromCatalog("d-java", "backend", "java", 0),
  fromCatalog("d-spring", "backend", "spring", 1),
  fromCatalog("d-py", "backend", "python", 2),
  fromCatalog("d-dj", "backend", "django", 3),
  fromCatalog("d-flask", "backend", "flask", 4),
  fromCatalog("d-pg", "backend", "postgresql", 5),
  fromCatalog("d-mongo", "backend", "mongodb", 6),
  fromCatalog("d-oracle", "backend", "oracle", 7),
  fromCatalog("d-mysql", "backend", "mysql", 8),
  fromCatalog("d-fb", "backend", "firebase", 9),
  fromCatalog("d-node", "backend", "nodedotjs", 10),
  fromCatalog("d-auth0", "backend", "auth0", 11),
  fromCatalog("d-jwt", "backend", "jsonwebtokens", 12),
  fromCatalog("d-docker", "devops", "docker", 0),
  fromCatalog("d-k8s", "devops", "kubernetes", 1),
  fromCatalog("d-gcp", "devops", "googlecloud", 2),
  fromCatalog("d-gha", "devops", "githubactions", 3),
  fromCatalog("d-git", "other", "git", 0),
  fromCatalog("d-linux", "other", "linux", 1),
  fromCatalog("d-postman", "other", "postman", 2),
  fromCatalog("d-tf", "other", "tensorflow", 3, "Machine Learning"),
  fromCatalog("d-jest", "other", "jest", 4),
];
