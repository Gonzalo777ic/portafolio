-- Run in Supabase → SQL Editor after 001_showcase.sql.
-- Singleton "Sobre mí" (home): label, title, body, cube images.

create table if not exists public.about (
  id integer primary key default 1 check (id = 1),
  label text not null,
  title text not null,
  title_accent text not null default '',
  body text not null,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.about (id, label, title, title_accent, body, image_urls)
values (
  1,
  'Sobre Mí',
  'Full Stack Developer',
  'apasionado por la arquitectura de sistemas y las abstracciones que los hacen posibles.',
  'Ingeniero de software con enfoque en arquitectura, diseño de sistemas y creación de soluciones eficientes. Me caracterizo por mi pensamiento lógico, capacidad de integrar visión técnica con experiencia de usuario, y mi habilidad para transformar ideas complejas en productos claros, escalables y bien construidos. Disfruto aprender, optimizar y darle estructura a cada proyecto para que cobre sentido y continuidad real.',
  array[
    '/static/1.jpeg',
    '/static/2.jpeg',
    '/static/3.jpeg',
    '/static/5.png'
  ]
)
on conflict (id) do nothing;

grant select on public.about to anon, authenticated;
grant update on public.about to authenticated;

alter table public.about enable row level security;

drop policy if exists "Public read about" on public.about;
create policy "Public read about"
  on public.about
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated update about" on public.about;
create policy "Authenticated update about"
  on public.about
  for update
  to authenticated
  using (deleted_at is null)
  with check (deleted_at is null);
