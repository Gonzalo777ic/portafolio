-- Run in Supabase → SQL Editor after 005_skills.sql.
-- Portfolio projects. Soft delete via deleted_at. N images in image_urls.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  features text[] not null default '{}',
  tags text[] not null default '{}',
  image_urls text[] not null default '{}',
  github text not null default '',
  github_backend text not null default '',
  demo text not null default '',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.projects (
  title, description, features, tags, image_urls, github, github_backend, demo, featured, sort_order
)
select *
from (
  values
    (
      'Smart Retail Analytics Ecosystem',
      'Plataforma integral de inteligencia de mercado que monitorea precios y stock de más de 10 retailers tecnológicos en Perú y Amazon global.',
      array[
        'Infraestructura Serverless en Google Cloud (GKE/Cloud Run) con Docker',
        'Data Warehouse en BigQuery para análisis histórico masivo',
        'API RESTful (FastAPI) y Dashboard interactivo'
      ],
      array['Python', 'Google Cloud Platform', 'React / Next.js'],
      array['/static/scraper/1.png', '/static/scraper/2.png'],
      'https://github.com/Gonzalo777ic/scraper-frontend',
      'https://github.com/Gonzalo777ic/web-scraper-GCP',
      'https://scraper-frontend-bay.vercel.app/',
      true,
      0
    ),
    (
      'Nomos Inventory System',
      'Sistema empresarial de gestión de inventarios y ERP modular. Panel administrativo con visualización de datos 3D y reportes en tiempo real.',
      array[
        'Dashboard con visualización 3D (Three.js)',
        'Microservicios con Spring Boot y Java 17',
        'Renderizado Híbrido (SPA + SSR)'
      ],
      array['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Three.js'],
      array['/static/nomos/1.png', '/static/nomos/2.png'],
      'https://github.com/Gonzalo777ic/nomos-inventory-system-frontend.git',
      'https://github.com/Gonzalo777ic/nomos-inventory-service.git',
      '',
      true,
      1
    )
) as seed(
  title, description, features, tags, image_urls, github, github_backend, demo, featured, sort_order
)
where not exists (select 1 from public.projects);

grant select on public.projects to anon, authenticated;
grant insert, update on public.projects to authenticated;

alter table public.projects enable row level security;

drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects"
  on public.projects
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert projects" on public.projects;
create policy "Authenticated insert projects"
  on public.projects
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update projects" on public.projects;
create policy "Authenticated update projects"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);
