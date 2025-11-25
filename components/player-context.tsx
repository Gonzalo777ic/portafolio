"use client"

import React, { createContext, useContext, useState } from "react"

type PlayerContextType = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  currentUrl: string | null 
  playAlbum: (url: string) => void 
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)

  const playAlbum = (url: string) => {
    setCurrentUrl(url) 
    setIsOpen(true)    
  }

  return (
    <PlayerContext.Provider value={{ isOpen, setIsOpen, currentUrl, playAlbum } as any}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}