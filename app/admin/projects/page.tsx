import { AdminSection } from "@/components/admin/admin-section";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { ProjectsPageForm } from "@/components/admin/projects-page-form";
import { getProjects } from "@/lib/project-data";
import { getProjectsPage } from "@/lib/projects-page-data";

export default async function AdminProjectsPage() {
  const [projectsPage, projects] = await Promise.all([
    getProjectsPage(),
    getProjects(),
  ]);

  return (
    <AdminSection
      title="Proyectos"
      description="Encabezado de “Todos los Proyectos” y una sola lista (home destacados + página completa)."
    >
      <div className="space-y-10">
        <ProjectsPageForm page={projectsPage} />
        <div className="border-t border-white/10 pt-8">
          <ProjectsManager projects={projects} />
        </div>
      </div>
    </AdminSection>
  );
}
