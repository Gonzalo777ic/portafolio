import { AdminSection } from "@/components/admin/admin-section";
import { ExperienceManager } from "@/components/admin/experience-manager";
import { getExperience } from "@/lib/experience-data";

export default async function AdminExperiencePage() {
  const items = await getExperience();

  return (
    <AdminSection
      title="Experiencia"
      description="Línea de tiempo en Acerca de: empresa, freelance u otro, con fechas y logo."
    >
      <ExperienceManager items={items} />
    </AdminSection>
  );
}
