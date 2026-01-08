// lib/projects-data.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
  features: string[];
  tags: string[];
  images: string[];
  github: string;
  githubBackend?: string;
  demo?: string;
  video?: string;
}

export const projectsData: Project[] = [
  {
  "id": "retail-intelligence-gcp",
  "title": "Smart Retail Analytics Ecosystem",
  "description": "Plataforma integral de inteligencia de mercado que monitorea precios y stock de más de 10 retailers tecnológicos en Perú y Amazon global. Arquitectura Cloud-Native que orquesta la extracción masiva de datos, procesamiento ETL y análisis predictivo para detectar oportunidades de arbitraje.",
  "featured": true,
  "features": [
    "Infraestructura Serverless en Google Cloud (GKE/Cloud Run) con Docker",
    "Data Warehouse en BigQuery para análisis histórico masivo",
    "Motor de IA con Vertex AI para detección de anomalías de precios",
    "Scraping distribuido con evasión de anti-bots (Selenium/Python)",
    "API RESTful optimizada (FastAPI) y Dashboard interactivo"
  ],
  "tags": [
    "Python",
    "Selenium",
    "Google Cloud Platform",
    "BigQuery",
    "Vertex AI",
    "Docker & Kubernetes",
    "FastAPI",
    "React / Next.js",
    "Vercel"
  ],
  "images": [
    "/static/scraper/1.png",
    "/static/scraper/2.png",
    "/static/scraper/3.png",
    "/static/scraper/4.png",
    "/static/scraper/5.png",
    "/static/scraper/6.png"
  ],
  "github": "https://github.com/Gonzalo777ic/scraper-frontend",
  "githubBackend": "https://github.com/Gonzalo777ic/web-scraper-GCP",
  "demo": "https://scraper-frontend-bay.vercel.app/"
},
  {
    id: "nomos-inventory",
    title: "Nomos Inventory System",
    description:
      "Sistema empresarial de gestión de inventarios y ERP modular. Panel administrativo complejo con visualización de datos 3D, gestión de proveedores, impuestos y reportes operativos en tiempo real.",
    featured: true,
    features: [
      "Dashboard con visualización 3D (Three.js)",
      "Microservicios con Spring Boot y Java 17",
      "Renderizado Híbrido (SPA + SSR)",
    ],
    tags: [
      "React",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Three.js",
    ],
    images: [
      "/static/nomos/1.png",
      "/static/nomos/2.png",
      "/static/nomos/3.png",
      "/static/nomos/4.png",
      "/static/nomos/5.png",
      "/static/nomos/6.png",
      "/static/nomos/7.png",
      "/static/nomos/8.png",
      "/static/nomos/9.png",
      "/static/nomos/10.png",
    ],
    github:
      "https://github.com/Gonzalo777ic/nomos-inventory-system-frontend.git",
    githubBackend:
      "https://github.com/Gonzalo777ic/nomos-inventory-service.git",
  },
  {
    id: "nomos-store",
    title: "Nomos E-Commerce",
    description:
      "Plataforma de comercio electrónico moderna con experiencia inmersiva. Integra gestión de carrito, pasarelas de pago y un backend robusto basado en microservicios seguros con Auth0.",
    features: [
      "Experiencia de compra inmersiva",
      "Seguridad OAuth2 y JWT",
      "Arquitectura de Microservicios",
    ],
    tags: [
      "React",
      "Tailwind CSS",
      "Spring Boot",
      "Auth0",
      "Docker",
      "PostgreSQL",
    ],
    images: [],
    github: "https://github.com/Gonzalo777ic/nomos-store-frontend.git",
    githubBackend: "https://github.com/Gonzalo777ic/nomos-store-service.git",
  },
  {
    id: "nomos-auth-service",
    title: "Nomos Auth Service",
    description:
      "Microservicio centralizado de identidad y autenticación del ecosistema NOMOS, basado en Spring Boot 3, JWT y seguridad OAuth2. Gestiona usuarios, roles y verificación de tokens con integración nativa hacia Auth0.",
    features: [
      "Autenticación y autorización con Spring Security",
      "Validación y emisión de JWT (JwtUtil + filtros personalizados)",
      "Integración con Auth0 como proveedor de identidad",
      "Gestión de usuarios, roles y tipos de documento",
      "Arquitectura modular (controllers, services, repositories, models)",
      "OAuth2 Resource Server totalmente stateless",
      "Validaciones integradas con Spring Validation",
    ],
    tags: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "OAuth2",
      "JWT",
      "JPA",
      "Hibernate",
      "PostgreSQL",
    ],
    images: [],
    github: "https://github.com/Gonzalo777ic/nomos-auth-service",
  },

  {
    id: "nomos-inventory-service",
    title: "Nomos Inventory Service",
    description:
      "Microservicio encargado de la gestión de productos, categorías, atributos, almacenes y stock dentro de NOMOS. Implementado con Spring Boot 3, JPA y seguridad mediante JWT propio.",
    features: [
      "Gestión completa de inventario (productos, categorías, proveedores)",
      "Control de stock y movimientos",
      "DataLoader para inicialización de datos",
      "Spring Security con validación de JWT",
      "Validaciones robustas con Spring Validation",
      "Integración con PostgreSQL mediante JPA/Hibernate",
    ],
    tags: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "JWT",
      "JPA",
      "Hibernate",
      "PostgreSQL",
    ],
    images: [],
    github: "https://github.com/Gonzalo777ic/nomos-inventory-service",
  },

  {
    id: "nomos-store-service",
    title: "Nomos Store Service",
    description:
      "Microservicio de ventas y logística para NOMOS. Administra órdenes, precios, promociones, descuentos, clientes y flujo de despacho. Seguro mediante JWT y conectado al inventario.",
    features: [
      "Gestión de órdenes de venta",
      "Control de precios, promociones e impuestos",
      "Integración con inventario para descargo de stock",
      "Validación de JWT propia",
      "Modelos JPA + PostgreSQL",
      "Arquitectura desacoplada y escalable",
    ],
    tags: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "JWT",
      "JPA",
      "PostgreSQL",
    ],
    images: [],
    github: "https://github.com/Gonzalo777ic/nomos-store-service",
  },

  {
    id: "forestguard",
    title: "ForestGuard Mobile",
    description:
      "Aplicación móvil avanzada para la gestión y monitoreo de operaciones forestales. Digitaliza roles de campo (Talador, Operador, Trazador), rastreo GPS en tiempo real y sincronización offline-first.",
    features: [
      "Rastreo GPS en tiempo real con Expo Location",
      "Roles dinámicos y autenticación Auth0",
      "Gestión de proyectos forestales y maquinaria",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Auth0", "Maps"],
    images: [],
    github: "https://github.com/Gonzalo7388/react-native-forestguard.git",
  },
  {
    id: "recall",
    title: "RECALL Quiz System",
    description:
      "Plataforma educativa Serverless para creación y ejecución de quizzes masivos. Arquitectura híbrida diseñada para velocidad, permitiendo carga masiva de preguntas vía JSON y sesiones en tiempo real.",
    featured: true,
    features: [
      "Arquitectura Serverless (Netlify Functions)",
      "Carga masiva de preguntas (JSON)",
      "Estado global con Zustand",
    ],
    tags: ["React", "TypeScript", "Vite", "Node.js", "Serverless", "Shadcn/UI"],
    images: [
      "/static/recall/1.png",
      "/static/recall/2.png",
      "/static/recall/3.png",
      "/static/recall/4.png",
      "/static/recall/5.png",
      "/static/recall/6.png",
    ],
    github: "https://github.com/Gonzalo777ic/recall.git",
  },

  {
    id: "sanitas-oris",
    title: "Sanitas Oris Platform",
    description:
      "Sistema integral de gestión para clínicas médicas. Soporta múltiples roles (Doctor, Paciente, Admin) para gestión de agendas, reservas inteligentes y expedientes médicos electrónicos.",
    featured: true,
    features: [
      "Agenda médica dinámica y bloqueo de horarios",
      "Roles y permisos granulados (Auth0)",
      "Notificaciones y mensajería interna",
    ],
    tags: ["React", "Django 5", "Python", "PostgreSQL", "DRF", "Bootstrap"],
    images: [
      "/static/sanitas/1.png",
      "/static/sanitas/2.png",
      "/static/sanitas/3.png",
      "/static/sanitas/4.png",
      "/static/sanitas/5.png",
      "/static/sanitas/6.png",
    ],
    github:
      "https://github.com/Gonzalo777ic/SistemaReservas_SanitasOris_Frontend.git",
    githubBackend:
      "https://github.com/Gonzalo777ic/SistemaReservas_SanitasOris_Backend.git",
  },
  {
    id: "face-auth",
    title: "Face Recognition Auth",
    description:
      "Sistema de seguridad biométrica que implementa autenticación por reconocimiento facial. Utiliza modelos de Machine Learning (Scikit-learn) servidos a través de una API Django para verificar identidades.",
    features: [
      "Inferencia ML con Scikit-learn",
      "Procesamiento de imágenes con Pandas/Numpy",
      "Autenticación Biométrica",
    ],
    tags: [
      "Python",
      "Django",
      "React",
      "Machine Learning",
      "Scikit-learn",
      "Pandas",
    ],
    images: [],
    github:
      "https://github.com/Gonzalo777ic/react-django-postgresql-machine-learning-login-face-recognition-frontend.git",
    githubBackend:
      "https://github.com/Gonzalo777ic/react-django-postgresql-machine-learning-login-face-recognition-backend.git",
  },
  {
    id: "bank-crud",
    title: "Credit Bank Core",
    description:
      "Simulación de núcleo bancario transaccional. Maneja operaciones ACID complejas, gestión de tarjetas, préstamos y cuentas con validaciones estrictas de integridad de datos.",
    features: [
      "Transacciones ACID y Triggers SQL",
      "Dashboards financieros con Chart.js",
      "Seguridad JWT",
    ],
    tags: ["Django", "React", "PostgreSQL", "JWT", "Chart.js"],
    images: [],
    github:
      "https://github.com/Gonzalo777ic/react-django-postgresql-crud-app-credit-bank.git",
  },
  {
    id: "pizza-delivery",
    title: "Real-time Pizza Delivery",
    description:
      "Plataforma de delivery con actualizaciones en tiempo real. Utiliza Webhooks y Blinker para notificar cambios de estado en los pedidos y geolocalización básica.",
    features: [
      "Webhooks para notificaciones en tiempo real",
      "Renderizado SSR con Jinja2",
      "Arquitectura MVC con Flask",
    ],
    tags: ["Python", "Flask", "SQLAlchemy", "Vanilla JS", "PostgreSQL"],
    images: [],
    github:
      "https://github.com/Gonzalo777ic/vanilla-front-python-flask-postgresql-delivery-pizza-app.git",
  },
  {
    id: "snake-ai",
    title: "Snake AI: Adaptive ML",
    description:
      "Reinvención del clásico Snake integrando un motor de Inteligencia Artificial (Random Forest) que analiza el comportamiento del jugador y adapta la dificultad y velocidad en tiempo real.",
    features: [
      "Aprendizaje Supervisado Incremental",
      "Ajuste dinámico de dificultad",
      "Análisis de patrones de jugador",
    ],
    tags: ["Python", "Scikit-learn", "NumPy", "Game Logic"],
    images: [],
    github: "https://github.com/Gonzalo777ic/snake.git",
  },
  {
    id: "mundidental",
    title: "Mundidental Clinic",
    description:
      "Sitio web corporativo de alto rendimiento para clínica odontológica. Diseño 'Pixel Perfect' centrado en la velocidad de carga y SEO, sin dependencia de frameworks pesados.",
    features: [
      "Optimización 100/100 Lighthouse",
      "Diseño Responsive sin Frameworks",
      "Integración directa con WhatsApp API",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "SEO"],
    images: [],
    github: "https://github.com/Gonzalo777ic", 
  },
  {
    id: "pharmayap",
    title: "PharmaYap Manager",
    description:
      "Solución integral para gestión farmacéutica (en desarrollo). Control de stock, proveedores y dispensación de medicamentos con arquitectura escalable Node.js y React.",
    features: [
      "Gestión de inventario farmacéutico",
      "API REST con Express y MongoDB",
      "Frontend modular con Vite",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Mongoose"],
    images: [],
    github: "https://github.com/Gonzalo7388/TP-PharmaYap-Front.git",
    githubBackend: "https://github.com/Gonzalo7388/TP-PharmaYap-Back.git",
  },
  {
    id: "pharmayap-backend",
    title: "PharmaYap Backend API",
    description:
      "API REST modular para la gestión completa de una farmacia. Incluye entidades de productos, categorías, inventario, pedidos, proveedores y reclamos, implementada con Express y MongoDB (Atlas). Arquitectura organizada y preparada para integrarse con frontends modernos.",
    features: [
      "Modelo de datos completo para entorno farmacéutico",
      "API REST con Express y Mongoose",
      "Controladores y rutas modularizados",
      "Conexión a MongoDB Atlas",
      "Estructura escalable para integración futura con frontend",
    ],
    tags: ["Node.js", "Express", "MongoDB", "Mongoose", "REST API"],
    images: [],
    github: "https://github.com/Gonzalo7388/TP-PharmaYap-Back.git",
  },

  {
    id: "portfolio",
    title: "Interactive Portfolio",
    description:
      "Este portafolio. Una demostración de ingeniería frontend moderna utilizando Next.js App Router, animaciones complejas con Framer Motion y diseño de componentes reutilizables.",
    features: [
      "Next.js App Router & Server Components",
      "Animaciones 3D y Partículas",
      "Arquitectura de datos centralizada",
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Shadcn/UI",
    ],
    images: [],
    github: "https://github.com/Gonzalo777ic/portafolio.git",
  },
];
