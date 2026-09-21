import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeIndex?: number;
  onSelectCard?: (index: number) => void;
}

const navLinks = [
  { label: "Overview", num: "01", index: 0 },
  { label: "Lab", num: "02", index: 1 },
  { label: "Experience", num: "03", index: 2 },
  { label: "Philosophy", num: "04", index: 3 },
  { label: "Capabilities", num: "05", index: 4 },
  { label: "Honors", num: "06", index: 5 },
  { label: "Contact", num: "07", index: 6 },
];

const sectionIds = [
  "hero",
  "experiments",
  "experience",
  "about",
  "skills",
  "certifications",
  "contact",
];

export default function Navbar({ activeIndex = 0, onSelectCard }: NavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isBlog = router.pathname.startsWith("/blog");
  const effectiveActiveIndex = isBlog ? -1 : activeIndex;

  const handleNavClick = (index: number) => {
    if (onSelectCard) {
      onSelectCard(index);
    } else {
      router.push(`/?section=${sectionIds[index] || "hero"}`);
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-4 pointer-events-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between pointer-events-auto">
        {/* Brand with Woven Label Aesthetic */}
        <button
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-1.5 rounded border border-[#FF5500]/40 bg-[#FF5500]/10 px-2.5 py-1 font-mono text-[11px] font-bold text-[#FF5500] tracking-wider uppercase transition-colors group-hover:border-[#FF5500] group-hover:bg-[#FF5500]/20">
            <span className="h-1.5 w-1.5 bg-[#FF5500]" />
            <span>ID-SBY</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-mono text-xs font-bold text-white tracking-tight group-hover:text-[#FF5500] transition-colors">
              Faris Rizqilail
            </span>
            <span className="font-mono text-[10px] text-zinc-500 font-normal">
              [ SPEC.2026 // SURABAYA ]
            </span>
          </div>
        </button>

        {/* Floating Stitch Pill Nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-dashed border-white/20 bg-black/80 p-1 backdrop-blur-xl shadow-2xl">
          {navLinks.map((link) => {
            const isActive = effectiveActiveIndex === link.index;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.index)}
                className={`relative rounded-full px-3 py-1 font-mono text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-black font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-[#FF5500] shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-1.5 rounded-md border border-dashed px-3 py-1.5 font-mono text-xs font-bold transition-all backdrop-blur-md cursor-pointer shadow-sm ${
              isBlog
                ? "border-[#FF5500] bg-[#FF5500] text-black shadow-sm"
                : "border-[#FF5500]/40 bg-[#FF5500]/10 text-[#FF5500] hover:bg-[#FF5500] hover:text-black"
            }`}
          >
            <span>[ BLOG ]</span>
          </Link>
          <button
            onClick={() => handleNavClick(6)}
            className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-white/25 bg-black/60 px-3.5 py-1.5 font-mono text-xs text-zinc-300 transition-all hover:border-white hover:text-white hover:bg-white/10 backdrop-blur-md cursor-pointer shadow-sm"
          >
            <span>[ CONTACT ]</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/80 text-zinc-300 hover:text-white backdrop-blur-md md:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="mt-3 rounded-xl border border-dashed border-white/20 bg-[#0c0c12]/95 p-4 backdrop-blur-2xl shadow-2xl md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-1 font-mono text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.index)}
                  className={`text-left rounded-lg px-3 py-2 transition-colors flex items-center justify-between ${
                    effectiveActiveIndex === link.index
                      ? "bg-[#FF5500] text-black font-bold"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] opacity-60">[{link.num}]</span>
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-dashed border-white/15 space-y-1.5">
                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg border border-dashed px-3 py-2 text-xs font-bold font-mono shadow-sm ${
                    isBlog
                      ? "border-[#FF5500] bg-[#FF5500] text-black"
                      : "border-[#FF5500]/40 bg-[#FF5500]/10 text-[#FF5500]"
                  }`}
                >
                  <span>[ BLOG &amp; FIELD NOTES ]</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${isBlog ? "bg-black text-[#FF5500]" : "bg-[#FF5500] text-black"}`}>
                    {isBlog ? "ACTIVE" : "NEW"}
                  </span>
                </Link>
                <button
                  onClick={() => handleNavClick(6)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-zinc-900 py-2 text-xs font-bold text-white font-mono shadow-sm"
                >
                  <span>[ CONTACT DIRECTLY ]</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
