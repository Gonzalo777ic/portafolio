export const PROJECTS_PAGE_ID = 1;

export type ProjectsPage = {
  kicker: string;
  title: string;
  subtitle: string;
};

export const defaultProjectsPage: ProjectsPage = {
  kicker: "PORTAFOLIO",
  title: "Todos los Proyectos",
  subtitle:
    "Explora mi colección completa de desarrollos, desde aplicaciones web hasta soluciones cloud.",
};
