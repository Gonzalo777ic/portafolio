"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { AboutCarousel } from "@/components/about_page/about-carousel";
import { SkillsScatter } from "@/components/about_page/skills-scatter";

import { Brain, Cpu, Network, Award, GraduationCap } from "lucide-react";
import { AcademicBrainCard } from "@/components/about_page/AcademicBrainCard";
import { CtaSection } from "@/components/cta-section";

export default function About() {
  return (
    // CAMBIO CLAVE AQUÍ: Aplicamos la imagen de fondo y el efecto fijo.
    // Usaremos un fondo negro sólido por defecto y luego lo cubriremos con la textura.
    // Para lograr el efecto de la imagen adjunta, la imagen de fondo debe estar
    // en un div fijo detrás de todo.
<div className="bg-black min-h-screen text-foreground relative">      
      {/* FONDO GLOBAL FIJO con la imagen bw.jpg */}
      <div 
        className="fixed inset-0 z-0 bg-black"
        style={{
          // Usamos la propiedad `backgroundImage` de CSS
          backgroundImage: `url('/static/bw.jpg')`,
          // Propiedades para que la imagen cubra todo y se mantenga fija al hacer scroll
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          // Opcional: Oscurecer un poco la imagen para el contraste, usando un pseudo-elemento o un overlay en la imagen
        }}
      >
        {/* Overlay sutil para oscurecer la imagen de fondo si es necesario y garantizar el contraste */}
        <div className="absolute inset-0 bg-black/90"></div>
      </div>
      
      {/* El resto del contenido debe estar en una capa superior (z-index > z-0) */}
      <div className="relative z-10 bg-transparent">
        <div className="relative z-50">
          <Navbar />
        </div>

        <main className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto space-y-32">
            {/* 1. INTRODUCCIÓN & BIO (Carrusel a la Derecha) */}
            <section className="flex flex-col lg:flex-row gap-12 items-start">
              {/* LADO IZQUIERDO: TEXTO DETALLADO */}
              <div className="lg:w-1/2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    Ingeniero de Software <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      en formación constante.
                    </span>
                  </h1>

                  {/* --- BIOGRAFÍA DETALLADA Y TRANSCISIÓN --- */}
                  <div className="prose prose-invert prose-lg max-w-3xl text-neutral-300 leading-relaxed space-y-6">
                    <p>
                      Soy Gonzalo Isique y actualmente estoy cursando los{" "}
                      <strong>
                        últimos ciclos de la carrera de Ingeniería Informática
                      </strong>{" "}
                      en la Universidad Ricardo Palma. Mi enfoque se centra en la
                      formación autodidacta y el aprendizaje continuo y reflexivo,
                      buscando no solo dominar la arquitectura y el diseño de
                      sistemas escalables, sino también comprender el propósito
                      detrás de cada decisión de diseño y el establecimiento de lo
                      que se consideran buenas prácticas y convenciones derivadas
                      de ellas.
                    </p>

                    <p>
                      Mi trayectoria comenzó inicialmente en la carrera de
                      Medicina Humana, donde cursé y aprobé asignaturas como
                      Estadística, Demografía, Anatomía, Genética, Embriología,
                      Telemática Médica, Investigación, entre otras. Esta etapa
                      me brindó una base invaluable en el{" "}
                      <strong>
                        entendimiento y manejo de datos, tipos de variables y
                        lógica de investigación, así como la capacidad de
                        abstracción necesaria para analizar sistemas biológicos
                        complejos
                      </strong>
                      , habilidades que hoy aplico directamente en la toma de
                      decisiones y en el diseño de sistemas computacionales
                      complejos.
                    </p>

                    <p>
                      La transición hacia la ingeniería estuvo motivada por una
                      atracción creciente hacia la{" "}
                      <strong>abstracción y la construcción de sistemas</strong>,
                      combinando el rigor lógico adquirido previamente con mi
                      pasión por las tecnologías de sistemas computacionales.
                    </p>
                  </div>

                  <AcademicBrainCard />
                </motion.div>{" "}
              </div>

              {/* LADO DERECHO: CARRUSEL DE FOTOS */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:w-1/2 w-full text-center"
              >
                <AboutCarousel />
                <p className="text-center text-sm text-neutral-500 mt-4 italic">
                  Momentos capturados durante mi trayectoria académica y
                  profesional.
                </p>
              </motion.div>
            </section>

            <section className="text-center">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Skills
                </h2>
                <p className="text-neutral-400">
                  Algunas tecnologías con nivel de experiencia y familiaridad en distinto nivel 
                </p>
              </div>
              <SkillsScatter />
            </section>

            <section className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Brain className="text-purple-400" />
                  Lo que estoy aprendiendo ahora
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Interés 1: Machine Learning */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xl font-semibold text-purple-300">
                      <Cpu size={24} />
                      <h3>Machine Learning, AI & Data Engineering</h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      Actualmente estoy profundizando en el ciclo completo de
                      desarrollo de modelos de Machine Learning: desde la
                      preparación de datos, feature engineering y entrenamiento
                      con frameworks como TensorFlow y PyTorch, hasta la
                      integración de modelos en aplicaciones reales mediante APIs
                      o servicios escalables.
                      <br />
                      <br />
                      Me interesa especialmente cómo la analítica avanzada y los
                      modelos predictivos pueden apoyar la toma de decisiones
                      estratégicas en una empresa. Esto incluye entender cómo
                      automatizar flujos de datos, versionar experimentos,
                      monitorizar modelos y garantizar su reproducibilidad dentro
                      de pipelines de ML modernos.
                    </p>
                  </div>

                  {/* Interés 2: MLOps y Sistemas Distribuidos */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xl font-semibold text-blue-300">
                      <Network className="w-6 h-6" />
                      <h3>MLOps & Sistemas Distribuidos</h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      Estoy estudiando el flujo completo de MLOps: ingestión de
                      datos, orquestación con pipelines (Airflow, Prefect),
                      empaquetado de modelos, CI/CD para ML, despliegue en
                      contenedores, monitoreo de drift y observabilidad del
                      rendimiento.
                      <br />
                      <br />
                      Mi objetivo es entender cómo construir infraestructuras que
                      permitan entrenar, escalar y desplegar modelos de forma
                      confiable en entornos distribuidos, alineado con prácticas
                      de empresas que operan grandes volúmenes de datos y
                      requieren respuestas en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <CtaSection />
      </div>
    </div>
  );
}