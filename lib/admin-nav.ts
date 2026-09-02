export const ADMIN_HOME_PATH = "/admin/showcase";

export type AdminNavItem = {
  href: string;
  label: string;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

/** Orden alineado con el sitio: home → acerca de → proyectos → chrome. */
export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Home",
    items: [
      { href: "/admin/showcase", label: "Escaparate" },
      { href: "/admin/about", label: "Sobre mí" },
      { href: "/admin/services", label: "Servicios" },
      { href: "/admin/skills", label: "Tecnologías" },
      { href: "/admin/marquee", label: "Carrusel" },
      { href: "/admin/albums", label: "Álbumes" },
    ],
  },
  {
    label: "Acerca de",
    items: [
      { href: "/admin/academic", label: "Situación académica" },
      { href: "/admin/experience", label: "Experiencia" },
      { href: "/admin/learning", label: "Aprendiendo ahora" },
    ],
  },
  {
    label: "Proyectos",
    items: [{ href: "/admin/projects", label: "Encabezado y listado" }],
  },
  {
    label: "Sitio",
    items: [
      { href: "/admin/social", label: "Redes" },
      { href: "/admin/footer", label: "Footer" },
    ],
  },
];
