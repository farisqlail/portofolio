import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { initialTemplates } from "@/data/initialTemplates";
import type { Template } from "@/types/template";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setTemplates(data as Template[]);
        }
      } catch (err) {
        console.warn("Failed to load templates from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  // Collect unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    templates.forEach((t) => {
      t.tags?.forEach((tag) => set.add(tag));
    });
    return ["All", ...Array.from(set)];
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchesTag =
        selectedTag === "All" || (tpl.tags && tpl.tags.includes(selectedTag));
      const matchesSearch =
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tpl.tags && tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesTag && matchesSearch;
    });
  }, [templates, selectedTag, searchQuery]);

  return (
    <>
      <Head>
        <title>Curated Templates &amp; Systems · Faris Rizqilail (Gumroad)</title>
        <meta
          name="description"
          content="Production-ready web application, dashboard, and portfolio templates built with Next.js, Tailwind CSS, and TypeScript. Available on Gumroad."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/templates`} />
        <link rel="icon" href="/assets/icons/logo.png" type="image/png" />
      </Head>

      <div className="min-h-screen bg-[#060608] text-zinc-100 font-sans selection:bg-[#FF5500] selection:text-black">
        {/* Subtle grid background */}
        <div className="fixed inset-0 pointer-events-none z-0 grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 divide-x divide-white/[0.02] opacity-70" />

        {/* Global Standard Navbar (Exact same as Landing Page) */}
        <Navbar />

        {/* Hero Section with Top Padding for Fixed Navbar */}
        <section className="relative z-10 border-b border-dashed border-white/15 px-4 sm:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-b from-black/80 to-[#08080c]/60">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300 mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#FF5500]" />
              <span>Production-Ready Codebases &amp; UI Systems</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Crafted templates to ship your{" "}
              <span className="bg-gradient-to-r from-[#FF5500] via-[#FFAA80] to-[#C7B8F5] bg-clip-text text-transparent">
                vision in days.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Curated, production-grade Next.js, TypeScript, and Tailwind CSS codebases designed for engineers, founders, and creators. Instant download on Gumroad with lifetime updates.
            </p>

            {/* Search & Filter Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-dashed border-white/10">
              {/* Search box */}
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3.5 top-3 text-zinc-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates, features, tech..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#FF5500] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-white"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Tag filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
                <Filter size={12} className="text-zinc-500 shrink-0 hidden sm:inline" />
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] transition-all shrink-0 cursor-pointer ${
                      selectedTag === tag
                        ? "bg-[#FF5500] text-black font-bold shadow-sm"
                        : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Templates Grid Section */}
        <section className="relative z-10 px-4 sm:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 p-16 text-center font-mono text-xs text-zinc-500">
                Loading templates catalog...
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 p-16 text-center font-mono text-xs text-zinc-500 space-y-2">
                <p>No templates matching your filter criteria.</p>
                <button
                  onClick={() => {
                    setSelectedTag("All");
                    setSearchQuery("");
                  }}
                  className="text-[#FF5500] underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredTemplates.map((template) => (
                  <article
                    key={template.id}
                    className="group rounded-2xl border border-dashed border-white/15 bg-[#0b0b10]/90 backdrop-blur-xl overflow-hidden transition-all hover:border-[#FF5500]/50 hover:shadow-[0_15px_40px_rgba(255,85,0,0.12)] flex flex-col justify-between"
                  >
                    <div>
                      {/* Preview Image with Hover Scale */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-white/10">
                        <Image
                          src={template.image_url || "/assets/images/faris-hero-2.png"}
                          alt={template.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          {template.featured && (
                            <span className="rounded-full bg-[#FF5500] px-2 py-0.5 font-mono text-[9px] font-bold text-black uppercase tracking-wider shadow-md">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Price Pill */}
                        <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/85 px-3 py-0.5 font-mono text-xs font-bold text-white shadow-md backdrop-blur-md">
                          {template.price}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#FF5500] transition-colors">
                          {template.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 font-sans">
                          {template.description}
                        </p>

                        {/* Tags */}
                        {template.tags && template.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {template.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-white/10 bg-zinc-900/90 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                      <a
                        href={template.gumroad_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#FF5500] bg-[#FF5500] py-2.5 text-xs font-bold text-black font-mono transition-transform hover:scale-102 shadow-sm"
                      >
                        <ShoppingBag size={13} />
                        <span>Get on Gumroad</span>
                      </a>

                      {template.preview_url && (
                        <a
                          href={template.preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                          title="Live Demo"
                        >
                          <Eye size={13} />
                          <span className="hidden sm:inline">Preview</span>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Custom Engineering Banner */}
        <section className="relative z-10 px-4 sm:px-8 py-16 border-t border-dashed border-white/15 bg-black/60">
          <div className="mx-auto max-w-4xl rounded-2xl border border-dashed border-white/20 bg-[#0d0d12]/90 p-8 sm:p-12 text-center space-y-4 backdrop-blur-xl">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF5500] font-bold">
              [ TAILORED CUSTOM BUILDS ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Need custom modifications or a bespoke product?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-sans">
              I partner with founders and enterprise engineering teams to build custom architectures, complex frontend animations, and scalable API platforms.
            </p>
            <div className="pt-2">
              <Link
                href="/?section=contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-lg font-mono"
              >
                <span>Discuss Your Project</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-dashed border-white/15 px-4 sm:px-8 py-6 font-mono text-xs text-zinc-500">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Faris Rizqilail · Powered by Gumroad &amp; Supabase</p>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/" className="hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <a
                href="https://github.com/farisqlail"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
