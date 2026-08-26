import { Code2, Lightbulb, Rocket, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    num: "01",
    tag: "PRODUCT DELIVERY",
    title: "Connecting Code to Business Outcomes",
    description:
      "From backend services at Kominfo RI to product development at InterActive Technologies Corp, I align technical architecture with user requirements and business roadmaps.",
    icon: Lightbulb,
    color: "#FF5500",
    bullets: ["User-focused roadmaps", "Sprint execution", "Performance metrics"],
  },
  {
    num: "02",
    tag: "ENGINEERING DEPTH",
    title: "Full-Stack Development",
    description:
      "Hands-on experience across Next.js 16, TypeScript, Laravel APIs, PostgreSQL databases, and cross-platform mobile applications.",
    icon: Code2,
    color: "#A3E635",
    bullets: ["REST & GraphQL APIs", "Type-safe architecture", "Automated deployments"],
  },
  {
    num: "03",
    tag: "EXECUTION",
    title: "End-to-End Ownership",
    description:
      "7+ years building software for enterprises, startups, and public sector agencies with structured testing and reliable release cycles.",
    icon: Rocket,
    color: "#C7B8F5",
    bullets: ["Rapid MVP prototyping", "Clean architecture", "On-schedule shipping"],
  },
];

export default function About() {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-6">
      {/* Header */}
      <div className="border-b border-dashed border-white/15 pb-3 sm:pb-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          Building software with focus &amp;{" "}
          <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
            engineering rigor.
          </span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
          Software Engineer and Founder of{" "}
          <a
            href="https://www.instagram.com/laildev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium underline decoration-dashed decoration-[#FF5500] hover:text-[#FF5500] transition-colors"
          >
            @LailDev
          </a>
          . Specializing in web applications, backend APIs, and responsive mobile interfaces.
        </p>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="rounded-xl border border-dashed border-white/20 bg-black/60 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-dashed divide-white/15 grid grid-cols-1 md:grid-cols-3 flex-1 relative">
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="group relative p-4 sm:p-6 lg:p-7 transition-colors hover:bg-white/[0.02] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                  [{pillar.num} // {pillar.tag}]
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded border border-dashed border-white/20 bg-zinc-950">
                  <pillar.icon size={15} style={{ color: pillar.color }} />
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>

            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-dashed border-white/10 space-y-1.5 font-mono">
              {pillar.bullets.map((b) => (
                <div key={b} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-none" style={{ backgroundColor: pillar.color }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="rounded-lg border border-dashed border-white/15 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shrink-0">
        <div className="flex items-center gap-2 text-zinc-400 text-[11px] sm:text-xs">
          <span className="text-[#FF5500] font-bold">[ SPECIFICATION ]</span>
          <span>Full-Stack · Mobile · Product</span>
        </div>

        <span className="text-[#A3E635] text-[11px] sm:text-xs flex items-center gap-1">
          <span>7+ Years Production Track</span>
          <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  );
}
