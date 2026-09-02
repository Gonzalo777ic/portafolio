-- Run in Supabase → SQL Editor after 006_projects.sql.
-- Home word marquee. row_index 1 = fondo, 2 = primer plano.

create table if not exists public.marquee_words (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  row_index integer not null check (row_index in (1, 2)),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.marquee_words (label, row_index, sort_order)
select *
from (
  values
    ('ABSTRACCIÓN', 1, 0),
    ('IMPLEMENTACIÓN', 1, 1),
    ('VISIÓN', 1, 2),
    ('EJECUCIÓN', 1, 3),
    ('ESTRATEGIA', 1, 4),
    ('CÓDIGO', 1, 5),
    ('DISEÑO', 1, 6),
    ('LÓGICA', 1, 7),
    ('GRANULARIDAD', 1, 8),
    ('MODULARIDAD', 1, 9),
    ('FLEXIBILIDAD', 1, 10),
    ('IDENTIDAD', 2, 0),
    ('RIGOR', 2, 1),
    ('TRAZA', 2, 2),
    ('CURIOSIDAD', 2, 3),
    ('ITERACIÓN INTENCIONAL', 2, 4),
    ('PRAXIS CONSCIENTE', 2, 5),
    ('MULTIESCALAR', 2, 6),
    ('DIRECCIÓN INTERNA', 2, 7),
    ('TRANSFORMACIÓN', 2, 8)
) as seed(label, row_index, sort_order)
where not exists (select 1 from public.marquee_words);

grant select on public.marquee_words to anon, authenticated;
grant insert, update on public.marquee_words to authenticated;

alter table public.marquee_words enable row level security;

drop policy if exists "Public read marquee_words" on public.marquee_words;
create policy "Public read marquee_words"
  on public.marquee_words
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert marquee_words" on public.marquee_words;
create policy "Authenticated insert marquee_words"
  on public.marquee_words
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update marquee_words" on public.marquee_words;
create policy "Authenticated update marquee_words"
  on public.marquee_words
  for update
  to authenticated
  using (true)
  with check (true);
