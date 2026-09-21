import { useState, useEffect } from "react";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { marked } from "marked";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Check,
  Tag,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/ads/AdSlot";
import {
  getPublishedPosts,
  getPostBySlug,
  incrementPostViews,
  getPostViewCount,
} from "@/lib/blogData";
import type { BlogPost } from "@/types/blog";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{
  post: BlogPost;
  renderedHtml: string;
}> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  const renderedHtml = await marked.parse(post.content);

  return {
    props: {
      post,
      renderedHtml,
    },
    revalidate: 60,
  };
};

export default function BlogPostDetail({
  post,
  renderedHtml,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState(post.view_count || 0);
  const readTime = estimateReadingTime(post.content);
  const pageUrl = `${SITE_URL}blog/${post.slug}`;

  useEffect(() => {
    // 1. Check if user already viewed this post in current browser session
    const sessionKey = `viewed_post_${post.slug}`;
    const alreadyViewed =
      typeof window !== "undefined" ? sessionStorage.getItem(sessionKey) : null;

    if (!alreadyViewed) {
      // New visit: increment in Supabase and update on screen
      incrementPostViews(post.slug).then((newCount) => {
        if (typeof newCount === "number") {
          setViews(newCount);
          sessionStorage.setItem(sessionKey, "1");
        }
      });
    } else {
      // Returning in same session: fetch latest real count without duplicate increment
      getPostViewCount(post.slug).then((currentCount) => {
        if (typeof currentCount === "number") {
          setViews(currentCount);
        }
      });
    }
  }, [post.slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  return (
    <>
      <Head>
        <title>{post.title} · Faris Rizqilail Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${post.title} · Faris Rizqilail`} />
        <meta property="og:description" content={post.excerpt} />
        {post.cover_image && (
          <meta property="og:image" content={`${SITE_URL}${post.cover_image}`} />
        )}
        <meta property="article:published_time" content={post.published_at || post.created_at} />
        <meta property="article:author" content="Faris Rizqilail" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans relative overflow-hidden flex flex-col justify-between`}
      >
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <Navbar />

        <main className="mx-auto max-w-4xl w-full px-4 sm:px-6 pt-28 sm:pt-36 pb-20 relative z-10 flex-1">
          {/* Top Breadcrumb Bar */}
          <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-4 mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white border border-dashed border-white/20 rounded-md px-3 py-1.5 bg-black/40 backdrop-blur-md transition-colors"
            >
              <ArrowLeft size={13} />
              <span>[ BACK TO FIELD LOGS ]</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
              <span className="h-1.5 w-1.5 bg-[#FF5500]" />
              <span>CATEGORY // {post.category.toUpperCase()}</span>
            </div>
          </div>

          {/* Main Article Container with Stitch Styling */}
          <article className="relative rounded-2xl border border-dashed border-white/20 bg-[#0c0c12]/95 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden space-y-6 sm:space-y-8">
            {/* Corner Cross Pins */}
            <span className="absolute top-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
            <span className="absolute top-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
            <span className="absolute bottom-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
            <span className="absolute bottom-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>

            {/* Article Header */}
            <header className="space-y-4 border-b border-dashed border-white/15 pb-6 sm:pb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-[#FF5500]/50 bg-[#FF5500]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#FF5500]">
                  [ {post.category.toUpperCase()} ]
                </span>
                <span className="rounded border border-[#A3E635]/40 bg-black/60 px-2 py-0.5 font-mono text-xs text-[#A3E635] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-[#A3E635] animate-pulse" />
                  VERIFIED_ARTICLE
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {post.title}
              </h1>

              {/* Meta information strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-zinc-400">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#FF5500]" />
                    {formattedDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {readTime} min read
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-[#A3E635]">
                    <Eye size={13} />
                    {views} views
                  </span>
                </div>

                {/* Share Action */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1 rounded border border-dashed border-white/20 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-[#FF5500] hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-[#A3E635]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={12} />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </header>

            {/* Top Ad Slot (Header AdSense) */}
            <AdSlot slotId="article-top" format="horizontal" />

            {/* Featured Image */}
            {post.cover_image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-dashed border-white/20 bg-zinc-900 shadow-2xl">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* Article Content / Markdown Render */}
            <div
              className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-b prose-h2:border-dashed prose-h2:border-white/10 prose-h2:pb-2 prose-h2:mt-8 prose-h3:text-lg sm:prose-h3:text-xl prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-a:text-[#FF5500] prose-a:underline prose-a:decoration-dashed prose-code:font-mono prose-code:text-[#A3E635] prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-dashed prose-pre:border-white/20 prose-pre:rounded-xl prose-li:text-zinc-300 prose-li:text-sm sm:prose-li:text-base prose-table:border-collapse prose-th:border prose-th:border-dashed prose-th:border-white/20 prose-th:p-2 prose-th:bg-zinc-950 prose-td:border prose-td:border-dashed prose-td:border-white/15 prose-td:p-2"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />

            {/* In-Article Ad Slot (Mid Content) */}
            <AdSlot slotId="article-mid" format="in-article" className="my-8" />

            {/* Tags Strip */}
            <div className="pt-6 border-t border-dashed border-white/15">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-zinc-500 font-bold">[ TAGS ]:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-dashed border-white/15 bg-white/[0.03] px-2.5 py-1 text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile Module */}
            <div className="rounded-xl border border-dashed border-white/15 bg-zinc-950/80 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#FF5500]/50 bg-[#FF5500]/10 font-mono font-bold text-lg text-[#FF5500] shrink-0">
                FR
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">Faris Rizqilail</h3>
                  <span className="font-mono text-[10px] text-[#A3E635]">[ AUTHOR ]</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Software Engineer &amp; Founder of @LailDev. Passionate about high-throughput backend APIs, Next.js architecture, and autonomous AI agents.
                </p>
              </div>
              <a
                href="https://github.com/farisqlail"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto inline-flex items-center gap-1 rounded border border-dashed border-white/20 bg-black/60 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-[#FF5500] hover:text-[#FF5500] transition-colors"
              >
                <span>[ GITHUB ↗ ]</span>
              </a>
            </div>

            {/* Bottom Ad Slot */}
            <AdSlot slotId="article-bottom" format="horizontal" />

            {/* Bottom Navigation */}
            <div className="pt-4 border-t border-dashed border-white/15 flex items-center justify-between">
              <Link
                href="/blog"
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
              >
                [ ← BACK TO ALL ARTICLES ]
              </Link>
              <Link
                href="/#contact"
                className="font-mono text-xs text-[#FF5500] hover:underline"
              >
                [ GET IN TOUCH ↗ ]
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
