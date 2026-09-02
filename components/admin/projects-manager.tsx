"use client";

import { archiveProject } from "@/app/actions/project";
import { ProjectForm } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects-data";

export function ProjectsManager({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-8">
      {projects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-neutral-500">
          No hay proyectos en la base. Añade el primero abajo.
        </p>
      ) : (
        <ul className="space-y-8">
          {projects.map((project) => (
            <li
              key={project.id}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm font-medium text-white">{project.title}</p>
              <ProjectForm project={project} />
              <form action={archiveProject.bind(null, project.id)}>
                <Button
                  type="submit"
                  variant="ghost"
                  className="text-neutral-400 hover:text-white"
                >
                  Archivar
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-white/10 pt-6">
        <h3 className="mb-4 text-sm font-medium text-white">Nuevo proyecto</h3>
        <ProjectForm />
      </div>
    </div>
  );
}
