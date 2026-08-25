import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FullDeckCardProps {
  i: number;
  total: number;
  id?: string;
  tag: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  children: ReactNode;
}

export default function FullDeckCard({
  i,
  total,
  id,
  tag,
  title,
  badge,
  badgeColor = "#C7B8F5",
  children,
}: FullDeckCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress as the card's section scrolls from top of viewport to end of container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // When card is active (0 to 0.65), scale is 1.0, brightness is 100% (bright and vivid).
  // As next card scrolls up and overlaps (0.65 to 1.0), it gently scales down and dims into background.
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.92]);
  const brightness = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.6]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full"
      style={{
        // 130vh gives a dedicated, smooth scroll duration for each card
        height: "130vh",
      }}
    >
      {/* Sticky Fullscreen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-3 sm:px-6 md:px-8 py-8 sm:py-10">
        <motion.div
          style={{
            scale,
            opacity,
            filter: useTransform(brightness, (b) => `brightness(${b})`),
          }}
          className="relative w-full max-w-6xl xl:max-w-7xl h-[86vh] sm:h-[88vh] rounded-3xl border border-white/15 bg-[#0a0a0d] shadow-[0_-25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden flex flex-col"
        >
          {/* 4 Corner Pins */}
          <div className="corner-pin-tl" />
          <div className="corner-pin-tr" />
          <div className="corner-pin-bl" />
          <div className="corner-pin-br" />

          {/* Superwhisper / Langbase Glass Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-black/90 px-6 py-3.5 gap-3 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
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
                    borderColor: `${badgeColor}50`,
                    backgroundColor: `${badgeColor}20`,
                    color: badgeColor,
                  }}
                >
                  {badge}
                </span>
              )}
              <span className="text-zinc-400 font-mono text-[11px] font-medium">
                [{String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}]
              </span>
            </div>
          </div>

          {/* Card Body - Flex grow with custom scroll */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#0e0e13] to-[#07070a] custom-card-scroll">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
