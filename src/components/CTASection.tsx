import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative px-4 sm:px-6 md:px-8 py-16">
      <div className="relative mx-auto max-w-6xl border border-border bg-gradient-to-b from-surface to-black rounded-2xl p-8 sm:p-12 md:p-16 overflow-hidden text-center">
        {/* 4 Corner Pins */}
        <div className="corner-pin-tl" />
        <div className="corner-pin-tr" />
        <div className="corner-pin-bl" />
        <div className="corner-pin-br" />

        {/* Ambient background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(199,184,245,0.08)_0%,rgba(243,181,210,0.04)_50%,transparent_70%)] blur-2xl" />

        {/* Micro tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-black/60 px-3 py-1 text-xs text-zinc-400 font-mono mb-6">
          <Sparkles size={12} className="text-[#C7B8F5]" />
          <span>{"// Start a Conversation"}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Ready to build something <span className="gradient-pastel-text">extraordinary?</span>
        </h2>

        <p className="mt-4 text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Open to full-stack engineering roles, product leadership, and ambitious technical partnerships.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:farisqlail@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-zinc-200 shadow-md"
          >
            <Mail size={15} />
            <span>farisqlail@gmail.com</span>
            <ArrowRight size={14} />
          </a>

          <a
            href="https://www.linkedin.com/in/faris-rizqilail-630329194/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
