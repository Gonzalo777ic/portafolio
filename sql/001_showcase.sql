-- Run in Supabase → SQL Editor.
-- Singleton row (id = 1) for the home showcase title + subtitle.

create table if not exists public.showcase (
  id integer primary key default 1 check (id = 1),
  title text not null,
  title_accent text not null default '',
  subtitle text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.showcase (id, title, title_accent, subtitle)
values (
  1,
  'Desarrollo full stack escalable y sostenible',
  'experiencias digitales',
  'Hola soy **Gonzalo Isique**, un **Fullstack Developer** e **Ingeniero de Software**.'
)
on conflict (id) do nothing;

grant select on public.showcase to anon, authenticated;
grant update on public.showcase to authenticated;

alter table public.showcase enable row level security;

drop policy if exists "Public read showcase" on public.showcase;
create policy "Public read showcase"
  on public.showcase
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated update showcase" on public.showcase;
create policy "Authenticated update showcase"
  on public.showcase
  for update
  to authenticated
  using (deleted_at is null)
  with check (deleted_at is null);
