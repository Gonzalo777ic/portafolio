import { ProjectsList } from "@/components/projects/projects-list";
import { CtaSection } from "@/components/cta-section";
import { getProjects } from "@/lib/project-data";
import { getProjectsPage } from "@/lib/projects-page-data";

export default async function ProjectsPage() {
  const [projects, page] = await Promise.all([
    getProjects(),
    getProjectsPage(),
  ]);

  return (
    <div className="relative min-h-screen bg-black text-foreground">
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url('/static/bw.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">
              {page.kicker}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg tracking-tight">
              {page.title}
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              {page.subtitle}
            </p>
          </div>
          <ProjectsList projects={projects} />
        </div>
      </main>
      <CtaSection />
    </div>
  );
}
