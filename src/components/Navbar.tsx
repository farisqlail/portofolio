import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeIndex?: number;
  onSelectCard?: (index: number) => void;
}

const navLinks = [
  { label: "Overview", index: 0 },
  { label: "Philosophy", index: 1 },
  { label: "Capabilities", index: 2 },
  { label: "Experience", index: 3 },
  { label: "Honors", index: 4 },
  { label: "Lab", index: 5 },
  { label: "Contact", index: 6 },
];

export default function Navbar({ activeIndex = 0, onSelectCard }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (index: number) => {
    if (onSelectCard) {
      onSelectCard(index);
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between pointer-events-auto">
        {/* Brand */}
        <button
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-white font-sans font-bold text-xs tracking-wider backdrop-blur-md transition-all group-hover:border-white/40 group-hover:bg-zinc-800">
            FR
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
              Faris Rizqilail
            </span>
            <span className="text-[11px] text-zinc-400 font-normal">
              Software Engineer &amp; Founder
            </span>
          </div>
        </button>

        {/* Floating Pill Nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeIndex === link.index;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.index)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick(6)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-zinc-900/80 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-black hover:border-transparent backdrop-blur-md cursor-pointer shadow-sm"
          >
            <span>Contact</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-zinc-300 hover:text-white backdrop-blur-md md:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="mt-3 rounded-2xl border border-white/15 bg-black/95 p-4 backdrop-blur-2xl shadow-2xl md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.index)}
                  className={`text-left rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    activeIndex === link.index
                      ? "bg-white text-black font-semibold"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => handleNavClick(6)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-xs font-semibold text-black"
                >
                  <span>Contact</span>
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
