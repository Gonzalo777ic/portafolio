import { AcademicLabelsManager } from "@/components/admin/academic-labels-manager";
import { AdminSection } from "@/components/admin/admin-section";
import { getAcademicLabels } from "@/lib/academic-data";

export default async function AdminAcademicPage() {
  const labels = await getAcademicLabels();

  return (
    <AdminSection
      title="Situación académica"
      description="Hasta 3 niveles: título, subtítulo o grupo, y etiquetas."
    >
      <AcademicLabelsManager labels={labels} />
    </AdminSection>
  );
}
