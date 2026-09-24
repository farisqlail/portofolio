import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ExternalLink,
  Eye,
  Search,
  Sparkles,
  Layers,
  Cpu,
  Compass,
  Wrench,
  UserCheck,
  CheckCircle2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedBlueprints } from "@/lib/blueprintsData";
import type { Blueprint, BlueprintCategory } from "@/types/blueprint";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";

const CATEGORIES: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { label: "ALL ARTIFACTS", value: "All", icon: Layers },
  { label: "STARTERS & CODE", value: "Starters & Code", icon: Compass },
  { label: "AI & AGENTS", value: "AI & Agents", icon: Cpu },
  { label: "ARCHITECTURE & GUIDES", value: "Architecture & Guides", icon: Sparkles },
  { label: "TOOLS & UTILITIES", value: "Tools & Utilities", icon: Wrench },
  { label: "ADVISORY & SERVICES", value: "Advisory & Services", icon: UserCheck },
];

export const getStaticProps = (async () => {
  const blueprints = await getPublishedBlueprints();

  return {
    props: {
      blueprints,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
}) satisfies GetStaticProps<{
  blueprints: Blueprint[];
}>;

export default function BlueprintsPage({
  blueprints: initialBlueprints,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [blueprints] = useState<Blueprint[]>(initialBlueprints);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlueprints = useMemo(() => {
    return blueprints.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tech_stack &&
          item.tech_stack.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [blueprints, selectedCategory, searchQuery]);

  const baseUrl = SITE_URL.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/blueprints`;

  // Horizontal scroller controls (Drag-to-scroll, wheel-to-horizontal, and arrows without visible scrollbar)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();
    window.addEventListener("resize", checkScroll);

    // Mouse wheel horizontal scroll listener (translates vertical wheel to horizontal scroll)
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScroll();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkScroll);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  const scrollByAmount = (amount: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
    setHasMoved(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    el.scrollLeft = scrollLeft - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleCategoryClick = (val: string) => {
    if (hasMoved) return;
    setSelectedCategory(val);
  };

  return (
    <>
      <Head>
        <title>The Blueprint Vault · Digital Assets, AI Agents &amp; Code · Faris Rizqilail</title>
        <meta
          name="description"
          content="Universal catalog of production-ready code starters, AI agent skills, system architecture runbooks, developer utilities, and 1-on-1 technical advisory by Faris Rizqilail."
        />
        <meta
          name="keywords"
          content="Next.js Templates, AI Agent Skills, System Architecture Runbook, Gumroad, Cal.com, Developer Tools, Faris Rizqilail, LailDev"
        />
        <meta name="author" content="Faris Rizqilail" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={pageUrl} />
        <link rel="icon" href="/assets/icons/logo.png" type="image/png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Faris Rizqilail | LailDev" />
        <meta
          property="og:title"
          content="The Blueprint Vault · Digital Assets &amp; Code · Faris Rizqilail"
        />
        <meta
          property="og:description"
          content="Curated codebases, AI agent skills, architecture blueprints, and advisory sessions."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/images/categories/engineering.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="The Blueprint Vault" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LailDev" />
        <meta name="twitter:creator" content="@LailDev" />
        <meta
          name="twitter:title"
          content="The Blueprint Vault · Faris Rizqilail"
        />
        <meta
          name="twitter:description"
          content="Curated codebases, AI agent skills, architecture blueprints, and advisory sessions."
        />
        <meta
          name="twitter:image"
          content={`${baseUrl}/assets/images/categories/engineering.jpg`}
        />

        {/* Optional Gumroad Modal Script for seamless checkout */}
        <script src="https://gumroad.com/js/gumroad.js" async />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#060608] text-foreground font-sans relative selection:bg-[#FF5500] selection:text-black`}
      >
        {/* Subtle Background Blueprint Grid */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <Navbar />

        {/* Top Header / Hero Section */}
        <header className="relative z-10 border-b border-dashed border-white/10 pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-black/80 via-[#07070c]/70 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  The Blueprint <span className="text-[#FF5500]">Vault</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
                  Battle-tested codebases, AI agent skill modules, production architecture runbooks,
                  and 1-on-1 advisory sessions. Built for builders who ship high-reliability software.
                </p>
              </div>

              {/* Status / Metric HUD */}
              <div className="flex items-center gap-3">
                <div className="border border-dashed border-white/15 bg-black/40 backdrop-blur-md rounded-xl p-3 px-4 font-mono text-xs">
                  <div className="text-zinc-500 text-[10px] uppercase">Total Artifacts</div>
                  <div className="text-white text-lg font-bold">
                    {blueprints.length}{" "}
                    <span className="text-[10px] text-zinc-500 font-normal">ITEMS</span>
                  </div>
                </div>
                <div className="border border-dashed border-white/15 bg-black/40 backdrop-blur-md rounded-xl p-3 px-4 font-mono text-xs">
                  <div className="text-zinc-500 text-[10px] uppercase">Distribution</div>
                  <div className="text-[#A3E635] text-lg font-bold">
                    100%{" "}
                    <span className="text-[10px] text-zinc-500 font-normal">DIRECT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="mt-8 pt-6 border-t border-dashed border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category pills scroller with arrows, drag-to-scroll, wheel-to-scroll, without scrollbar */}
              <div className="relative flex-1 min-w-0 flex items-center group">
                {/* Left arrow with fade mask */}
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pr-4 pl-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => scrollByAmount(-220)}
                      className="h-7 w-7 rounded-lg border border-white/20 bg-black/90 text-zinc-300 hover:text-white hover:border-[#FF5500] hover:bg-[#FF5500]/10 flex items-center justify-center transition-all shadow-lg cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={14} />
                    </button>
                  </div>
                )}

                {/* Scrollable Pills Track */}
                <div
                  ref={scrollContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 font-mono text-xs select-none touch-pan-x cursor-grab active:cursor-grabbing scroll-smooth w-full no-scrollbar scrollbar-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleCategoryClick(cat.value)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                          isActive
                            ? "border-[#FF5500] bg-[#FF5500]/10 text-white font-medium shadow-[0_0_12px_rgba(255,85,0,0.2)]"
                            : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <Icon size={12} className={isActive ? "text-[#FF5500]" : "text-zinc-500"} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right arrow with fade mask */}
                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pl-4 pr-0 bg-gradient-to-l from-[#060608] via-[#060608]/90 to-transparent pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => scrollByAmount(220)}
                      className="h-7 w-7 rounded-lg border border-white/20 bg-black/90 text-zinc-300 hover:text-white hover:border-[#FF5500] hover:bg-[#FF5500]/10 flex items-center justify-center transition-all shadow-lg cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Search box */}
              <div className="relative min-w-[240px] sm:min-w-[280px] shrink-0">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artifacts or tech stack..."
                  className="w-full rounded-xl border border-white/10 bg-black/60 pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-zinc-500 focus:border-[#FF5500] focus:outline-none focus:ring-1 focus:ring-[#FF5500] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white font-mono"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Catalog Grid */}
        <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {filteredBlueprints.length === 0 ? (
            <div className="relative rounded-2xl border border-dashed border-white/15 bg-[#0a0a0f]/80 p-12 text-center backdrop-blur-xl">
              <span className="absolute top-2 left-2 font-mono text-xs text-zinc-600 font-bold">+</span>
              <span className="absolute top-2 right-2 font-mono text-xs text-zinc-600 font-bold">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-xs text-zinc-600 font-bold">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-xs text-zinc-600 font-bold">+</span>
              <Layers size={36} className="mx-auto text-zinc-600 mb-3" />
              <h3 className="font-mono text-base font-bold text-white">No Artifacts Found</h3>
              <p className="mt-1 text-sm text-zinc-400">
                No matching blueprints for &ldquo;{searchQuery || selectedCategory}&rdquo;. Try another filter or reset search.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs text-white hover:border-[#FF5500] transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBlueprints.map((item) => {
                const isService = item.category === "Advisory & Services";
                const isFree = item.price_display.toLowerCase().includes("free");

                return (
                  <article
                    key={item.id}
                    className="group relative flex flex-col rounded-2xl border border-dashed border-white/15 bg-[#09090e]/90 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-white/30 hover:shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden"
                  >
                    {/* Corner Cross-Stitches */}
                    <span className="absolute top-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold group-hover:text-[#FF5500] transition-colors">
                      +
                    </span>
                    <span className="absolute top-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold group-hover:text-[#FF5500] transition-colors">
                      +
                    </span>
                    <span className="absolute bottom-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold group-hover:text-[#FF5500] transition-colors">
                      +
                    </span>
                    <span className="absolute bottom-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold group-hover:text-[#FF5500] transition-colors">
                      +
                    </span>

                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-dashed border-white/10 bg-black/60 mb-5">
                      <Image
                        src={item.cover_image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent opacity-60" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                        {item.badge && (
                          <span className="rounded-md border border-[#FF5500]/40 bg-[#FF5500]/90 px-2 py-0.5 font-mono text-[9px] font-bold text-black uppercase tracking-wider shadow-sm">
                            {item.badge}
                          </span>
                        )}
                        <span className="rounded-md border border-white/15 bg-black/70 backdrop-blur-md px-2 py-0.5 font-mono text-[9px] font-medium text-zinc-300 uppercase">
                          {item.platform}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-2.5 right-2.5">
                        <span
                          className={`rounded-md border px-2.5 py-0.5 font-mono text-xs font-bold shadow-md backdrop-blur-md ${
                            isFree
                              ? "border-[#A3E635]/40 bg-[#A3E635]/15 text-[#A3E635]"
                              : "border-[#FF5500]/40 bg-black/80 text-white"
                          }`}
                        >
                          {item.price_display}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Header */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                      <span>{item.category.toUpperCase()}</span>
                    </div>

                    {/* Title & Summary */}
                    <h2 className="font-mono text-base font-bold text-white group-hover:text-[#FF5500] transition-colors line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed flex-grow">
                      {item.summary}
                    </p>

                    {/* Highlights Bullet List */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-dashed border-white/10 space-y-1.5">
                        {item.highlights.slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-start gap-1.5 font-mono text-[11px] text-zinc-400">
                            <CheckCircle2 size={11} className="text-[#FF5500] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    {item.tech_stack && item.tech_stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="mt-6 pt-4 border-t border-dashed border-white/10 flex items-center gap-2">
                      {item.preview_url && (
                        <a
                          href={item.preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2 font-mono text-xs font-medium text-zinc-300 hover:border-white/30 hover:text-white transition-colors"
                        >
                          <Eye size={12} />
                          <span>Preview</span>
                        </a>
                      )}

                      <a
                        href={item.purchase_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-[1.5] inline-flex items-center justify-center gap-1.5 rounded-xl py-2 font-mono text-xs font-bold transition-all shadow-md ${
                          isService
                            ? "border border-[#A3E635] bg-[#A3E635] text-black hover:bg-[#8fd02c]"
                            : "border border-[#FF5500] bg-[#FF5500] text-black hover:bg-[#e04b00] hover:shadow-[0_0_15px_rgba(255,85,0,0.4)]"
                        }`}
                      >
                        <span>
                          {isService
                            ? "Book Session"
                            : isFree
                            ? "Get Free Access"
                            : `Acquire · ${item.price_display}`}
                        </span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
