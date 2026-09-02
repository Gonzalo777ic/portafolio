"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, ArrowUpRight } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { SocialIcon } from "@/components/social-icon";
import type { SocialLink } from "@/lib/social";

const badgeStyles = [
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
];

export function ContactView({
  socials,
  photoUrl,
  name,
  roles,
  website,
  email,
}: {
  socials: SocialLink[];
  photoUrl: string;
  name: string;
  roles: string[];
  website: string;
  email: string;
}) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(website);
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

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-6 max-w-2xl w-full"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <Image
              src={photoUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {name}
            </h1>
            {roles.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {roles.map((role, index) => (
                  <span
                    key={role}
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${badgeStyles[index % badgeStyles.length]}`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            ) : null}
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

            <a href={`mailto:${email}`} className="flex-1">
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
            Click en &quot;Website&quot; para copiar el enlace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        >
          {socials.map((link) => {
            const isMail = link.icon === "mail" || link.href.startsWith("mailto:");
            return (
              <a
                key={link.id}
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="block group"
              >
                <Card className="flex items-center justify-between p-4 bg-neutral-900/50 border-white/10 hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-md cursor-pointer h-full">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-black border border-white/10 group-hover:border-white/30 transition-colors">
                      <SocialIcon name={link.icon} className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm text-white">
                        {link.label}
                      </span>
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-300">
                        {link.handle || link.href}
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
