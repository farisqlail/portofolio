import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  points: string[];
}

const focusAreas: FocusArea[] = [
  {
    id: "systems",
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
    <div className="flex flex-col justify-between min-h-full gap-6 sm:gap-8">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 shrink-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs text-zinc-300 backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400" />
          <span>Available for roles &amp; projects</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-400">
          <span>Surabaya, ID</span>
          <span>·</span>
          <span className="text-emerald-400 font-semibold">Online</span>
        </div>
      </div>

      {/* Main 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              Building web applications &amp;{" "}
              <span className="gradient-pastel-text">backend services.</span>
            </h1>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
              I&apos;m <strong className="text-white font-semibold">Faris Rizqilail</strong>. 7+ years building and shipping web applications, distributed APIs, and mobile clients for enterprise, government, and startup teams.
            </p>
          </div>

          {/* Interactive Technical Highlights */}
          <div className="w-full max-w-xl rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4 space-y-2.5 sm:space-y-3 backdrop-blur-md">
            {/* Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 border-b border-white/10 pb-2 overflow-x-auto">
              {focusAreas.map((area, idx) => (
                <button
                  key={area.id}
                  onClick={() => setActiveFocus(idx)}
                  className={`rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeFocus === idx
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {area.title}
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
                className="space-y-1.5 pt-0.5"
              >
                <p className="text-[11px] sm:text-xs font-medium text-zinc-400">
                  {current.subtitle}
                </p>
                <div className="space-y-1">
                  {current.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 size={12} className="text-[#C7B8F5] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
            <a
              href="mailto:farisqlail@gmail.com"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-zinc-200 shadow-md"
            >
              <span>Get in Touch</span>
              <ArrowRight size={13} />
            </a>

            <a
              href="https://github.com/farisqlail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:text-white hover:border-white/30"
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="https://www.linkedin.com/in/faris-rizqilail-630329194/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:text-white hover:border-white/30"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Right Column: Portrait Card */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-sm rounded-xl sm:rounded-2xl border border-white/15 bg-white/[0.02] p-2.5 sm:p-3.5 backdrop-blur-xl shadow-2xl overflow-hidden group">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                <span className="ml-1.5 font-mono text-[10px] text-zinc-400">faris.sh</span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Photo Container */}
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900 border border-white/10">
              <Image
                src="/assets/images/faris-hero-2.png"
                alt="Faris Rizqilail"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 70vw, 35vw"
              />

              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-2 left-2 right-2 z-20 rounded-lg border border-white/15 bg-black/85 p-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-white leading-tight">Faris Rizqilail</p>
                    <p className="text-[9px] text-zinc-400">Founder @LailDev · Product Lead</p>
                  </div>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row at Bottom */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/10 pt-3 sm:pt-4 shrink-0 text-xs">
        <div>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight">7+</p>
          <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">Years Exp</p>
        </div>
        <div className="border-l border-white/10 pl-2.5 sm:pl-4">
          <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight">9+</p>
          <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">Ventures</p>
        </div>
        <div className="border-l border-white/10 pl-2.5 sm:pl-4">
          <p className="text-lg sm:text-2xl md:text-3xl font-bold text-[#A7EADC] tracking-tight">12+</p>
          <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">Projects Delivered</p>
        </div>
      </div>
    </div>
  );
}
