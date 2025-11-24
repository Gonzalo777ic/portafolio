"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10 px-4 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* COLUMNA 1: LOGO Y BIO (Ocupa 6 columnas) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
               {/* Reemplazamos el texto GI por tu logo real */}
               <div className="relative w-20 h-20 md:w-70 md:h-30">
                 <Image 
                   src="/static/logo.png" 
                   alt="Logo" 
                   fill
                   className="object-contain" // Invertimos colores si el logo es negro para que se vea en fondo negro
                   // Si tu logo ya es blanco o tiene buen contraste, quita 'invert'
                 />
               </div>
            </Link>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
              Soy Gonzalo, un desarrollador full-stack, freelancer y solucionador de problemas. 
              ¡Gracias por visitar mi sitio!
            </p>
          </div>

          {/* COLUMNA 2: GENERAL (Ocupa 2 columnas) */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-semibold text-lg">General</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sobre mí</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Proyectos</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: MÁS (Ocupa 2 columnas) */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-semibold text-lg">Más</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><a href="https://github.com/tuusuario" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Link</a></li>
            </ul>
          </div>

          {/* COLUMNA 4: FOTO PERSONAL (Ocupa 3 columnas) */}
          <div className="md:col-span-3 flex justify-start md:justify-end items-start">
            <div className="relative w-70 h-70 rounded-full overflow-hidden border-2 border-white/10 transition-all duration-500 hover:scale-105">
              <Image 
                src="/static/6.jpeg" // Usa una foto tuya real aquí
                alt="Gonzalo Isique" 
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* BARRA INFERIOR: COPYRIGHT Y SOCIALS */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} Gonzalo Isique. Todos los derechos reservados.
          </p>
          
          <div className="flex gap-6">
            <SocialLink href="https://github.com" icon={<Github size={20} />} />
            <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} />
            <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} />
            <SocialLink href="mailto:gonzaloisique777@gmail.com" icon={<Mail size={20} />} />
          </div>
        </div>

      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-neutral-500 hover:text-white transition-colors hover:scale-110 transform duration-200"
    >
      {icon}
    </a>
  )
}