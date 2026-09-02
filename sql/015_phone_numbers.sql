-- Teléfonos / celulares (N filas). Soft delete via deleted_at.
-- Tras el schema: pnpm db:push también crea esta tabla.

create table if not exists public.phone_numbers (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  number text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

grant select on public.phone_numbers to anon, authenticated;
grant insert, update on public.phone_numbers to authenticated;

alter table public.phone_numbers enable row level security;

drop policy if exists "Public read phone_numbers" on public.phone_numbers;
create policy "Public read phone_numbers"
  on public.phone_numbers
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert phone_numbers" on public.phone_numbers;
create policy "Authenticated insert phone_numbers"
  on public.phone_numbers
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update phone_numbers" on public.phone_numbers;
create policy "Authenticated update phone_numbers"
  on public.phone_numbers
  for update
  to authenticated
  using (true)
  with check (true);
