"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    const DENSITY_FACTOR = 4000 

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      fadeSpeed: number
      fadingIn: boolean

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 1.5 
        this.opacity = Math.random() * 0.5 + 0.1
        this.fadeSpeed = Math.random() * 0.005 + 0.002
        this.fadingIn = Math.random() > 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.fadingIn) {
            this.opacity += this.fadeSpeed
            if (this.opacity >= 0.8) this.fadingIn = false
        } else {
            this.opacity -= this.fadeSpeed
            if (this.opacity <= 0.1) this.fadingIn = true
        }

        if (this.x < 0) this.x = canvas!.width
        if (this.x > canvas!.width) this.x = 0
        if (this.y < 0) this.y = canvas!.height
        if (this.y > canvas!.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    const initParticles = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const area = canvas.width * canvas.height
      const particleCount = Math.floor(area / DENSITY_FACTOR)

      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    const handleResize = () => initParticles()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-neutral-950"
    />
  )
}