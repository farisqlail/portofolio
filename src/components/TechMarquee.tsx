import { useState } from "react";
import { motion } from "framer-motion";

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Laravel",
  "PHP",
  "Node.js",
  "MySQL",
  "Docker",
  "Git",
];

export default function TechMarquee() {
  const [paused, setPaused] = useState(false);
  const items = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <section
      className="overflow-hidden border-y border-border bg-[#0a0f1e]/95 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Tech stack"
    >
      <motion.div
        className="flex w-max items-center gap-5 whitespace-nowrap"
        animate={paused ? { x: 0 } : { x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-5 text-xs font-bold uppercase tracking-[0.28em] text-[#3b82f6]"
          >
            {item}
            <span className="text-white/24">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
