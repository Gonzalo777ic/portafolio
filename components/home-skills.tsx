"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Layout, Server, Cloud, Terminal } from "lucide-react";
import { ScrollSpinner } from "./spinner-background";
const skillsData = {
  Frontend: {
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    techs: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "React Native", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Zod", icon: "https://cdn.simpleicons.org/zod/3E67B1" },
      { name: "Zustand", icon: "https://github.com/pmndrs/zustand/raw/main/bear.png" },
      { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3" },
      { name: "Responsive Design", icon: "https://cdn.simpleicons.org/materialdesign/ffffff" }, // Icono Material Design como referencia
      { name: "Expo", icon: "https://cdn.simpleicons.org/expo/ffffff" },
    ],
  },
  Backend: {
    icon: <Server className="w-5 h-5 text-violet-400" />,
    techs: [
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Django", icon: "https://cdn.simpleicons.org/django/092E20" },
      { name: "Flask", icon: "https://cdn.simpleicons.org/flask/ffffff" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Auth0", icon: "https://cdn.simpleicons.org/auth0/EB5424" },
      { name: "JWT", icon: "https://cdn.simpleicons.org/jsonwebtokens/ffffff" },
    ],
  },
  DevOps: {
    icon: <Cloud className="w-5 h-5 text-emerald-400" />,
    techs: [
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
      { name: "GCP", icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
      { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "CI/CD", icon: "https://cdn.simpleicons.org/gitlab/FCA121" }, // GitLab como símbolo de CI/CD
    ],
  },
  Other: {
    icon: <Terminal className="w-5 h-5 text-orange-400" />,
    techs: [
        
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Agile/Scrum", icon: "https://cdn.simpleicons.org/jira/0052CC" },
      { name: "RUP", icon: "https://cdn.simpleicons.org/uml/008000" }, 
      { name: "Diagramas UML", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/UML_logo.svg" },
      { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
            { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" }, // Postman oficial

      { name: "DSA", icon: "https://cdn.simpleicons.org/leetcode/FFA116" }, // LeetCode como referencia a Algoritmos
      { name: "Critical Thinking", icon: "https://cdn.simpleicons.org/openai/ffffff" }, // Icono abstracto (Inteligencia)
      { name: "Problem Solving", icon: "https://cdn.simpleicons.org/hackerrank/2EC866" }, // HackerRank como referencia
      { name: "Excel", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%932025%29.svg.png" },
      { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png" }, // Power BI oficial
      { name: "Machine Learning", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
      { name: "Jest", icon: "https://cdn.simpleicons.org/jest/C21325" },
      { name: "Ngrok", icon: "https://cdn.simpleicons.org/ngrok/ffffff" },
      { name: "System Design", icon: "https://cdn.simpleicons.org/blueprint/ffffff" }, // Blueprint icon
      { name: "TOGAF", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuj8qdhIcMomeAgAi8QOpNvHvWztj5SLAtA&s" },
      { name: "Bizagi", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRripaurgH1sQd_zTqPRPDuLmAUN9m8UB-wyw&s" },
      { name: "PlantUML", icon: "https://cdn.hashnode.com/res/hashnode/image/upload/v1609283590230/mqeCBmvO_.png" },
      { name: "Monolithic", icon: "https://cdn.simpleicons.org/microstrategy/ffffff" }, 
      { name: "Microservices", icon: "https://cdn.simpleicons.org/openstack/ffffff" }, 
      { name: "Layered Arch.", icon: "https://cdn.simpleicons.org/codesandbox/ffffff" },
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
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 1000]);

  const rotate = useSpring(rawRotate, {
    stiffness: 60, // resistencia del resorte
    damping: 20, // qué tan suave desacelera
    mass: 0.3, // inercia
  });

  return (
    <section
      ref={containerRef}
      className="w-full py-32 px-4 relative z-10 overflow-hidden mt-0" // mt-32 añadido para más separación
    >
      <div className="max-w-6xl mx-auto relative">
        {/* TÍTULO CON SPINNER DE FONDO */}
        <div className="text-center mb-24 relative flex flex-col items-center justify-center">
          {/* EL SPINNER GIRATORIO (Detrás del texto) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-90 pointer-events-none">
            <ScrollSpinner />
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
              <div className="flex flex-col gap-3">
                {data.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      /* FONDO OPACO PARA TAPAR LO DE ATRÁS */
                      bg-neutral-900/80 backdrop-blur-sm border border-white/5
                      hover:border-white/20 hover:bg-neutral-800
                      transition-all duration-300 group cursor-default
                    "
                  >
                    <div className="relative w-6 h-6 flex-shrink-0">
                      {/* Usamos un loader simple mientras carga la imagen externa si es necesario */}
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
