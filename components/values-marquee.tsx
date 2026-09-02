"use client";

import { motion } from "framer-motion";
import { labelsForRow, type MarqueeWord } from "@/lib/marquee";

export function ValuesMarquee({ words }: { words: MarqueeWord[] }) {
  const row1 = labelsForRow(words, 1);
  const row2 = labelsForRow(words, 2);

  if (row1.length === 0 && row2.length === 0) return null;

  return (
    <section className="w-full py-20 overflow-hidden bg-black relative z-10">
      {row1.length > 0 ? (
        <div className="flex relative w-full mb-8 rotate-[-2deg] scale-110">
          <MarqueeRow
            items={row1}
            direction="left"
            speed={50}
            color="text-neutral-800"
            separatorColor="text-neutral-800"
          />
        </div>
      ) : null}

      {row2.length > 0 ? (
        <div className="flex relative w-full rotate-[2deg] scale-110">
          <MarqueeRow
            items={row2}
            direction="right"
            speed={50}
            color="text-white"
            separatorColor="text-blue-500"
          />
        </div>
      ) : null}

      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
  color,
  separatorColor,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
  color: string;
  separatorColor: string;
}) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-8 pr-8 items-center"
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-8">
            <span
              className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${color} select-none`}
            >
              {item}
            </span>
            <span className={`text-4xl md:text-5xl ${separatorColor} opacity-50`}>
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
