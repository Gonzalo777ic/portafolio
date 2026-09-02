-- Home Spotify albums. Cover: /static/... o URL Cloudinary.
-- id/updated_at explícitos: Prisma no deja DEFAULT en la BD con db push.

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  album_url text not null,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

insert into public.albums (id, title, artist, album_url, image_url, sort_order, updated_at)
select gen_random_uuid(), s.title, s.artist, s.album_url, s.image_url, s.sort_order, now()
from (
  values
    ('Cómplices', 'Luis Miguel', 'https://open.spotify.com/embed/album/63up1MbRz4A0I8gXD7CAQc', '/static/complices.jpeg', 0),
    ('Light Years', 'Chick Corea Elektric Band', 'https://open.spotify.com/embed/album/6LhTsVh7o6NUHyecScBJ14', '/static/corea.jpeg', 1),
    ('The Sound Of ...', 'Seekae', 'https://open.spotify.com/embed/album/2jQaXpmaoRQDQLViaR41AR', '/static/seekae.jpeg', 2),
    ('Cunning Stunts', 'Caravan', 'https://open.spotify.com/embed/album/3JUX7aD27mjSoOLS1vZMpc', '/static/caravan.jpeg', 3),
    ('Rosa Passos e Lula Galvão', 'Rosa Passos, Lula Galvão', 'https://open.spotify.com/embed/album/24mfpDgch1Xr8qzJuqUi1Q', '/static/rosa_lula.jpeg', 4),
    ('Los Hijos Del Sol', 'Ricardo Montaner', 'https://open.spotify.com/embed/album/59pCIacyvhUUvGH4H6WAPC', '/static/montaner.jpeg', 5),
    ('Raised On Radio', 'Journey', 'https://open.spotify.com/embed/album/0o61yZjH9JNYjfQXQkdJFq', '/static/journey.jpeg', 6),
    ('Otra Nota', 'Marc Anthony', 'https://open.spotify.com/embed/album/4NiUxGgt2iSsbRa6Nf2ocq', '/static/nota.jpeg', 7),
    ('Te eché al olvido', 'Tony Rosado', 'https://open.spotify.com/embed/album/1NQ8xOglxUhBoBmmjhuN2p', '/static/rosado.jpeg', 8),
    ('Ser Hümano!!', 'Tiro de Gracia', 'https://open.spotify.com/embed/album/3ncIAbJGUE2sQIu0J1TuE0', '/static/de.jpeg', 9),
    ('Avenido', 'Aca Seca Trío', 'https://open.spotify.com/embed/album/3OTOZme69Irx7si5GhpmHg', '/static/trio.jpeg', 10)
) as s(title, artist, album_url, image_url, sort_order)
where not exists (
  select 1 from public.albums existing
  where existing.title = s.title
    and existing.artist = s.artist
    and existing.deleted_at is null
);

grant select on public.albums to anon, authenticated;
grant insert, update on public.albums to authenticated;

alter table public.albums enable row level security;

drop policy if exists "Public read albums" on public.albums;
create policy "Public read albums"
  on public.albums
  for select
  using (deleted_at is null);

drop policy if exists "Authenticated insert albums" on public.albums;
create policy "Authenticated insert albums"
  on public.albums
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update albums" on public.albums;
create policy "Authenticated update albums"
  on public.albums
  for update
  to authenticated
  using (true)
  with check (true);
