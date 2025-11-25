"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: siteConfig.links.github,
    handle: "@Gonzalo777ic",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    handle: "@gonzalo-isique",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    handle: siteConfig.links.email,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteConfig.links.website);
    setIsCopied(true);
    toast({
      title: "¡Enlace copiado!",
      description: "El link del website se ha copiado al portapapeles.",
    });

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative text-foreground">
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url('/static/bw.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-6 max-w-2xl w-full"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <img
              src="/static/1.jpeg"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Gonzalo Isique
            </h1>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Developer
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Software Engineer
              </span>
            </div>
          </div>

          <div className="flex flex-row gap-4 w-full max-w-md justify-center pt-4">
            <Button
              onClick={handleCopyLink}
              className="flex-1 bg-white text-black hover:bg-white/90 h-12 rounded-full transition-all font-medium"
            >
              Website
              {isCopied ? (
                <Check className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpRight className="ml-2 h-4 w-4" />
              )}
            </Button>

            <a href={`mailto:${siteConfig.links.email}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 rounded-full bg-transparent hover:bg-white/10 border-white/20 text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </Button>
            </a>
          </div>

          <p className="text-xs text-neutral-500 -mt-2 pb-6">
            Click en "Website" para copiar el enlace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="flex items-center justify-between p-4 bg-neutral-900/50 border-white/10 hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-md cursor-pointer h-full">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-black border border-white/10 group-hover:border-white/30 transition-colors">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm text-white">
                        {link.label}
                      </span>
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-300">
                        {link.handle}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
                </Card>
              </a>
            );
          })}
        </motion.div>
      </main>
      <CtaSection />
    </div>
  );
}
