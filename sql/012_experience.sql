-- Run in Supabase → SQL Editor after 011_learning.sql.
-- About page work timeline. N entries. Image URL from Cloudinary.

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  role text not null,
  kind text not null default 'employment',
  kind_detail text not null default '',
  start_on date not null,
  end_on date,
  is_current boolean not null default false,
  summary text not null default '',
  image_url text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

grant select on public.experience to anon, authenticated;
grant insert, update on public.experience to authenticated;

alter table public.experience enable row level security;

drop policy if exists "Public read experience" on public.experience;
create policy "Public read experience"
  on public.experience
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert experience" on public.experience;
create policy "Authenticated insert experience"
  on public.experience
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update experience" on public.experience;
create policy "Authenticated update experience"
  on public.experience
  for update
  to authenticated
  using (true)
  with check (true);
