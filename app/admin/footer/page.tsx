import { AdminSection } from "@/components/admin/admin-section";
import { FooterForm } from "@/components/admin/footer-form";
import { getFooterContent } from "@/lib/footer-data";

export default async function AdminFooterPage() {
  const footer = await getFooterContent();

  return (
    <AdminSection
      title="Footer"
      description="Texto, copyright, badge y foto circular. Las redes se editan en Sitio → Redes."
    >
      <FooterForm footer={footer} />
    </AdminSection>
  );
}
