import { useState, useMemo, useEffect } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import {
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Search,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/ads/AdSlot";
import BlogCoverImage from "@/components/blog/BlogCoverImage";
import { getPublishedPosts, getLiveViewCounts } from "@/lib/blogData";
import type { BlogPost } from "@/types/blog";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export const getStaticProps: GetStaticProps<{ posts: BlogPost[] }> = async () => {
  const posts = await getPublishedPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
};

export default function BlogIndex({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [liveViews, setLiveViews] = useState<Record<string, number>>({});

  useEffect(() => {
    getLiveViewCounts().then((counts) => {
      if (counts && Object.keys(counts).length > 0) {
        setLiveViews(counts);
      }
    });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ["ALL", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === "ALL" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <>
      <Head>
        <title>Engineering Blog &amp; Notes · Faris Rizqilail</title>
        <meta
          name="description"
          content="Technical writing on system architecture, Next.js, Laravel microservices, multi-agent AI systems, and software leadership by Faris Rizqilail."
        />
        <link rel="canonical" href={`${SITE_URL}blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}blog`} />
        <meta property="og:title" content="Engineering Blog &amp; Notes · Faris Rizqilail" />
        <meta
          property="og:description"
          content="Technical architecture, modern full-stack workflows, and developer tools."
        />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans relative overflow-hidden flex flex-col justify-between`}
      >
        {/* Subtle Background Blueprint Micro Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <Navbar />

        <main className="mx-auto max-w-6xl w-full px-4 sm:px-6 pt-28 sm:pt-36 pb-20 relative z-10 flex-1">
          {/* Page Header */}
          <div className="border-b border-dashed border-white/15 pb-6 sm:pb-8">
            <div className="inline-flex items-center gap-2 rounded border border-[#FF5500]/40 bg-[#FF5500]/10 px-3 py-1 font-mono text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-3">
              <Sparkles size={12} className="text-[#FF5500]" />
              <span>[ FIELD NOTES &amp; ARCHITECTURE SPECS ]</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Engineering Notes &amp;{" "}
                <span className="text-[#FF5500] underline decoration-dashed decoration-[#FF5500]/50 underline-offset-8">
                  Field Logs.
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                Deep-dives into scalable software architectures, distributed backend APIs, Next.js performance, and autonomous AI systems.
              </p>
            </div>
          </div>

          {/* Top Leaderboard Ad Slot */}
          <AdSlot slotId="blog-top-banner" format="horizontal" className="my-6" />

          {/* Controls: Search & Category Chips */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 my-6">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded px-3 py-1 text-xs whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "border border-[#FF5500] bg-[#FF5500] text-black font-bold shadow-sm"
                        : "border border-dashed border-white/15 bg-black/40 text-zinc-400 hover:text-white hover:border-white/30"
                    }`}
                  >
                    [ {cat} ]
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="Search articles, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-dashed border-white/15 bg-black/50 pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-[#FF5500] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Articles Bento Grid */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 bg-[#0a0a0f]/60 p-12 text-center my-8">
              <BookOpen size={24} className="mx-auto text-zinc-600 mb-2" />
              <p className="font-mono text-sm text-zinc-400">
                [ NO ARTICLES FOUND MATCHING QUERY ]
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Try searching for different keywords or reset category filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-6">
              {filteredPosts.map((post) => {
                const readTime = estimateReadingTime(post.content);
                const formattedDate = post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                return (
                  <article
                    key={post.id}
                    className="group relative rounded-xl border border-dashed border-white/20 bg-[#0c0c12]/90 overflow-hidden flex flex-col justify-between transition-all hover:border-[#FF5500]/60 hover:bg-[#0c0c12] shadow-xl"
                  >
                    {/* Corner + Pins */}
                    <span className="absolute top-2 left-2 font-mono text-[10px] text-zinc-600 select-none font-bold z-20">
                      +
                    </span>
                    <span className="absolute top-2 right-2 font-mono text-[10px] text-zinc-600 select-none font-bold z-20">
                      +
                    </span>

                    <div>
                      {/* Thumbnail Cover with Guaranteed Default Fallback */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-dashed border-white/15 bg-zinc-950">
                        <BlogCoverImage
                          src={post.cover_image}
                          category={post.category}
                          alt={post.title}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                          <span className="rounded border border-[#FF5500]/50 bg-black/80 px-2 py-0.5 font-mono text-[9px] font-bold text-[#FF5500] backdrop-blur-md">
                            [ {post.category.toUpperCase()} ]
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4 sm:p-5">
                        {/* Meta strip */}
                        <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {formattedDate}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <Clock size={11} />
                            {readTime} min read
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-[#A3E635]">
                            <Eye size={11} />
                            {liveViews[post.slug] !== undefined ? liveViews[post.slug] : post.view_count} views
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#FF5500] transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Tags & Read Action */}
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-dashed border-white/10 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded border border-dashed border-white/15 bg-white/[0.02] px-1.5 py-0.5 font-mono text-[9px] text-zinc-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#FF5500] hover:translate-x-0.5 transition-transform shrink-0"
                      >
                        <span>READ</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Bottom Ad Slot */}
          <AdSlot slotId="blog-bottom-banner" format="horizontal" className="mt-12" />
        </main>

        <Footer />
      </div>
    </>
  );
}
