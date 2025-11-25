export const siteConfig = {
  name: "Gonzalo Isique",
  description: "Ingeniería Informática, Desarrollo de Software y Servicios Cloud.",
  links: {
    github: "https://github.com/Gonzalo777ic",
    linkedin: "https://www.linkedin.com/in/gonzalo-isique-bb38261b8",
    email: "gonzaloisiquecastro@gmail.com", 
    website: "https://portafolio-flame-ten.vercel.app/",
  },
} as const;

export type SiteConfig = typeof siteConfig;