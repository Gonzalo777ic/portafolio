import { AdminSection } from "@/components/admin/admin-section";
import { PhoneNumbersManager } from "@/components/admin/phone-numbers-manager";
import { getPhoneNumbers } from "@/lib/phone-data";

export default async function AdminPhonesPage() {
  const phones = await getPhoneNumbers();

  return (
    <AdminSection
      title="Celulares"
      description="Uno o varios números. Se muestran en Contacto con enlace para llamar y WhatsApp."
    >
      <PhoneNumbersManager phones={phones} />
    </AdminSection>
  );
}
