"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function ScrollSpinner() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 400]);

  const rotate = useSpring(rawRotate, {
    stiffness: 60,
    damping: 20,
    mass: 0.3,
  });

  return (
    <section
      ref={containerRef}
      className="w-full relative flex items-center justify-center"
    >
      <div className="absolute w-[280px] h-[280px] md:w-[370px] md:h-[370px] opacity-40 -z-10 pointer-events-none">
        <motion.div style={{ rotate }} className="w-full h-full relative">
          <Image
            src="/static/home_spinner.png"
            alt="Spinner"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
