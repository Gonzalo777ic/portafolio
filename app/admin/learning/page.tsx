import { AdminSection } from "@/components/admin/admin-section";
import { LearningManager } from "@/components/admin/learning-manager";
import { getLearning } from "@/lib/learning-data";

export default async function AdminLearningPage() {
  const learning = await getLearning();

  return (
    <AdminSection
      title="Aprendiendo ahora"
      description="Título del apartado y N temas en Acerca de. Puedes añadir, editar u archivar."
    >
      <LearningManager learning={learning} />
    </AdminSection>
  );
}
