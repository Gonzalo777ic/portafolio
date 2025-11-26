// lib/projects-data.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  images: string[];
  github: string;     // Link principal (usualmente Frontend o Repo Monolito)
  githubBackend?: string; // Opcional: Por si quieres poner el link al back por separado
  demo?: string;
  video?: string;
}

export const projectsData: Project[] = [

  {
    id: "nomos-inventory",
    title: "Nomos Inventory System",
    description: "Sistema empresarial de gestión de inventarios y ERP modular. Panel administrativo complejo con visualización de datos 3D, gestión de proveedores, impuestos y reportes operativos en tiempo real.",
    features: [
      "Dashboard con visualización 3D (Three.js)",
      "Microservicios con Spring Boot y Java 17",
      "Renderizado Híbrido (SPA + SSR)"
    ],
    tags: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Three.js"],
    images: ["/static/nomos/1.png", "/static/nomos/2.png"],
    github: "https://github.com/Gonzalo777ic/nomos-inventory-system-frontend.git",
    githubBackend: "https://github.com/Gonzalo777ic/nomos-inventory-service.git"
  },
  {
    id: "forestguard",
    title: "ForestGuard Mobile",
    description: "Aplicación móvil avanzada para la gestión y monitoreo de operaciones forestales. Digitaliza roles de campo (Talador, Operador, Trazador), rastreo GPS en tiempo real y sincronización offline-first.",
    features: [
      "Rastreo GPS en tiempo real con Expo Location",
      "Roles dinámicos y autenticación Auth0",
      "Gestión de proyectos forestales y maquinaria"
    ],
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Auth0", "Maps"],
    images: ["/static/projects/forestguard/1.png", "/static/projects/forestguard/2.png"],
    github: "https://github.com/Gonzalo7388/react-native-forestguard.git"
  },
  {
    id: "recall",
    title: "RECALL Quiz System",
    description: "Plataforma educativa Serverless para creación y ejecución de quizzes masivos. Arquitectura híbrida diseñada para velocidad, permitiendo carga masiva de preguntas vía JSON y sesiones en tiempo real.",
    features: [
      "Arquitectura Serverless (Netlify Functions)",
      "Carga masiva de preguntas (JSON)",
      "Estado global con Zustand"
    ],
    tags: ["React", "TypeScript", "Vite", "Node.js", "Serverless", "Shadcn/UI"],
    images: ["/static/projects/recall/1.png"],
    github: "https://github.com/Gonzalo777ic/recall.git"
  },
  
  {
    id: "nomos-store",
    title: "Nomos E-Commerce",
    description: "Plataforma de comercio electrónico moderna con experiencia inmersiva. Integra gestión de carrito, pasarelas de pago y un backend robusto basado en microservicios seguros con OAuth2.",
    features: [
      "Experiencia de compra inmersiva",
      "Seguridad OAuth2 y JWT",
      "Arquitectura de Microservicios"
    ],
    tags: ["React", "Tailwind CSS", "Spring Boot", "Auth0", "Docker", "PostgreSQL"],
    images: ["/static/projects/nomos/store-1.png"],
    github: "https://github.com/Gonzalo777ic/nomos-store-frontend.git",
    githubBackend: "https://github.com/Gonzalo777ic/nomos-store-service.git"
  },
  {
    id: "sanitas-oris",
    title: "Sanitas Oris Platform",
    description: "Sistema integral de gestión para clínicas médicas. Soporta múltiples roles (Doctor, Paciente, Admin) para gestión de agendas, reservas inteligentes y expedientes médicos electrónicos.",
    features: [
      "Agenda médica dinámica y bloqueo de horarios",
      "Roles y permisos granulados (Auth0)",
      "Notificaciones y mensajería interna"
    ],
    tags: ["React", "Django 5", "Python", "PostgreSQL", "DRF", "Bootstrap"],
    images: ["/static/projects/sanitas/1.png"],
    github: "https://github.com/Gonzalo777ic/SistemaReservas_SanitasOris_Frontend.git",
    githubBackend: "https://github.com/Gonzalo777ic/SistemaReservas_SanitasOris_Backend.git"
  },
  {
    id: "face-auth",
    title: "Face Recognition Auth",
    description: "Sistema de seguridad biométrica que implementa autenticación por reconocimiento facial. Utiliza modelos de Machine Learning (Scikit-learn) servidos a través de una API Django para verificar identidades.",
    features: [
      "Inferencia ML con Scikit-learn",
      "Procesamiento de imágenes con Pandas/Numpy",
      "Autenticación Biométrica"
    ],
    tags: ["Python", "Django", "React", "Machine Learning", "Scikit-learn", "Pandas"],
    images: ["/static/projects/face-auth/1.png"],
    github: "https://github.com/Gonzalo777ic/react-django-postgresql-machine-learning-login-face-recognition-frontend.git",
    githubBackend: "https://github.com/Gonzalo777ic/react-django-postgresql-machine-learning-login-face-recognition-backend.git"
  },
  {
    id: "bank-crud",
    title: "Credit Bank Core",
    description: "Simulación de núcleo bancario transaccional. Maneja operaciones ACID complejas, gestión de tarjetas, préstamos y cuentas con validaciones estrictas de integridad de datos.",
    features: [
      "Transacciones ACID y Triggers SQL",
      "Dashboards financieros con Chart.js",
      "Seguridad JWT"
    ],
    tags: ["Django", "React", "PostgreSQL", "JWT", "Chart.js"],
    images: ["/static/projects/bank/1.png"],
    github: "https://github.com/Gonzalo777ic/react-django-postgresql-crud-app-credit-bank.git"
  },
  {
    id: "pizza-delivery",
    title: "Real-time Pizza Delivery",
    description: "Plataforma de delivery con actualizaciones en tiempo real. Utiliza Webhooks y Blinker para notificar cambios de estado en los pedidos y geolocalización básica.",
    features: [
      "Webhooks para notificaciones en tiempo real",
      "Renderizado SSR con Jinja2",
      "Arquitectura MVC con Flask"
    ],
    tags: ["Python", "Flask", "SQLAlchemy", "Vanilla JS", "PostgreSQL"],
    images: ["/static/projects/pizza/1.png"],
    github: "https://github.com/Gonzalo777ic/vanilla-front-python-flask-postgresql-delivery-pizza-app.git"
  },
  {
    id: "snake-ai",
    title: "Snake AI: Adaptive ML",
    description: "Reinvención del clásico Snake integrando un motor de Inteligencia Artificial (Random Forest) que analiza el comportamiento del jugador y adapta la dificultad y velocidad en tiempo real.",
    features: [
      "Aprendizaje Supervisado Incremental",
      "Ajuste dinámico de dificultad",
      "Análisis de patrones de jugador"
    ],
    tags: ["Python", "Scikit-learn", "NumPy", "Game Logic"],
    images: ["/static/projects/snake/1.png"],
    github: "https://github.com/Gonzalo777ic/snake.git"
  },
  {
    id: "mundidental",
    title: "Mundidental Clinic",
    description: "Sitio web corporativo de alto rendimiento para clínica odontológica. Diseño 'Pixel Perfect' centrado en la velocidad de carga y SEO, sin dependencia de frameworks pesados.",
    features: [
      "Optimización 100/100 Lighthouse",
      "Diseño Responsive sin Frameworks",
      "Integración directa con WhatsApp API"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "SEO"],
    images: ["/static/projects/mundidental/1.png"],
    github: "https://github.com/Gonzalo777ic" // No proporcionaste link específico, puse el perfil
  },
  {
    id: "pharmayap",
    title: "PharmaYap Manager",
    description: "Solución integral para gestión farmacéutica (en desarrollo). Control de stock, proveedores y dispensación de medicamentos con arquitectura escalable Node.js y React.",
    features: [
      "Gestión de inventario farmacéutico",
      "API REST con Express y MongoDB",
      "Frontend modular con Vite"
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Mongoose"],
    images: ["/static/projects/pharma/1.png"],
    github: "https://github.com/Gonzalo7388/TP-PharmaYap-Front.git",
    githubBackend: "https://github.com/Gonzalo7388/TP-PharmaYap-Back.git"
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio",
    description: "Este portafolio. Una demostración de ingeniería frontend moderna utilizando Next.js App Router, animaciones complejas con Framer Motion y diseño de componentes reutilizables.",
    features: [
      "Next.js App Router & Server Components",
      "Animaciones 3D y Partículas",
      "Arquitectura de datos centralizada"
    ],
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/UI"],
    images: ["/static/projects/portfolio/1.png"],
    github: "https://github.com/Gonzalo777ic/portafolio.git"
  }
];