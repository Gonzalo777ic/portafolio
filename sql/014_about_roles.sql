-- Run after 013_projects_page.sql.
-- Role pills on Contacto (same about row).

alter table public.about
  add column if not exists role_tags text[] not null default array['Developer', 'Software Engineer']::text[];

update public.about
set role_tags = array['Developer', 'Software Engineer']::text[]
where id = 1
  and (role_tags is null or cardinality(role_tags) = 0);
