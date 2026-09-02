-- Run in Supabase → SQL Editor after 004_services.sql.
-- Stack "Algunas Tecnologías": N skills per area. Soft delete via deleted_at.

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  icon_url text not null,
  icon_key text not null default 'custom',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.skills (name, category, icon_url, icon_key, sort_order)
select *
from (
  values
    ('React', 'frontend', 'https://cdn.simpleicons.org/react/61DAFB', 'react', 0),
    ('React Native', 'frontend', 'https://cdn.simpleicons.org/react/61DAFB', 'react-native', 1),
    ('Next.js', 'frontend', 'https://cdn.simpleicons.org/nextdotjs/ffffff', 'nextdotjs', 2),
    ('JavaScript', 'frontend', 'https://cdn.simpleicons.org/javascript/F7DF1E', 'javascript', 3),
    ('TypeScript', 'frontend', 'https://cdn.simpleicons.org/typescript/3178C6', 'typescript', 4),
    ('HTML5', 'frontend', 'https://cdn.simpleicons.org/html5/E34F26', 'html5', 5),
    ('CSS3', 'frontend', 'https://cdn.simpleicons.org/css3/1572B6', 'css3', 6),
    ('Tailwind CSS', 'frontend', 'https://cdn.simpleicons.org/tailwindcss/06B6D4', 'tailwindcss', 7),
    ('Java', 'backend', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'java', 0),
    ('Spring Boot', 'backend', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', 'spring', 1),
    ('Python', 'backend', 'https://cdn.simpleicons.org/python/3776AB', 'python', 2),
    ('Django', 'backend', 'https://cdn.simpleicons.org/django/092E20', 'django', 3),
    ('PostgreSQL', 'backend', 'https://cdn.simpleicons.org/postgresql/4169E1', 'postgresql', 4),
    ('Docker', 'devops', 'https://cdn.simpleicons.org/docker/2496ED', 'docker', 0),
    ('Kubernetes', 'devops', 'https://cdn.simpleicons.org/kubernetes/326CE5', 'kubernetes', 1),
    ('GCP', 'devops', 'https://cdn.simpleicons.org/googlecloud/4285F4', 'googlecloud', 2),
    ('Git', 'other', 'https://cdn.simpleicons.org/git/F05032', 'git', 0),
    ('Linux', 'other', 'https://cdn.simpleicons.org/linux/FCC624', 'linux', 1)
) as seed(name, category, icon_url, icon_key, sort_order)
where not exists (select 1 from public.skills);

grant select on public.skills to anon, authenticated;
grant insert, update on public.skills to authenticated;

alter table public.skills enable row level security;

drop policy if exists "Public read skills" on public.skills;
create policy "Public read skills"
  on public.skills
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert skills" on public.skills;
create policy "Authenticated insert skills"
  on public.skills
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update skills" on public.skills;
create policy "Authenticated update skills"
  on public.skills
  for update
  to authenticated
  using (true)
  with check (true);
