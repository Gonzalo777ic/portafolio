import { SERVICE_COLORS, type ServiceColor } from "@/lib/service";

export const LEARNING_SECTION_ID = 1;

export const LEARNING_ICON_NAMES = [
  "brain",
  "cpu",
  "network",
  "code",
  "cloud",
  "database",
  "sparkles",
  "book-open",
] as const;

export type LearningIconName = (typeof LEARNING_ICON_NAMES)[number];
export type LearningColor = ServiceColor;

export type LearningTopic = {
  id: string;
  title: string;
  description: string;
  icon: LearningIconName;
  iconColor: LearningColor;
  sortOrder: number;
};

export type LearningSection = {
  title: string;
  topics: LearningTopic[];
};

export const defaultLearning: LearningSection = {
  title: "Lo que estoy aprendiendo ahora",
  topics: [
    {
      id: "learn-ml",
      title: "Machine Learning, AI & Data Engineering",
      description:
        "Actualmente estoy profundizando en el ciclo completo de desarrollo de modelos de Machine Learning: desde la preparación de datos, feature engineering y entrenamiento con frameworks como TensorFlow y PyTorch, hasta la integración de modelos en aplicaciones reales mediante APIs o servicios escalables.\n\nMe interesa especialmente cómo la analítica avanzada y los modelos predictivos pueden apoyar la toma de decisiones estratégicas en una empresa. Esto incluye entender cómo automatizar flujos de datos, versionar experimentos, monitorizar modelos y garantizar su reproducibilidad dentro de pipelines de ML modernos.",
      icon: "cpu",
      iconColor: "violet",
      sortOrder: 0,
    },
    {
      id: "learn-mlops",
      title: "MLOps & Sistemas Distribuidos",
      description:
        "Estoy estudiando el flujo completo de MLOps: ingestión de datos, orquestación con pipelines (Airflow, Prefect), empaquetado de modelos, CI/CD para ML, despliegue en contenedores, monitoreo de drift y observabilidad del rendimiento.\n\nMi objetivo es entender cómo construir infraestructuras que permitan entrenar, escalar y desplegar modelos de forma confiable en entornos distribuidos, alineado con prácticas de empresas que operan grandes volúmenes de datos y requieren respuestas en tiempo real.",
      icon: "network",
      iconColor: "blue",
      sortOrder: 1,
    },
  ],
};

export function isLearningIconName(value: string): value is LearningIconName {
  return (LEARNING_ICON_NAMES as readonly string[]).includes(value);
}

export function isLearningColor(value: string): value is LearningColor {
  return (SERVICE_COLORS as readonly string[]).includes(value);
}

export function isSeedLearningId(id: string) {
  return id.startsWith("learn-");
}
