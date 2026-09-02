-- Run in Supabase → SQL Editor after 012_experience.sql.
-- Copy of /projects header. The projects themselves stay in public.projects.

create table if not exists public.projects_page (
  id integer primary key default 1 check (id = 1),
  kicker text not null,
  title text not null,
  subtitle text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.projects_page (id, kicker, title, subtitle)
values (
  1,
  'PORTAFOLIO',
  'Todos los Proyectos',
  'Explora mi colección completa de desarrollos, desde aplicaciones web hasta soluciones cloud.'
)
on conflict (id) do nothing;

grant select on public.projects_page to anon, authenticated;
grant update on public.projects_page to authenticated;

alter table public.projects_page enable row level security;

drop policy if exists "Public read projects_page" on public.projects_page;
create policy "Public read projects_page"
  on public.projects_page
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated update projects_page" on public.projects_page;
create policy "Authenticated update projects_page"
  on public.projects_page
  for update
  to authenticated
  using (deleted_at is null)
  with check (deleted_at is null);
