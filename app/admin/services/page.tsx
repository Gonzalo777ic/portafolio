import { AdminSection } from "@/components/admin/admin-section";
import { ServicesManager } from "@/components/admin/services-manager";
import { getServices } from "@/lib/service-data";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <AdminSection
      title="Servicios"
      description='Tarjetas de “Mis servicios”. Puedes añadir, editar u archivar.'
    >
      <ServicesManager services={services} />
    </AdminSection>
  );
}
