"use client";

import { motion, useScroll, useTransform } from "framer-motion"; // Importamos hooks de scroll
import Image from "next/image";
import { useRef } from "react";
import { Layout, Server, Cloud, Terminal } from "lucide-react";

const skillsData = {
  Frontend: {
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    techs: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Angular",
      "HTML5",
      "CSS3",
    ],
  },
  Backend: {
    icon: <Server className="w-5 h-5 text-violet-400" />,
    techs: [
      "Node.js",
      "Express",
      "Ruby on Rails",
      ".NET Core",
      "PostgreSQL",
      "SQL Server",
      "GraphQL",
      "Redis",
    ],
  },
  DevOps: {
    icon: <Cloud className="w-5 h-5 text-emerald-400" />,
    techs: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions"],
  },
  Other: {
    icon: <Terminal className="w-5 h-5 text-orange-400" />,
    techs: [
      "Git",
      "Agile/Scrum",
      "System Design",
      "Testing",
      "Clean Architecture",
    ],
  },
};

export function HomeSkills() {
  // Referencia al contenedor para medir el scroll relativo a esta sección
  const containerRef = useRef<HTMLElement>(null);

  // Detectamos el scroll de la página
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Empieza a animar cuando el top de la sección entra en pantalla
  });

  // Transformamos el scroll (0 a 1) en grados de rotación (0 a 360)
  // Multiplicamos por 200 para que gire lo suficiente
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={containerRef}
      className="w-full py-32 px-4 relative z-10 overflow-hidden mt-0" // mt-32 añadido para más separación
    >
      <div className="max-w-6xl mx-auto relative">
        {/* TÍTULO CON SPINNER DE FONDO */}
        <div className="text-center mb-24 relative flex flex-col items-center justify-center">
          {/* EL SPINNER GIRATORIO (Detrás del texto) */}
          <div
            className="
  absolute 
  top-1/2 left-1/2 
  -translate-x-1/2 -translate-y-1/2 
  w-[280px] h-[280px] 
  md:w-[370px] md:h-[370px] 
  -z-10 
  opacity-40 
  pointer-events-none
"
          >
            <motion.div
              style={{ rotate }} // APLICAMOS LA ROTACIÓN BASADA EN SCROLL AQUÍ
              className="w-full h-full relative"
            >
              {/* Asegúrate de que la imagen exista en /public/static/home_spinner.png */}
              <Image
                src="/static/home_spinner.png"
                alt="Spinner background"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* TEXTO DEL TÍTULO */}
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase mb-4">
            MI STACK
          </span>

          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>Algunas</span>
            {/* Gradiente y fuente Serif Italic */}
            <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Tecnologías
            </span>
          </h2>
        </div>

        {/* GRID DE SKILLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsData).map(([category, data], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Header de Categoría */}
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {data.icon}
                </div>
                <h3 className="font-semibold text-xl text-neutral-200">
                  {category}
                </h3>
              </div>

              {/* Badges Redondeados (Pill Shape) */}
              <div className="flex flex-wrap gap-2">
                {data.techs.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3 py-1.5 rounded-full text-xs font-medium
                      bg-white/[0.03] border border-white/[0.08] text-neutral-400
                      hover:bg-white/[0.08] hover:text-white hover:border-white/20
                      transition-all duration-300 cursor-default
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
