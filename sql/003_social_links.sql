-- Run in Supabase → SQL Editor after 002_about.sql.
-- Public social links (home, footer, contact). Soft delete via deleted_at.

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  handle text not null default '',
  icon text not null default 'globe',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.social_links (label, href, handle, icon, sort_order)
select *
from (
  values
    (
      'GitHub',
      'https://github.com/Gonzalo777ic',
      '@Gonzalo777ic',
      'github',
      0
    ),
    (
      'LinkedIn',
      'https://www.linkedin.com/in/gonzalo-isique-bb38261b8',
      '@gonzalo-isique',
      'linkedin',
      1
    ),
    (
      'Email',
      'mailto:gonzaloisiquecastro@gmail.com',
      'gonzaloisiquecastro@gmail.com',
      'mail',
      2
    )
) as seed(label, href, handle, icon, sort_order)
where not exists (select 1 from public.social_links where deleted_at is null);

grant select on public.social_links to anon, authenticated;
grant insert, update on public.social_links to authenticated;

alter table public.social_links enable row level security;

drop policy if exists "Public read social_links" on public.social_links;
create policy "Public read social_links"
  on public.social_links
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert social_links" on public.social_links;
create policy "Authenticated insert social_links"
  on public.social_links
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update social_links" on public.social_links;
create policy "Authenticated update social_links"
  on public.social_links
  for update
  to authenticated
  using (true)
  with check (true);
