import { AdminSection } from "@/components/admin/admin-section";
import { SocialLinksManager } from "@/components/admin/social-links-manager";
import { getSocialLinks } from "@/lib/social-data";

export default async function AdminSocialPage() {
  const links = await getSocialLinks();

  return (
    <AdminSection
      title="Redes"
      description="Enlaces que aparecen en Sobre mí, el pie y Contacto."
    >
      <SocialLinksManager links={links} />
    </AdminSection>
  );
}
