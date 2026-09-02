-- Run in Supabase → SQL Editor after 010_about_page.sql.
-- About page: editable "Lo que estoy aprendiendo ahora" title + N topics.

create table if not exists public.learning_section (
  id integer primary key default 1 check (id = 1),
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.learning_section (id, title)
values (1, 'Lo que estoy aprendiendo ahora')
on conflict (id) do nothing;

create table if not exists public.learning_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null default 'brain',
  icon_color text not null default 'violet',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.learning_topics (title, description, icon, icon_color, sort_order)
select *
from (
  values
    (
      'Machine Learning, AI & Data Engineering',
      'Actualmente estoy profundizando en el ciclo completo de desarrollo de modelos de Machine Learning: desde la preparación de datos, feature engineering y entrenamiento con frameworks como TensorFlow y PyTorch, hasta la integración de modelos en aplicaciones reales mediante APIs o servicios escalables.

Me interesa especialmente cómo la analítica avanzada y los modelos predictivos pueden apoyar la toma de decisiones estratégicas en una empresa. Esto incluye entender cómo automatizar flujos de datos, versionar experimentos, monitorizar modelos y garantizar su reproducibilidad dentro de pipelines de ML modernos.',
      'cpu',
      'violet',
      0
    ),
    (
      'MLOps & Sistemas Distribuidos',
      'Estoy estudiando el flujo completo de MLOps: ingestión de datos, orquestación con pipelines (Airflow, Prefect), empaquetado de modelos, CI/CD para ML, despliegue en contenedores, monitoreo de drift y observabilidad del rendimiento.

Mi objetivo es entender cómo construir infraestructuras que permitan entrenar, escalar y desplegar modelos de forma confiable en entornos distribuidos, alineado con prácticas de empresas que operan grandes volúmenes de datos y requieren respuestas en tiempo real.',
      'network',
      'blue',
      1
    )
) as seed(title, description, icon, icon_color, sort_order)
where not exists (select 1 from public.learning_topics);

grant select on public.learning_section to anon, authenticated;
grant update on public.learning_section to authenticated;
grant select on public.learning_topics to anon, authenticated;
grant insert, update on public.learning_topics to authenticated;

alter table public.learning_section enable row level security;
alter table public.learning_topics enable row level security;

drop policy if exists "Public read learning_section" on public.learning_section;
create policy "Public read learning_section"
  on public.learning_section
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated update learning_section" on public.learning_section;
create policy "Authenticated update learning_section"
  on public.learning_section
  for update
  to authenticated
  using (deleted_at is null)
  with check (deleted_at is null);

drop policy if exists "Public read learning_topics" on public.learning_topics;
create policy "Public read learning_topics"
  on public.learning_topics
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert learning_topics" on public.learning_topics;
create policy "Authenticated insert learning_topics"
  on public.learning_topics
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update learning_topics" on public.learning_topics;
create policy "Authenticated update learning_topics"
  on public.learning_topics
  for update
  to authenticated
  using (true)
  with check (true);
