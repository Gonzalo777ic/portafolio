import { AdminSection } from "@/components/admin/admin-section";
import { AlbumsManager } from "@/components/admin/albums-manager";
import { getAlbums } from "@/lib/album-data";

export default async function AdminAlbumsPage() {
  const albums = await getAlbums();

  return (
    <AdminSection
      title="Álbumes"
      description="Título, artista, URL de Spotify y portada (Cloudinary)."
    >
      <AlbumsManager albums={albums} />
    </AdminSection>
  );
}
