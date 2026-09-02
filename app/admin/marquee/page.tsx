import { AdminSection } from "@/components/admin/admin-section";
import { MarqueeManager } from "@/components/admin/marquee-manager";
import { getMarqueeWords } from "@/lib/marquee-data";

export default async function AdminMarqueePage() {
  const words = await getMarqueeWords();

  return (
    <AdminSection
      title="Carrusel"
      description="Palabras de las dos filas del marquee. Se muestran en mayúsculas."
    >
      <MarqueeManager words={words} />
    </AdminSection>
  );
}
