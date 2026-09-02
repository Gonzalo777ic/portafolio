import { AdminSection } from "@/components/admin/admin-section";
import { ShowcaseForm } from "@/components/admin/showcase-form";
import { getShowcase } from "@/lib/showcase";

export default async function AdminShowcasePage() {
  const showcase = await getShowcase();

  return (
    <AdminSection
      title="Escaparate"
      description="Título y subtítulo de la home."
    >
      <ShowcaseForm showcase={showcase} />
    </AdminSection>
  );
}
