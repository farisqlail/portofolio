import { Code2, Lightbulb, Rocket, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    num: "01",
    tag: "Product Thinking",
    title: "Connecting Code to Business Growth",
    description:
      "From backend services at Kominfo RI to leading product development at InterActive Technologies Corp — I bridge architectural engineering decisions directly to business outcomes and user delight.",
    icon: Lightbulb,
    color: "#C7B8F5",
    bullets: ["User-centric roadmaps", "Agile velocity leadership", "Metric-driven iteration"],
  },
  {
    num: "02",
    tag: "Engineering Depth",
    title: "Production-Grade Full-Stack",
    description:
      "Expertise across React/Next.js 16, typed TypeScript, Laravel APIs, PostgreSQL databases, and high-performance cross-platform mobile applications.",
    icon: Code2,
    color: "#F3B5D2",
    bullets: ["Microservices & REST APIs", "Type-safe system design", "Zero-downtime deployments"],
  },
  {
    num: "03",
    tag: "Delivery Speed",
    title: "Ownership from Zero to One",
    description:
      "7+ years navigating ambiguity across startups, enterprise, and government. Delivering reliable, scalable systems on aggressive production timelines.",
    icon: Rocket,
    color: "#F6D1AC",
    bullets: ["Rapid MVP prototyping", "Clean architecture", "100% on-time track record"],
  },
];

export default function About() {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 sm:pb-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          Building software with purpose &amp; <span className="gradient-pastel-text">craftsmanship.</span>
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Software Engineer and Founder of{" "}
          <a
            href="https://www.instagram.com/laildev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium underline decoration-zinc-600 hover:decoration-white transition-colors"
          >
            @LailDev
          </a>
          . Specializing in resilient digital infrastructure, clean code, and fluid user experiences.
        </p>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10 grid grid-cols-1 md:grid-cols-3 flex-1">
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="group relative p-4 sm:p-6 lg:p-7 transition-colors hover:bg-white/[0.02] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-semibold text-zinc-500 group-hover:text-white transition-colors">
                  {pillar.num} / {pillar.tag}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900">
                  <pillar.icon size={16} style={{ color: pillar.color }} />
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10 space-y-1.5">
              {pillar.bullets.map((b) => (
                <div key={b} className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-zinc-400">
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: pillar.color }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="rounded-lg sm:rounded-xl border border-white/10 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shrink-0">
        <div className="flex items-center gap-2 text-zinc-400 text-[11px] sm:text-xs">
          <span className="text-white font-semibold">Specialization:</span>
          <span>Full-Stack · Mobile · Product</span>
        </div>

        <span className="text-[#C7B8F5] text-[11px] sm:text-xs flex items-center gap-1">
          <span>7+ Years Production Track</span>
          <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  );
}
