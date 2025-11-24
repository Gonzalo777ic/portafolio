import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { ParticleBackground } from "@/components/particle-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
// NUEVOS IMPORTS
import { PlayerProvider } from "@/components/player-context"
import { GlobalPlayer } from "@/components/global-player"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Gonzalo Isique",
  description: "Mi portafolio",
  icons: {
    icon: "/static/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PlayerProvider> {/* ENVOLVEMOS TODO */}
            
            {/* El reproductor global vive aquí, fuera de las páginas, para no recargarse */}
            <GlobalPlayer />

            <ParticleBackground />
            
            <div className="relative z-50">
              <Navbar />
            </div>

            <div className="relative z-20 flex flex-col min-h-screen">
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            
          </PlayerProvider>
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}