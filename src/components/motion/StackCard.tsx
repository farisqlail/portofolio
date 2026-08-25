import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackCardProps {
  i: number;
  total: number;
  id?: string;
  tag: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  children: ReactNode;
}

export default function StackCard({
  i,
  total,
  id,
  tag,
  title,
  badge,
  badgeColor = "#C7B8F5",
  children,
}: StackCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Calculate target scale and dimming as card gets covered by future cards
  const targetScale = 1 - (total - 1 - i) * 0.035;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative flex items-start justify-center pb-24 sm:pb-32"
      style={{
        // Each card container has enough scroll room so transitions feel fluid and deliberate
        minHeight: "85vh",
      }}
    >
      <motion.div
        style={{
          scale,
          filter: useTransform(brightness, (b) => `brightness(${b})`),
          top: `calc(80px + ${i * 10}px)`,
        }}
        className="sticky w-full max-w-6xl rounded-2xl border border-border bg-[#09090c] shadow-[0_-20px_60px_rgba(0,0,0,0.95)] transition-all duration-300 overflow-hidden"
      >
        {/* 4 Corner Pins */}
        <div className="corner-pin-tl" />
        <div className="corner-pin-tr" />
        <div className="corner-pin-bl" />
        <div className="corner-pin-br" />

        {/* Card Header Frame Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-border bg-black/80 px-6 py-3.5 gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
              <span className="h-2 w-2 rounded-full bg-green-500/80" />
            </div>

            <span className="font-mono text-xs font-semibold text-zinc-400">
              {tag}
            </span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="font-mono text-xs text-white font-medium">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {badge && (
              <span
                className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  borderColor: `${badgeColor}40`,
                  backgroundColor: `${badgeColor}15`,
                  color: badgeColor,
                }}
              >
                {badge}
              </span>
            )}
            <span className="text-zinc-500 font-mono text-[11px]">
              [{String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}]
            </span>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#0c0c10] to-[#08080a]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
