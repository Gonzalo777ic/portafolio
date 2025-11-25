"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, PanInfo, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

const images = [
  "/static/1.jpeg", 
  "/static/2.jpeg", 
  "/static/3.jpeg", 
  "/static/5.png", 
]

const CUBE_SIZE = 480
const HALF_SIZE = CUBE_SIZE / 2

export function RotatingCube() {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const rotateY = useMotionValue(0)

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      if (!isHovered && !selectedImage) {
        rotateY.set(rotateY.get() - 0.3)
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered, selectedImage, rotateY])

  return (
    <>
      <div className="relative w-full flex justify-center items-center py-20 perspective-1000">
        <div 
          className="relative"
          style={{ width: CUBE_SIZE, height: CUBE_SIZE }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative w-full h-full preserve-3d"
            style={{ rotateY }}
          >
            <CubeFace 
              img={images[0]} 
              transform={`translateZ(${HALF_SIZE}px)`} 
              onClick={() => setSelectedImage(images[0])}
            />
            <CubeFace 
              img={images[1]} 
              transform={`rotateY(90deg) translateZ(${HALF_SIZE}px)`} 
              onClick={() => setSelectedImage(images[1])}
            />
            <CubeFace 
              img={images[2]} 
              transform={`rotateY(180deg) translateZ(${HALF_SIZE}px)`} 
              onClick={() => setSelectedImage(images[2])}
            />
            <CubeFace 
              img={images[3]} 
              transform={`rotateY(-90deg) translateZ(${HALF_SIZE}px)`} 
              onClick={() => setSelectedImage(images[3])}
            />

            <div className="absolute inset-0 bg-neutral-900" style={{ transform: `rotateX(90deg) translateZ(${HALF_SIZE}px)` }} />
            <div className="absolute inset-0 bg-neutral-900" style={{ transform: `rotateX(-90deg) translateZ(${HALF_SIZE}px)` }} />

          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>

      <ImageModal 
        src={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  )
}

function CubeFace({ img, transform, onClick }: { img: string, transform: string, onClick: () => void }) {
  return (
    <div 
      className="absolute inset-0 w-full h-full bg-neutral-900 rounded-lg overflow-hidden shadow-2xl backface-visible cursor-pointer group"
      style={{ transform }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image 
          src={img} 
          alt="Gallery" 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
          sizes="(max-width: 768px) 300px, 400px"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
        </div>
      </div>
    </div>
  )
}

function ImageModal({ src, onClose }: { src: string | null, onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-50"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={src} 
              alt="Full view" 
              fill 
              className="object-contain"
              quality={100}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}