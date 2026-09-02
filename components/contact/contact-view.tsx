"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { SocialIcon } from "@/components/social-icon";
import type { SocialLink } from "@/lib/social";
import {
  phoneTelHref,
  phoneWhatsAppHref,
  type PhoneNumber,
} from "@/lib/phone";

const badgeStyles = [
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
];

export function ContactView({
  socials,
  phones,
  photoUrl,
  name,
  roles,
  website,
  email,
}: {
  socials: SocialLink[];
  phones: PhoneNumber[];
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
    <div className="relative min-h-screen text-foreground">
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url('/static/bw.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-2xl flex-col items-center space-y-6 text-center"
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl md:h-48 md:w-48">
            <Image src={photoUrl} alt={name} fill className="object-cover" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              {name}
            </h1>
            {roles.length > 0 ? (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {roles.map((role, index) => (
                  <span
                    key={role}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyles[index % badgeStyles.length]}`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex w-full max-w-md flex-row justify-center gap-4 pt-4">
            <Button
              onClick={handleCopyLink}
              className="h-12 flex-1 rounded-full bg-white font-medium text-black transition-all hover:bg-white/90"
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
                className="h-12 w-full rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </Button>
            </a>
          </div>

          <p className="-mt-2 pb-6 text-xs text-neutral-500">
            Click en &quot;Website&quot; para copiar el enlace.
          </p>
        </motion.div>

        {phones.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-2 w-full max-w-2xl space-y-3"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Celular
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {phones.map((phone) => {
                const tel = phoneTelHref(phone.number);
                const wa = phoneWhatsAppHref(phone.number);
                return (
                  <Card
                    key={phone.id}
                    className="flex flex-col gap-3 border-white/10 bg-neutral-900/50 p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full border border-white/10 bg-black p-2">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="truncate text-sm font-semibold text-white">
                          {phone.label}
                        </p>
                        <p className="truncate text-xs text-neutral-400">
                          {phone.number}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {tel ? (
                        <a href={tel} className="flex-1">
                          <Button
                            variant="outline"
                            className="h-9 w-full rounded-full border-white/15 bg-transparent text-xs text-white hover:bg-white/10"
                          >
                            Llamar
                          </Button>
                        </a>
                      ) : null}
                      {wa ? (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button className="h-9 w-full rounded-full bg-[#25D366] text-xs text-black hover:bg-[#2fe472]">
                            <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                            WhatsApp
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {socials.map((link) => {
            const isMail =
              link.icon === "mail" || link.href.startsWith("mailto:");
            return (
              <a
                key={link.id}
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="group block"
              >
                <Card className="flex h-full cursor-pointer items-center justify-between border-white/10 bg-neutral-900/50 p-4 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full border border-white/10 bg-black p-2 transition-colors group-hover:border-white/30">
                      <SocialIcon
                        name={link.icon}
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-white">
                        {link.label}
                      </span>
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-300">
                        {link.handle || link.href}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-white" />
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
