export type Album = {
  id: string;
  title: string;
  artist: string;
  albumUrl: string;
  imageUrl: string;
  sortOrder: number;
};

export function albumCoverSrc(imageUrl: string) {
  if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) return imageUrl;
  return `/${imageUrl}`;
}

export function toSpotifyEmbedUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.includes("/embed/")) return trimmed;
  return trimmed.replace("open.spotify.com/", "open.spotify.com/embed/");
}

export const defaultAlbums: Album[] = [
  {
    id: "a-0",
    albumUrl: "https://open.spotify.com/embed/album/63up1MbRz4A0I8gXD7CAQc",
    imageUrl: "/static/complices.jpeg",
    title: "Cómplices",
    artist: "Luis Miguel",
    sortOrder: 0,
  },
  {
    id: "a-1",
    albumUrl: "https://open.spotify.com/embed/album/6LhTsVh7o6NUHyecScBJ14",
    imageUrl: "/static/corea.jpeg",
    title: "Light Years",
    artist: "Chick Corea Elektric Band",
    sortOrder: 1,
  },
  {
    id: "a-2",
    albumUrl: "https://open.spotify.com/embed/album/2jQaXpmaoRQDQLViaR41AR",
    imageUrl: "/static/seekae.jpeg",
    title: "The Sound Of ...",
    artist: "Seekae",
    sortOrder: 2,
  },
  {
    id: "a-3",
    albumUrl: "https://open.spotify.com/embed/album/3JUX7aD27mjSoOLS1vZMpc",
    imageUrl: "/static/caravan.jpeg",
    title: "Cunning Stunts",
    artist: "Caravan",
    sortOrder: 3,
  },
  {
    id: "a-4",
    albumUrl: "https://open.spotify.com/embed/album/24mfpDgch1Xr8qzJuqUi1Q",
    imageUrl: "/static/rosa_lula.jpeg",
    title: "Rosa Passos e Lula Galvão",
    artist: "Rosa Passos, Lula Galvão",
    sortOrder: 4,
  },
  {
    id: "a-5",
    albumUrl: "https://open.spotify.com/embed/album/59pCIacyvhUUvGH4H6WAPC",
    imageUrl: "/static/montaner.jpeg",
    title: "Los Hijos Del Sol",
    artist: "Ricardo Montaner",
    sortOrder: 5,
  },
  {
    id: "a-6",
    albumUrl: "https://open.spotify.com/embed/album/0o61yZjH9JNYjfQXQkdJFq",
    imageUrl: "/static/journey.jpeg",
    title: "Raised On Radio",
    artist: "Journey",
    sortOrder: 6,
  },
  {
    id: "a-7",
    albumUrl: "https://open.spotify.com/embed/album/4NiUxGgt2iSsbRa6Nf2ocq",
    imageUrl: "/static/nota.jpeg",
    title: "Otra Nota",
    artist: "Marc Anthony",
    sortOrder: 7,
  },
  {
    id: "a-8",
    albumUrl: "https://open.spotify.com/embed/album/1NQ8xOglxUhBoBmmjhuN2p",
    imageUrl: "/static/rosado.jpeg",
    title: "Te eché al olvido",
    artist: "Tony Rosado",
    sortOrder: 8,
  },
  {
    id: "a-9",
    albumUrl: "https://open.spotify.com/embed/album/3ncIAbJGUE2sQIu0J1TuE0",
    imageUrl: "/static/de.jpeg",
    title: "Ser Hümano!!",
    artist: "Tiro de Gracia",
    sortOrder: 9,
  },
  {
    id: "a-10",
    albumUrl: "https://open.spotify.com/embed/album/3OTOZme69Irx7si5GhpmHg",
    imageUrl: "/static/trio.jpeg",
    title: "Avenido",
    artist: "Aca Seca Trío",
    sortOrder: 10,
  },
];
