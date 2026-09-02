import { AboutForm } from "@/components/admin/about-form";
import { AdminSection } from "@/components/admin/admin-section";
import { getAbout } from "@/lib/about-data";

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <AdminSection
      title="Sobre mí"
      description="Home y página Acerca de. Las fotos del cubo y del carrusel son las mismas."
    >
      <AboutForm about={about} />
    </AdminSection>
  );
}
