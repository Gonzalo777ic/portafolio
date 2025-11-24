"use client"

import React, { createContext, useContext, useState } from "react"

type PlayerContextType = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  toggle: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PlayerContext.Provider value={{ isOpen, setIsOpen, toggle }}>
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