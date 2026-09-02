-- Run in Supabase → SQL Editor after 009_footer.sql.
-- About page copy + 3-level academic labels.

alter table public.about
  add column if not exists page_title text,
  add column if not exists page_title_accent text not null default '',
  add column if not exists page_body text,
  add column if not exists carousel_caption text not null default '';

update public.about
set
  page_title = coalesce(page_title, 'Ingeniero de Software'),
  page_title_accent = coalesce(nullif(page_title_accent, ''), 'en formación constante.'),
  page_body = coalesce(
    page_body,
    'Soy Gonzalo Isique y actualmente estoy cursando los **últimos ciclos de la carrera de Ingeniería Informática** en la Universidad Ricardo Palma. Mi enfoque se centra en la formación autodidacta y el aprendizaje continuo y reflexivo, buscando no solo dominar la arquitectura y el diseño de sistemas escalables, sino también comprender el propósito detrás de cada decisión de diseño y el establecimiento de lo que se consideran buenas prácticas y convenciones derivadas de ellas.

Mi trayectoria comenzó inicialmente en la carrera de Medicina Humana, donde cursé y aprobé asignaturas como Estadística, Demografía, Anatomía, Genética, Embriología, Telemática Médica, Investigación, entre otras. Esta etapa me brindó una base invaluable en el **entendimiento y manejo de datos, tipos de variables y lógica de investigación, así como la capacidad de abstracción necesaria para analizar sistemas biológicos complejos**, habilidades que hoy aplico directamente en la toma de decisiones y en el diseño de sistemas computacionales complejos.

La transición hacia la ingeniería estuvo motivada por una atracción creciente hacia la **abstracción y la construcción de sistemas**, combinando el rigor lógico adquirido previamente con mi pasión por las tecnologías de sistemas computacionales.'
  ),
  carousel_caption = coalesce(
    nullif(carousel_caption, ''),
    'Momentos capturados durante mi trayectoria académica y profesional.'
  )
where id = 1;

create table if not exists public.academic_labels (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.academic_labels(id),
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

grant select on public.academic_labels to anon, authenticated;
grant insert, update on public.academic_labels to authenticated;

alter table public.academic_labels enable row level security;

drop policy if exists "Public read academic_labels" on public.academic_labels;
create policy "Public read academic_labels"
  on public.academic_labels
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert academic_labels" on public.academic_labels;
create policy "Authenticated insert academic_labels"
  on public.academic_labels
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update academic_labels" on public.academic_labels;
create policy "Authenticated update academic_labels"
  on public.academic_labels
  for update
  to authenticated
  using (true)
  with check (true);

with root as (
  insert into public.academic_labels (label, parent_id, sort_order)
  select 'Situación académica', null, 0
  where not exists (select 1 from public.academic_labels)
  returning id
),
uni as (
  insert into public.academic_labels (label, parent_id, sort_order)
  select 'Universidad Ricardo Palma – Ingeniería Informática', root.id, 0
  from root
  returning id
),
decimo as (
  insert into public.academic_labels (label, parent_id, sort_order)
  select 'Décimo Superior en los semestres:', root.id, 1
  from root
  returning id
),
beca as (
  insert into public.academic_labels (label, parent_id, sort_order)
  select 'Beca por rendimiento académico en los semestres:', root.id, 2
  from root
  returning id
),
decimo_periodos as (
  insert into public.academic_labels (label, parent_id, sort_order)
  select v.label, decimo.id, v.sort_order
  from decimo
  cross join (
    values
      ('Período 2025-2', 0),
      ('Período 2025-1', 1),
      ('Período 2024-2', 2),
      ('Período 2024-1', 3),
      ('Período 2023-2', 4),
      ('Período 2023-1', 5)
  ) as v(label, sort_order)
  returning id
),
beca_periodos as (
  insert into public.academic_labels (label, parent_id, sort_order)
  select v.label, beca.id, v.sort_order
  from beca
  cross join (
    values
      ('Período 2025-1', 0),
      ('Período 2025-2', 1)
  ) as v(label, sort_order)
  returning id
)
select 1;
