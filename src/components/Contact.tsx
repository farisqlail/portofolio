import { ArrowUpRight, ArrowRight, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

interface ContactProps {
  onSelectCard?: (index: number) => void;
}

const navLinks = [
  { label: "01 Overview", index: 0 },
  { label: "02 Philosophy", index: 1 },
  { label: "03 Capabilities", index: 2 },
  { label: "04 Experience", index: 3 },
  { label: "05 Honors", index: 4 },
  { label: "06 Lab", index: 5 },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/farisqlail", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/faris-rizqilail-630329194/", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/laildev/", icon: InstagramIcon },
  { label: "Email", href: "mailto:farisqlail@gmail.com", icon: Mail },
];

export default function Contact({ onSelectCard }: ContactProps) {
  return (
    <div className="flex flex-col justify-between min-h-full gap-5 sm:gap-8">
      {/* Top CTA */}
      <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-zinc-950 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs text-zinc-400 font-mono">
          <Sparkles size={11} className="text-[#C7B8F5]" />
          <span>{"// Direct Channels"}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
          Let&apos;s connect &amp; <span className="gradient-pastel-text">build together.</span>
        </h2>

        <p className="text-xs sm:text-base text-zinc-400 leading-relaxed max-w-lg mx-auto">
          Open to full-stack engineering roles, technical advisory, and software development projects.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
          <a
            href="mailto:farisqlail@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-zinc-200 shadow-md"
          >
            <Mail size={13} />
            <span>farisqlail@gmail.com</span>
            <ArrowRight size={12} />
          </a>

          <a
            href="https://www.linkedin.com/in/faris-rizqilail-630329194/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Footer Info Grid */}
      <div className="pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Bio (5 cols) */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 font-mono font-bold text-xs text-white">
              F
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Faris Rizqilail
              </p>
              <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500">
                Founder @LailDev · Software Engineer
              </p>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed max-w-sm">
            Engineering web applications, mobile architectures, and developer tools with tested reliability.
          </p>
        </div>

        {/* Center Quick Navigation (3 cols) */}
        <div className="md:col-span-3 space-y-1.5">
          <p className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            [ Navigation ]
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-1 font-mono text-[11px] sm:text-xs">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onSelectCard && onSelectCard(link.index)}
                className="text-left text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Social Links (4 cols) */}
        <div className="md:col-span-4 space-y-1.5">
          <p className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            [ Channels ]
          </p>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-zinc-950 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono text-zinc-300 hover:border-white/30 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Icon size={12} className="text-[#C7B8F5]" />
                    <span>{item.label}</span>
                  </div>
                  <ArrowUpRight size={10} className="text-zinc-500" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
