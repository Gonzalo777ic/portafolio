-- Run in Supabase → SQL Editor after 004_services.sql.
-- Stack "Algunas Tecnologías": lista completa del skillsData original.
-- Soft delete via deleted_at.
-- id/updated_at explícitos: Prisma no deja DEFAULT en la BD con db push.

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

insert into public.skills (id, name, category, icon_url, icon_key, sort_order, updated_at)
select gen_random_uuid(), s.name, s.category, s.icon_url, s.icon_key, s.sort_order, now()
from (
  values
    -- Frontend
    ('React', 'frontend', 'https://cdn.simpleicons.org/react/61DAFB', 'react', 0),
    ('React Native', 'frontend', 'https://cdn.simpleicons.org/react/61DAFB', 'react-native', 1),
    ('Next.js', 'frontend', 'https://cdn.simpleicons.org/nextdotjs/ffffff', 'nextdotjs', 2),
    ('JavaScript', 'frontend', 'https://cdn.simpleicons.org/javascript/F7DF1E', 'javascript', 3),
    ('TypeScript', 'frontend', 'https://cdn.simpleicons.org/typescript/3178C6', 'typescript', 4),
    ('HTML5', 'frontend', 'https://cdn.simpleicons.org/html5/E34F26', 'html5', 5),
    ('CSS3', 'frontend', 'https://cdn.simpleicons.org/css3/1572B6', 'css3', 6),
    ('Tailwind CSS', 'frontend', 'https://cdn.simpleicons.org/tailwindcss/06B6D4', 'tailwindcss', 7),
    ('Zod', 'frontend', 'https://cdn.simpleicons.org/zod/3E67B1', 'zod', 8),
    ('Zustand', 'frontend', 'https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560', 'zustand', 9),
    ('Bootstrap', 'frontend', 'https://cdn.simpleicons.org/bootstrap/7952B3', 'bootstrap', 10),
    ('Responsive Design', 'frontend', 'https://cdn.simpleicons.org/materialdesign/ffffff', 'responsive-design', 11),
    ('Expo', 'frontend', 'https://cdn.simpleicons.org/expo/ffffff', 'expo', 12),

    -- Backend
    ('Java', 'backend', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'java', 0),
    ('Spring Boot', 'backend', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', 'spring', 1),
    ('Python', 'backend', 'https://cdn.simpleicons.org/python/3776AB', 'python', 2),
    ('Django', 'backend', 'https://cdn.simpleicons.org/django/092E20', 'django', 3),
    ('Flask', 'backend', 'https://cdn.simpleicons.org/flask/ffffff', 'flask', 4),
    ('PostgreSQL', 'backend', 'https://cdn.simpleicons.org/postgresql/4169E1', 'postgresql', 5),
    ('MongoDB', 'backend', 'https://cdn.simpleicons.org/mongodb/47A248', 'mongodb', 6),
    ('Oracle', 'backend', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', 'oracle', 7),
    ('MySQL', 'backend', 'https://cdn.simpleicons.org/mysql/4479A1', 'mysql', 8),
    ('SQL Server', 'backend', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', 'sqlserver', 9),
    ('Firebase', 'backend', 'https://cdn.simpleicons.org/firebase/FFCA28', 'firebase', 10),
    ('Node.js', 'backend', 'https://cdn.simpleicons.org/nodedotjs/339933', 'nodedotjs', 11),
    ('Auth0', 'backend', 'https://cdn.simpleicons.org/auth0/EB5424', 'auth0', 12),
    ('JWT', 'backend', 'https://cdn.simpleicons.org/jsonwebtokens/ffffff', 'jsonwebtokens', 13),

    -- DevOps
    ('Docker', 'devops', 'https://cdn.simpleicons.org/docker/2496ED', 'docker', 0),
    ('Kubernetes', 'devops', 'https://cdn.simpleicons.org/kubernetes/326CE5', 'kubernetes', 1),
    ('GCP', 'devops', 'https://cdn.simpleicons.org/googlecloud/4285F4', 'googlecloud', 2),
    ('GitHub Actions', 'devops', 'https://cdn.simpleicons.org/githubactions/2088FF', 'githubactions', 3),
    ('CI/CD', 'devops', 'https://cdn.simpleicons.org/gitlab/FCA121', 'cicd', 4),

    -- Other
    ('Git', 'other', 'https://cdn.simpleicons.org/git/F05032', 'git', 0),
    ('Agile/Scrum', 'other', 'https://cdn.simpleicons.org/jira/0052CC', 'agile-scrum', 1),
    ('RUP', 'other', 'https://cdn.simpleicons.org/uml/008000', 'rup', 2),
    ('Diagramas UML', 'other', 'https://upload.wikimedia.org/wikipedia/commons/d/d5/UML_logo.svg', 'uml', 3),
    ('Linux', 'other', 'https://cdn.simpleicons.org/linux/FCC624', 'linux', 4),
    ('Postman', 'other', 'https://cdn.simpleicons.org/postman/FF6C37', 'postman', 5),
    ('DSA', 'other', 'https://cdn.simpleicons.org/leetcode/FFA116', 'dsa', 6),
    ('Critical Thinking', 'other', 'https://cdn.simpleicons.org/openai/ffffff', 'critical-thinking', 7),
    ('Problem Solving', 'other', 'https://cdn.simpleicons.org/hackerrank/2EC866', 'problem-solving', 8),
    ('Excel', 'other', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%932025%29.svg.png', 'excel', 9),
    ('Power BI', 'other', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png', 'powerbi', 10),
    ('Machine Learning', 'other', 'https://cdn.simpleicons.org/tensorflow/FF6F00', 'tensorflow', 11),
    ('Jest', 'other', 'https://cdn.simpleicons.org/jest/C21325', 'jest', 12),
    ('Ngrok', 'other', 'https://cdn.simpleicons.org/ngrok/ffffff', 'ngrok', 13),
    ('System Design', 'other', 'https://cdn.simpleicons.org/blueprint/ffffff', 'system-design', 14),
    ('TOGAF', 'other', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuj8qdhIcMomeAgAi8QOpNvHvWztj5SLAtA&s', 'togaf', 15),
    ('Bizagi', 'other', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRripaurgH1sQd_zTqPRPDuLmAUN9m8UB-wyw&s', 'bizagi', 16),
    ('PlantUML', 'other', 'https://cdn.hashnode.com/res/hashnode/image/upload/v1609283590230/mqeCBmvO_.png', 'plantuml', 17),
    ('Monolithic', 'other', 'https://cdn.simpleicons.org/microstrategy/ffffff', 'monolithic', 18),
    ('Microservices', 'other', 'https://cdn.simpleicons.org/openstack/ffffff', 'microservices', 19),
    ('Layered Arch.', 'other', 'https://cdn.simpleicons.org/codesandbox/ffffff', 'layered-arch', 20)
) as s(name, category, icon_url, icon_key, sort_order)
where not exists (
  select 1 from public.skills existing
  where existing.name = s.name
    and existing.category = s.category
    and existing.deleted_at is null
);

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
