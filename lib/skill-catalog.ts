export type TechCatalogItem = {
  key: string;
  name: string;
  iconUrl: string;
};

const si = (slug: string, color?: string) =>
  color
    ? `https://cdn.simpleicons.org/${slug}/${color}`
    : `https://cdn.simpleicons.org/${slug}`;

const di = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const TECH_CATALOG: TechCatalogItem[] = [
  { key: "react", name: "React", iconUrl: si("react", "61DAFB") },
  { key: "react-native", name: "React Native", iconUrl: si("react", "61DAFB") },
  { key: "nextdotjs", name: "Next.js", iconUrl: si("nextdotjs", "ffffff") },
  { key: "javascript", name: "JavaScript", iconUrl: si("javascript", "F7DF1E") },
  { key: "typescript", name: "TypeScript", iconUrl: si("typescript", "3178C6") },
  { key: "html5", name: "HTML5", iconUrl: si("html5", "E34F26") },
  { key: "css3", name: "CSS3", iconUrl: si("css3", "1572B6") },
  { key: "tailwindcss", name: "Tailwind CSS", iconUrl: si("tailwindcss", "06B6D4") },
  { key: "zod", name: "Zod", iconUrl: si("zod", "3E67B1") },
  { key: "zustand", name: "Zustand", iconUrl: si("react", "61DAFB") },
  { key: "bootstrap", name: "Bootstrap", iconUrl: si("bootstrap", "7952B3") },
  { key: "expo", name: "Expo", iconUrl: si("expo", "ffffff") },
  { key: "java", name: "Java", iconUrl: di("java/java-original.svg") },
  { key: "spring", name: "Spring Boot", iconUrl: di("spring/spring-original.svg") },
  { key: "python", name: "Python", iconUrl: si("python", "3776AB") },
  { key: "django", name: "Django", iconUrl: si("django", "092E20") },
  { key: "flask", name: "Flask", iconUrl: si("flask", "ffffff") },
  { key: "postgresql", name: "PostgreSQL", iconUrl: si("postgresql", "4169E1") },
  { key: "mongodb", name: "MongoDB", iconUrl: si("mongodb", "47A248") },
  { key: "oracle", name: "Oracle", iconUrl: di("oracle/oracle-original.svg") },
  { key: "mysql", name: "MySQL", iconUrl: si("mysql", "4479A1") },
  { key: "firebase", name: "Firebase", iconUrl: si("firebase", "FFCA28") },
  { key: "nodedotjs", name: "Node.js", iconUrl: si("nodedotjs", "339933") },
  { key: "auth0", name: "Auth0", iconUrl: si("auth0", "EB5424") },
  { key: "jsonwebtokens", name: "JWT", iconUrl: si("jsonwebtokens", "ffffff") },
  { key: "docker", name: "Docker", iconUrl: si("docker", "2496ED") },
  { key: "kubernetes", name: "Kubernetes", iconUrl: si("kubernetes", "326CE5") },
  { key: "googlecloud", name: "GCP", iconUrl: si("googlecloud", "4285F4") },
  { key: "githubactions", name: "GitHub Actions", iconUrl: si("githubactions", "2088FF") },
  { key: "git", name: "Git", iconUrl: si("git", "F05032") },
  { key: "linux", name: "Linux", iconUrl: si("linux", "FCC624") },
  { key: "postman", name: "Postman", iconUrl: si("postman", "FF6C37") },
  { key: "tensorflow", name: "TensorFlow", iconUrl: si("tensorflow", "FF6F00") },
  { key: "pytorch", name: "PyTorch", iconUrl: si("pytorch", "EE4C2C") },
  { key: "rust", name: "Rust", iconUrl: si("rust", "ffffff") },
  { key: "go", name: "Go", iconUrl: si("go", "00ADD8") },
  { key: "graphql", name: "GraphQL", iconUrl: si("graphql", "E10098") },
  { key: "redis", name: "Redis", iconUrl: si("redis", "DC382D") },
  { key: "prisma", name: "Prisma", iconUrl: si("prisma", "ffffff") },
  { key: "jest", name: "Jest", iconUrl: si("jest", "C21325") },
  { key: "figma", name: "Figma", iconUrl: si("figma", "F24E1E") },
];

export function findCatalogItem(key: string) {
  return TECH_CATALOG.find((item) => item.key === key);
}
