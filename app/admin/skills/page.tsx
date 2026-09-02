import { AdminSection } from "@/components/admin/admin-section";
import { SkillsManager } from "@/components/admin/skills-manager";
import { getSkills } from "@/lib/skill-data";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <AdminSection
      title="Tecnologías"
      description="Una columna por área. Elige un icono del catálogo o un nombre con logo propio."
    >
      <SkillsManager skills={skills} />
    </AdminSection>
  );
}
