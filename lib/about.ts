export const ABOUT_ID = 1;
export const ABOUT_IMAGE_SLOTS = 4;

export type About = {
  id: number;
  label: string;
  title: string;
  titleAccent: string;
  body: string;
  imageUrls: string[];
  pageTitle: string;
  pageTitleAccent: string;
  pageBody: string;
  carouselCaption: string;
  roleTags: string[];
};

export const defaultAbout: About = {
  id: ABOUT_ID,
  label: "Sobre Mí",
  title: "Full Stack Developer",
  titleAccent:
    "apasionado por la arquitectura de sistemas y las abstracciones que los hacen posibles.",
  body: "Ingeniero de software con enfoque en arquitectura, diseño de sistemas y creación de soluciones eficientes. Me caracterizo por mi pensamiento lógico, capacidad de integrar visión técnica con experiencia de usuario, y mi habilidad para transformar ideas complejas en productos claros, escalables y bien construidos. Disfruto aprender, optimizar y darle estructura a cada proyecto para que cobre sentido y continuidad real.",
  imageUrls: [
    "/static/1.jpeg",
    "/static/2.jpeg",
    "/static/3.jpeg",
    "/static/5.png",
  ],
  pageTitle: "Ingeniero de Software",
  pageTitleAccent: "en formación constante.",
  pageBody: `Soy Gonzalo Isique y actualmente estoy cursando los **últimos ciclos de la carrera de Ingeniería Informática** en la Universidad Ricardo Palma. Mi enfoque se centra en la formación autodidacta y el aprendizaje continuo y reflexivo, buscando no solo dominar la arquitectura y el diseño de sistemas escalables, sino también comprender el propósito detrás de cada decisión de diseño y el establecimiento de lo que se consideran buenas prácticas y convenciones derivadas de ellas.

Mi trayectoria comenzó inicialmente en la carrera de Medicina Humana, donde cursé y aprobé asignaturas como Estadística, Demografía, Anatomía, Genética, Embriología, Telemática Médica, Investigación, entre otras. Esta etapa me brindó una base invaluable en el **entendimiento y manejo de datos, tipos de variables y lógica de investigación, así como la capacidad de abstracción necesaria para analizar sistemas biológicos complejos**, habilidades que hoy aplico directamente en la toma de decisiones y en el diseño de sistemas computacionales complejos.

La transición hacia la ingeniería estuvo motivada por una atracción creciente hacia la **abstracción y la construcción de sistemas**, combinando el rigor lógico adquirido previamente con mi pasión por las tecnologías de sistemas computacionales.`,
  carouselCaption:
    "Momentos capturados durante mi trayectoria académica y profesional.",
  roleTags: ["Developer", "Software Engineer"],
};

export function cubeImageUrls(urls: string[]) {
  const source = urls.filter(Boolean);
  const base = source.length > 0 ? source : defaultAbout.imageUrls;
  const padded = [...base];
  let index = 0;
  while (padded.length < ABOUT_IMAGE_SLOTS) {
    padded.push(base[index % base.length]);
    index += 1;
  }
  return padded.slice(0, ABOUT_IMAGE_SLOTS);
}
