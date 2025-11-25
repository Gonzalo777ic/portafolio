"use client";
import React from "react";

export function EarthGlow() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">

      <div
        className="
          absolute 
          left-1/2 
          bottom-[2vh] md:bottom-[25vh]
          -translate-x-1/2
          w-[80vw] md:w-[1000px]
          h-[700px]
          z-0
        "
        style={{
          background: `radial-gradient(
            ellipse at 50% 100%, 
            rgba(130, 60, 255, 0.6) 0%,  
            rgba(100, 0, 200, 0.3) 30%, 
            transparent 70%
          )`,
          filter: "blur(60px)",
          opacity: 0.9
        }}
      />

      <div
        className="
          absolute 
          left-1/2 
          -translate-x-1/2 
          bottom-0
          translate-y-[97%] 
          w-[300%] sm:w-[400%]
          aspect-square
          rounded-full
          bg-transparent
          z-10
        "
        style={{
          boxShadow: `
            0 -25px 50px rgba(255, 255, 255, 0.45),
            0 8px 15px rgba(255, 255, 255, 0.08)
          `,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            borderTop: "3px solid #ffffff", 
            boxShadow: "0 0 20px 2px #ffffff, 0 0 10px 1px rgba(255,255,255,0.8)",
            filter: "blur(0.5px)",
            maskImage:
              "linear-gradient(to right, transparent 40%, black 50%, transparent 60%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 40%, black 50%, transparent 60%)",
          }}
        />
      </div>

    </div>
  );
}