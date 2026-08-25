import { useState } from "react";
import { motion } from "framer-motion";

const techStack = [
  "React",
  "Next.js 16",
  "TypeScript",
  "Laravel",
  "Node.js",
  "PostgreSQL",
  "React Native",
  "Tailwind CSS",
  "Docker",
  "REST APIs",
  "GraphQL",
  "Supabase",
  "Git",
];

export default function TechMarquee() {
  const [paused, setPaused] = useState(false);
  const items = [...techStack, ...techStack, ...techStack];

  return (
    <section
      className="border-y border-border bg-black py-3.5 overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Technology Stack"
    >
      <motion.div
        className="flex w-max items-center gap-6 whitespace-nowrap"
        animate={paused ? { x: 0 } : { x: ["0%", "-33.333%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-6 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <span>{item}</span>
            <span className="text-[#C7B8F5] opacity-60">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
