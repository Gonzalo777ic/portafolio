export const FOOTER_ID = 1;

export type FooterContent = {
  id: number;
  bio: string;
  photoUrl: string;
  copyrightText: string;
  badgeText: string;
};

export const defaultFooter: FooterContent = {
  id: FOOTER_ID,
  bio: "Soy Gonzalo, un desarrollador full-stack y solucionador de problemas. ¡Gracias por visitar mi sitio!",
  photoUrl: "/static/6.jpeg",
  copyrightText: "Gonzalo Isique. Todos los derechos reservados.",
};
