import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle2, ChevronRight, Cpu, Layers } from "lucide-react";
import { experiments } from "@/data/experiments";

export default function Experiments() {
  const [selectedSlug, setSelectedSlug] = useState(experiments[0].slug);
  const currentExp =
    experiments.find((e) => e.slug === selectedSlug) ?? experiments[0];

  return (
    <div className="flex flex-col justify-between min-h-full gap-4 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-dashed border-white/15 pb-3 sm:pb-4 gap-2.5 shrink-0">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Prototypes &amp;{" "}
            <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
              open-source tools.
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
            AI multi-agent systems, Web3 smart contracts, code review utilities, and interactive side projects.
          </p>
        </div>

        <a
          href="https://github.com/farisqlail"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-400 hover:text-[#FF5500] transition-colors self-start sm:self-auto shrink-0"
        >
          <span>[ EXPLORE GITHUB ]</span>
          <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Mobile Horizontal Rail Selector (Visible only on mobile/tablet) */}
      <div
        className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none no-scrollbar font-mono"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {experiments.map((exp, idx) => {
          const isSelected = exp.slug === currentExp.slug;
          return (
            <button
              key={exp.slug}
              onClick={() => setSelectedSlug(exp.slug)}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#FF5500] text-black font-bold shadow-md"
                  : "border border-dashed border-white/15 bg-black/50 text-zinc-400 hover:text-white"
              }`}
            >
              <span>{String(idx + 1).padStart(2, "0")}.</span>
              <span>{exp.title}</span>
            </button>
          );
        })}
      </div>

      {/* Split Inspector: 2-Column Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-1 items-stretch min-h-0">
        {/* Left Column: Master Project List Rail (5 cols on lg) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between rounded-xl border border-dashed border-white/20 bg-black/60 p-3 sm:p-4 overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-2.5 mb-3 px-1">
              <span className="font-mono text-[10px] text-[#FF5500] font-bold uppercase tracking-wider">
                [ DIRECTORY // {experiments.length} ITEMS ]
              </span>
              <span className="font-mono text-[10px] text-zinc-500">SELECT TO INSPECT</span>
            </div>

            {/* Scrollable list of items */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto custom-card-scroll pr-1">
              {experiments.map((exp, idx) => {
                const isSelected = exp.slug === currentExp.slug;
                return (
                  <button
                    key={exp.slug}
                    onClick={() => setSelectedSlug(exp.slug)}
                    className={`w-full text-left rounded-lg p-3 transition-all cursor-pointer border border-dashed flex items-center justify-between group ${
                      isSelected
                        ? "border-[#FF5500]/70 bg-[#FF5500]/10 shadow-md"
                        : "border-white/10 bg-zinc-950/60 hover:border-white/25 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`font-mono text-xs font-bold shrink-0 ${
                          isSelected ? "text-[#FF5500]" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`text-xs sm:text-sm font-bold truncate transition-colors font-sans ${
                            isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"
                          }`}
                        >
                          {exp.title}
                        </p>
                        <span className="font-mono text-[10px] text-zinc-500 truncate block mt-0.5">
                          {exp.category}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        isSelected
                          ? "text-[#FF5500] translate-x-0.5"
                          : "text-zinc-600 group-hover:text-zinc-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-dashed border-white/15 px-1 flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <span>FILTER: ALL PROTOTYPES</span>
            <span className="text-[#A3E635]">READY</span>
          </div>
        </div>

        {/* Right Column: Active Inspector Showcase (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-xl border border-dashed border-white/20 bg-black/70 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExp.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col justify-between h-full space-y-3.5"
            >
              {/* Top Row: Preview Image */}
              <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-lg bg-zinc-900 border border-dashed border-white/20 shrink-0 group">
                <Image
                  src={currentExp.image}
                  alt={currentExp.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Tags */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                  <span className="rounded border border-[#FF5500]/40 bg-black/80 px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] text-[#FF5500] backdrop-blur-md font-bold">
                    [ {currentExp.category} ]
                  </span>
                  <span className="rounded border border-[#A3E635]/40 bg-black/80 px-2 py-0.5 font-mono text-[9px] text-[#A3E635] backdrop-blur-md flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-[#A3E635] animate-pulse" />
                    OPEN_SOURCE
                  </span>
                </div>

                <a
                  href={currentExp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded border border-dashed border-white/20 bg-black/80 text-zinc-300 hover:border-[#FF5500] hover:text-[#FF5500] transition-colors backdrop-blur-md"
                  title="View Repository on GitHub"
                >
                  <ArrowUpRight size={13} />
                </a>
              </div>

              {/* Middle Section: Title, Summary & Capabilities */}
              <div className="space-y-2.5 flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans">
                    {currentExp.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1 line-clamp-2 sm:line-clamp-3 font-sans">
                    {currentExp.summary}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1 font-sans">
                  {currentExp.highlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-zinc-300">
                      <span className="font-mono text-[#FF5500] text-xs font-bold shrink-0 mt-0.5">0{idx + 1}/</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1 pt-1 font-mono">
                  {currentExp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] sm:text-[10px] text-zinc-300 bg-white/[0.04] border border-dashed border-white/15 rounded px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-dashed border-white/15 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 shrink-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={currentExp.landingHref ?? `/lab/${currentExp.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF5500] bg-[#FF5500] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-sm"
                  >
                    <span>[ READ FULL SPECS ]</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

                <a
                  href={currentExp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-zinc-400 hover:text-[#FF5500] transition-colors"
                >
                  <span>[ GITHUB REPOSITORY ↗ ]</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer bar */}
      <div className="rounded-lg border border-dashed border-white/15 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between font-mono text-xs text-zinc-400 shrink-0">
        <span className="text-[10px] sm:text-xs text-[#FF5500] font-bold">[ {experiments.length} ACTIVE PROTOTYPES ]</span>
        <span className="text-[#A3E635] text-[10px] sm:text-xs">SPEC: EXPERIMENTAL</span>
      </div>
    </div>
  );
}
