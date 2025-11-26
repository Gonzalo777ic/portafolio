"use client"

import React, { createContext, useContext, useState } from "react"

type MetaData = {
  title: string
  artist: string
  image: string
}

type PlayerContextType = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  currentUrl: string | null
  currentMeta: MetaData | null
  playAlbum: (url: string, meta: MetaData) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)
  const [currentMeta, setCurrentMeta] = useState<MetaData | null>(null)

  const playAlbum = (url: string, meta: MetaData) => {
    setCurrentUrl(url)
    setCurrentMeta(meta)
    setIsOpen(true)
  }

  return (
    <PlayerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentUrl,
        currentMeta,
        playAlbum,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
