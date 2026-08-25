import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { experiments } from "@/data/experiments";

export default function Experiments() {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-3 sm:pb-4 gap-2.5 shrink-0">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Experimental builds &amp; <span className="gradient-pastel-text">explorations.</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Open-source AI agents, Web3 smart contracts, developer tooling, and experimental side projects.
          </p>
        </div>

        <a
          href="https://github.com/farisqlail"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-400 hover:text-white transition-colors self-start sm:self-auto shrink-0"
        >
          <span>Explore GitHub</span>
          <ArrowUpRight size={12} />
        </a>
      </div>

      {/* 2x2 Lab Grid */}
      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 flex-1">
        {experiments.map((exp, index) => (
          <div
            key={exp.slug}
            className={`group p-4 sm:p-6 transition-all hover:bg-white/[0.02] border-b md:border-b-0 ${
              index < 2 ? "md:border-b md:border-white/10" : ""
            } flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="rounded-full border border-white/10 bg-zinc-900 px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] text-[#C7B8F5]">
                  {exp.category}
                </span>

                <a
                  href={exp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                  title="View on GitHub"
                >
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1.5 group-hover:text-[#C7B8F5] transition-colors">
                {exp.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {exp.description}
              </p>
            </div>

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/lab/${exp.slug}`}
                className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-semibold text-white hover:text-[#C7B8F5] transition-colors"
              >
                <span>Read Specs</span>
                <ArrowRight size={10} />
              </Link>

              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500">
                [ Interactive ]
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="rounded-lg sm:rounded-xl border border-white/10 bg-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between font-mono text-xs text-zinc-400 shrink-0">
        <span className="text-[10px] sm:text-xs">[ 4 Active Prototypes ]</span>
        <span className="text-white font-medium text-[10px] sm:text-xs">LailDev Lab</span>
      </div>
    </div>
  );
}
