export type AcademicLabel = {
  id: string;
  parentId: string | null;
  label: string;
  sortOrder: number;
};

export type AcademicNode = AcademicLabel & { children: AcademicNode[] };

export const defaultAcademicLabels: AcademicLabel[] = [
  { id: "ac-root", parentId: null, label: "Situación académica", sortOrder: 0 },
  {
    id: "ac-uni",
    parentId: "ac-root",
    label: "Universidad Ricardo Palma – Ingeniería Informática",
    sortOrder: 0,
  },
  {
    id: "ac-decimo",
    parentId: "ac-root",
    label: "Décimo Superior en los semestres:",
    sortOrder: 1,
  },
  ...["2025-2", "2025-1", "2024-2", "2024-1", "2023-2", "2023-1"].map(
    (period, index) => ({
      id: `ac-d-${period}`,
      parentId: "ac-decimo",
      label: `Período ${period}`,
      sortOrder: index,
    })
  ),
  {
    id: "ac-beca",
    parentId: "ac-root",
    label: "Beca por rendimiento académico en los semestres:",
    sortOrder: 2,
  },
  {
    id: "ac-b-2025-1",
    parentId: "ac-beca",
    label: "Período 2025-1",
    sortOrder: 0,
  },
  {
    id: "ac-b-2025-2",
    parentId: "ac-beca",
    label: "Período 2025-2",
    sortOrder: 1,
  },
];

export function buildAcademicTree(labels: AcademicLabel[]): AcademicNode[] {
  const nodes = new Map<string, AcademicNode>();
  labels.forEach((item) => {
    nodes.set(item.id, { ...item, children: [] });
  });
  const roots: AcademicNode[] = [];
  nodes.forEach((node) => {
    if (node.parentId && nodes.has(node.parentId)) {
      nodes.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  const sortNodes = (list: AcademicNode[]) => {
    list.sort((a, b) => a.sortOrder - b.sortOrder);
    list.forEach((child) => sortNodes(child.children));
  };
  sortNodes(roots);
  return roots;
}

export function academicDepth(
  labels: AcademicLabel[],
  id: string | null
): number {
  if (!id) return 0;
  let depth = 0;
  let current = labels.find((item) => item.id === id) ?? null;
  const seen = new Set<string>();
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    depth += 1;
    current = current.parentId
      ? (labels.find((item) => item.id === current!.parentId) ?? null)
      : null;
  }
  return depth;
}

export function isSeedAcademicId(id: string) {
  return id.startsWith("ac-");
}
