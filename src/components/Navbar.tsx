import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeIndex?: number;
  onSelectCard?: (index: number) => void;
}

export default function Navbar({ activeIndex = 0, onSelectCard }: NavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isBlog = router.pathname.startsWith("/blog");
  const isTemplates = router.pathname.startsWith("/templates");

  const handleSectionJump = (index: number, sectionId: string) => {
    if (router.pathname === "/") {
      if (onSelectCard) onSelectCard(index);
    } else {
      router.push(`/?section=${sectionId}`);
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 sm:py-4 pointer-events-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between pointer-events-auto">
        {/* Brand: Clean, Minimal & Elegant */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-black/60 backdrop-blur-md group-hover:border-[#FF5500] transition-colors">
            <span className="h-2 w-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-white tracking-tight group-hover:text-[#FF5500] transition-colors">
              Faris Rizqilail
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation: Single Unified Floating Glass Capsule */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1.5 backdrop-blur-2xl shadow-2xl">
          {/* Overview */}
          <button
            onClick={() => handleSectionJump(0, "hero")}
            className={`relative rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              router.pathname === "/" && activeIndex === 0
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {router.pathname === "/" && activeIndex === 0 && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-[#FF5500] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Overview</span>
          </button>

          {/* Lab */}
          <button
            onClick={() => handleSectionJump(1, "experiments")}
            className={`relative rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              router.pathname === "/" && activeIndex === 1
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {router.pathname === "/" && activeIndex === 1 && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-[#FF5500] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Lab</span>
          </button>

          {/* Experience */}
          <button
            onClick={() => handleSectionJump(2, "experience")}
            className={`relative rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              router.pathname === "/" && activeIndex === 2
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {router.pathname === "/" && activeIndex === 2 && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-[#FF5500] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Experience</span>
          </button>

          {/* Divider */}
          <span className="h-3 w-[1px] bg-white/15 mx-1" />

          {/* Templates Store */}
          <Link
            href="/templates"
            className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              isTemplates
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {isTemplates && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-[#FF5500] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Templates</span>
            <span
              className={`relative z-10 text-[9px] px-1 py-0.2 rounded-full font-bold uppercase ${
                isTemplates ? "bg-black text-[#FF5500]" : "bg-[#FF5500]/20 text-[#FF5500]"
              }`}
            >
              Shop
            </span>
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className={`relative rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              isBlog
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {isBlog && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-[#FF5500] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Blog</span>
          </Link>
        </nav>

        {/* Right Action: Clean Contact Pill */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleSectionJump(6, "contact")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-1.5 font-mono text-xs text-zinc-200 hover:text-white hover:border-white/30 backdrop-blur-md cursor-pointer transition-all shadow-sm"
          >
            <span>Contact</span>
            <ArrowUpRight size={12} className="text-[#FF5500]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/80 text-zinc-300 hover:text-white backdrop-blur-md md:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            className="mt-2 rounded-2xl border border-white/15 bg-[#0b0b10]/95 p-4 backdrop-blur-2xl shadow-2xl md:hidden pointer-events-auto max-w-sm mx-auto font-mono text-xs space-y-1.5"
          >
            <button
              onClick={() => handleSectionJump(0, "hero")}
              className={`w-full text-left rounded-xl px-3 py-2 transition-colors flex items-center justify-between ${
                router.pathname === "/" && activeIndex === 0
                  ? "bg-[#FF5500] text-black font-bold"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span>Overview</span>
              <span className="text-[10px] opacity-60">[01]</span>
            </button>

            <button
              onClick={() => handleSectionJump(1, "experiments")}
              className={`w-full text-left rounded-xl px-3 py-2 transition-colors flex items-center justify-between ${
                router.pathname === "/" && activeIndex === 1
                  ? "bg-[#FF5500] text-black font-bold"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span>Lab Prototypes</span>
              <span className="text-[10px] opacity-60">[02]</span>
            </button>

            <button
              onClick={() => handleSectionJump(2, "experience")}
              className={`w-full text-left rounded-xl px-3 py-2 transition-colors flex items-center justify-between ${
                router.pathname === "/" && activeIndex === 2
                  ? "bg-[#FF5500] text-black font-bold"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span>Experience</span>
              <span className="text-[10px] opacity-60">[03]</span>
            </button>

            <div className="my-1.5 border-t border-dashed border-white/15" />

            <Link
              href="/templates"
              onClick={() => setMobileOpen(false)}
              className={`w-full text-left rounded-xl px-3 py-2 transition-colors flex items-center justify-between ${
                isTemplates
                  ? "bg-[#FF5500] text-black font-bold"
                  : "text-[#FF5500] hover:bg-[#FF5500]/10"
              }`}
            >
              <span>Templates Store (Gumroad)</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40 text-white">
                STORE
              </span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`w-full text-left rounded-xl px-3 py-2 transition-colors flex items-center justify-between ${
                isBlog
                  ? "bg-[#FF5500] text-black font-bold"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span>Blog &amp; Field Notes</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                BLOG
              </span>
            </Link>

            <div className="pt-2 border-t border-dashed border-white/15">
              <button
                onClick={() => handleSectionJump(6, "contact")}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors shadow-sm"
              >
                <span>Contact Directly</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
