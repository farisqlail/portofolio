import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, Terminal } from "lucide-react";

interface FocusArea {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  points: string[];
}

const focusAreas: FocusArea[] = [
  {
    id: "systems",
    num: "01",
    title: "System Architecture",
    subtitle: "Backends, databases, and APIs",
    points: [
      "REST APIs in Laravel, Node.js, and Express",
      "Relational schema design in PostgreSQL and MySQL",
      "In-memory caching with Redis and background queues",
    ],
  },
  {
    id: "frontend",
    num: "02",
    title: "Modern Full-Stack",
    subtitle: "Web and mobile interfaces",
    points: [
      "Typed interfaces in Next.js 16, React 19, and TypeScript",
      "Cross-platform mobile apps using React Native and Flutter",
      "Responsive layouts with structured component design",
    ],
  },
  {
    id: "leadership",
    num: "03",
    title: "Product Leadership",
    subtitle: "From requirements to production deployment",
    points: [
      "Led cross-functional teams at InterActive Technologies Corp",
      "Founder of LailDev, delivering software across industries",
      "Converting feature requirements into tested releases",
    ],
  },
];

export default function HeroSection() {
  const [activeFocus, setActiveFocus] = useState(0);
  const current = focusAreas[activeFocus];

  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-7">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-white/15 pb-3 shrink-0">
        <div className="inline-flex items-center gap-2 rounded border border-dashed border-white/20 bg-white/[0.02] px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs text-zinc-300 backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#A3E635] animate-pulse" />
          <span>STATUS: AVAILABLE_FOR_PROJECTS</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-400">
          <span>SURABAYA_ID</span>
          <span className="text-zinc-600">·</span>
          <span className="text-[#A3E635] font-semibold">PRODUCTION_ACTIVE</span>
        </div>
      </div>

      {/* Main 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1">
        {/* Left Column: Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.14]">
              Building web applications &amp;{" "}
              <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
                backend services.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl font-sans">
              I&apos;m <strong className="text-white font-semibold">Faris Rizqilail</strong>. 7+ years building and shipping web applications, distributed APIs, and mobile clients for enterprise, government, and startup teams.
            </p>
          </div>

          {/* Interactive Technical Highlights (Stitched Bento Module) */}
          <div className="w-full max-w-xl rounded-xl border border-dashed border-white/20 bg-black/60 p-3.5 sm:p-4 space-y-3 relative overflow-hidden">
            {/* Sub-header */}
            <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Terminal size={13} className="text-[#FF5500]" />
                <span className="font-mono text-[11px] font-bold text-zinc-300 uppercase">
                  Core Engineering Focus
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">SPEC // 03 AREAS</span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 border-b border-dashed border-white/10 pb-2.5 overflow-x-auto font-mono text-xs">
              {focusAreas.map((area, idx) => (
                <button
                  key={area.id}
                  onClick={() => setActiveFocus(idx)}
                  className={`rounded px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs transition-all shrink-0 cursor-pointer ${
                    activeFocus === idx
                      ? "bg-[#FF5500] text-black font-bold shadow-sm"
                      : "border border-dashed border-white/15 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  <span>{area.num}. {area.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 pt-0.5"
              >
                <div className="space-y-1.5">
                  {current.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <span className="font-mono text-[#FF5500] text-xs font-bold mt-0.5">0{idx + 1}/</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="mailto:farisqlail@gmail.com"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#ff6a1f] shadow-md"
            >
              <span>[ CONTACT DIRECTLY ]</span>
              <ArrowRight size={13} />
            </a>

            <a
              href="https://github.com/farisqlail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/20 bg-black/50 px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:border-[#FF5500] hover:text-white"
            >
              <span>[ GITHUB ]</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="https://www.linkedin.com/in/faris-rizqilail-630329194/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/20 bg-black/50 px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:border-[#FF5500] hover:text-white"
            >
              <span>[ LINKEDIN ]</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Right Column: Stitched Portrait Photo Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-sm rounded-xl border border-dashed border-white/20 bg-[#0c0c12] p-3 sm:p-4 shadow-2xl overflow-hidden group">
            {/* Corner Cross Stitch Markers */}
            <span className="absolute top-1.5 left-1.5 font-mono text-[10px] text-zinc-600 select-none font-bold">+</span>
            <span className="absolute top-1.5 right-1.5 font-mono text-[10px] text-zinc-600 select-none font-bold">+</span>
            <span className="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-zinc-600 select-none font-bold">+</span>
            <span className="absolute bottom-1.5 right-1.5 font-mono text-[10px] text-zinc-600 select-none font-bold">+</span>

            {/* Window Header Strip */}
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-2.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-[#FF5500]" />
                <span className="font-mono text-[11px] font-bold text-zinc-300">faris.sh // SPEC.2026</span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/30 px-2 py-0.5 rounded">
                ACTIVE
              </span>
            </div>

            {/* Photo Container */}
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-lg bg-zinc-900 border border-dashed border-white/15">
              <Image
                src="/assets/images/faris-hero-2.png"
                alt="Faris Rizqilail"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 70vw, 35vw"
              />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 rounded-lg border border-dashed border-white/20 bg-black/90 p-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs font-bold text-white leading-tight">Faris Rizqilail</p>
                    <p className="font-mono text-[10px] text-zinc-400">Founder @LailDev · Product Lead</p>
                  </div>
                  <span className="flex h-2 w-2 rounded-none bg-[#FF5500] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row at Bottom (Stitched Bento Tiles) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 border-t border-dashed border-white/15 pt-3 sm:pt-4 shrink-0 font-mono">
        <div className="rounded-lg border border-dashed border-white/15 bg-black/40 p-2.5 sm:p-3">
          <span className="text-[10px] text-zinc-500 uppercase block">Experience</span>
          <p className="text-base sm:text-2xl font-bold text-white mt-0.5">7+ YRS</p>
        </div>
        <div className="rounded-lg border border-dashed border-white/15 bg-black/40 p-2.5 sm:p-3">
          <span className="text-[10px] text-zinc-500 uppercase block">Ventures</span>
          <p className="text-base sm:text-2xl font-bold text-white mt-0.5">9+ BUILT</p>
        </div>
        <div className="rounded-lg border border-dashed border-white/15 bg-black/40 p-2.5 sm:p-3">
          <span className="text-[10px] text-zinc-500 uppercase block">Shipped</span>
          <p className="text-base sm:text-2xl font-bold text-[#FF5500] mt-0.5">12+ APPS</p>
        </div>
      </div>
    </div>
  );
}
