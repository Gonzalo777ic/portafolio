export type MarqueeRowIndex = 1 | 2;

export type MarqueeWord = {
  id: string;
  label: string;
  rowIndex: MarqueeRowIndex;
  sortOrder: number;
};

export const defaultMarqueeWords: MarqueeWord[] = [
  ...[
    "ABSTRACCIÓN",
    "IMPLEMENTACIÓN",
    "VISIÓN",
    "EJECUCIÓN",
    "ESTRATEGIA",
    "CÓDIGO",
    "DISEÑO",
    "LÓGICA",
    "GRANULARIDAD",
    "MODULARIDAD",
    "FLEXIBILIDAD",
  ].map((label, sortOrder) => ({
    id: `d1-${sortOrder}`,
    label,
    rowIndex: 1 as const,
    sortOrder,
  })),
  ...[
    "IDENTIDAD",
    "RIGOR",
    "TRAZA",
    "CURIOSIDAD",
    "ITERACIÓN INTENCIONAL",
    "PRAXIS CONSCIENTE",
    "MULTIESCALAR",
    "DIRECCIÓN INTERNA",
    "TRANSFORMACIÓN",
  ].map((label, sortOrder) => ({
    id: `d2-${sortOrder}`,
    label,
    rowIndex: 2 as const,
    sortOrder,
  })),
];

export function labelsForRow(words: MarqueeWord[], rowIndex: MarqueeRowIndex) {
  return words
    .filter((word) => word.rowIndex === rowIndex)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((word) => word.label);
}
