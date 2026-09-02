export const EXPERIENCE_KINDS = [
  "employment",
  "freelance",
  "contract",
  "venture",
  "other",
] as const;

export type ExperienceKind = (typeof EXPERIENCE_KINDS)[number];

export const EXPERIENCE_KIND_LABELS: Record<ExperienceKind, string> = {
  employment: "Empresa",
  freelance: "Freelance",
  contract: "Contrato",
  venture: "Proyecto propio",
  other: "Otro",
};

export type Experience = {
  id: string;
  orgName: string;
  role: string;
  kind: ExperienceKind;
  kindDetail: string;
  startOn: string;
  endOn: string | null;
  isCurrent: boolean;
  summary: string;
  imageUrl: string;
  sortOrder: number;
};

const MONTHS_ES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export function isExperienceKind(value: string): value is ExperienceKind {
  return (EXPERIENCE_KINDS as readonly string[]).includes(value);
}

export function toMonthInput(value: string | null | undefined) {
  if (!value) return "";
  return value.slice(0, 7);
}

export function monthToDate(value: string) {
  return `${value}-01`;
}

export function formatMonthEs(value: string) {
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  if (!year || month < 1 || month > 12) return value.slice(0, 7);
  return `${MONTHS_ES[month - 1]} ${year}`;
}

export function formatExperienceRange(item: Experience) {
  const start = formatMonthEs(item.startOn);
  if (item.isCurrent || !item.endOn) return `${start} — Actualidad`;
  return `${start} — ${formatMonthEs(item.endOn)}`;
}

export function experienceKindLabel(item: Experience) {
  if (item.kind === "other" && item.kindDetail.trim()) {
    return item.kindDetail.trim();
  }
  return EXPERIENCE_KIND_LABELS[item.kind];
}

export function sortExperience(items: Experience[]) {
  return [...items].sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
    const byDate = b.startOn.localeCompare(a.startOn);
    if (byDate !== 0) return byDate;
    return a.sortOrder - b.sortOrder;
  });
}
