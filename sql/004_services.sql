-- Run in Supabase → SQL Editor after 003_social_links.sql.
-- Home "Mis Servicios": N cards. Soft delete via deleted_at.

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null default 'code',
  icon_color text not null default 'cyan',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.services (title, description, icon, icon_color, sort_order)
select *
from (
  values
    (
      'Desarrollo Frontend',
      'Construyo interfaces web y móviles modernas, rápidas y accesibles. Transformo diseños complejos en código pixel-perfect usando React, Next.js y Tailwind.',
      'code',
      'cyan',
      0
    ),
    (
      'Desarrollo Backend',
      'Diseño arquitecturas de servidor robustas y escalables. Creo APIs seguras, gestiono bases de datos complejas y optimizo el rendimiento del lado del servidor.',
      'server',
      'violet',
      1
    ),
    (
      'Diseño Web & UI',
      'Diseño experiencias de usuario intuitivas y sistemas visuales atractivos. Me enfoco en la usabilidad y la estética para asegurar que el producto destaque.',
      'pen-tool',
      'pink',
      2
    )
) as seed(title, description, icon, icon_color, sort_order)
where not exists (select 1 from public.services);

grant select on public.services to anon, authenticated;
grant insert, update on public.services to authenticated;

alter table public.services enable row level security;

drop policy if exists "Public read services" on public.services;
create policy "Public read services"
  on public.services
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert services" on public.services;
create policy "Authenticated insert services"
  on public.services
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update services" on public.services;
create policy "Authenticated update services"
  on public.services
  for update
  to authenticated
  using (true)
  with check (true);
