-- Run in Supabase → SQL Editor after 008_albums.sql.
-- Singleton footer copy + photo.

create table if not exists public.footer (
  id integer primary key default 1 check (id = 1),
  bio text not null,
  photo_url text not null,
  copyright_text text not null,
  badge_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.footer (id, bio, photo_url, copyright_text, badge_text)
values (
  1,
  'Soy Gonzalo, un desarrollador full-stack y solucionador de problemas. ¡Gracias por visitar mi sitio!',
  '/static/6.jpeg',
  'Gonzalo Isique.',
)
on conflict (id) do nothing;

grant select on public.footer to anon, authenticated;
grant update on public.footer to authenticated;

alter table public.footer enable row level security;

drop policy if exists "Public read footer" on public.footer;
create policy "Public read footer"
  on public.footer
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated update footer" on public.footer;
create policy "Authenticated update footer"
  on public.footer
  for update
  to authenticated
  using (deleted_at is null)
  with check (deleted_at is null);
