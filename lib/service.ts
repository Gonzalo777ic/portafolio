export const SERVICE_ICON_NAMES = [
  "code",
  "server",
  "pen-tool",
  "smartphone",
  "cloud",
  "database",
  "layout",
  "sparkles",
  "wrench",
  "globe",
] as const;

export const SERVICE_COLORS = [
  "cyan",
  "violet",
  "pink",
  "blue",
  "emerald",
  "orange",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];
export type ServiceColor = (typeof SERVICE_COLORS)[number];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  iconColor: ServiceColor;
  sortOrder: number;
};

export const defaultServices: Service[] = [
  {
    id: "default-frontend",
    title: "Desarrollo Frontend",
    description:
      "Construyo interfaces web y móviles modernas, rápidas y accesibles. Transformo diseños complejos en código pixel-perfect usando React, Next.js y Tailwind.",
    icon: "code",
    iconColor: "cyan",
    sortOrder: 0,
  },
  {
    id: "default-backend",
    title: "Desarrollo Backend",
    description:
      "Diseño arquitecturas de servidor robustas y escalables. Creo APIs seguras, gestiono bases de datos complejas y optimizo el rendimiento del lado del servidor.",
    icon: "server",
    iconColor: "violet",
    sortOrder: 1,
  },
  {
    id: "default-design",
    title: "Diseño Web & UI",
    description:
      "Diseño experiencias de usuario intuitivas y sistemas visuales atractivos. Me enfoco en la usabilidad y la estética para asegurar que el producto destaque.",
    icon: "pen-tool",
    iconColor: "pink",
    sortOrder: 2,
  },
];

export function isServiceIconName(value: string): value is ServiceIconName {
  return (SERVICE_ICON_NAMES as readonly string[]).includes(value);
}

export function isServiceColor(value: string): value is ServiceColor {
  return (SERVICE_COLORS as readonly string[]).includes(value);
}
