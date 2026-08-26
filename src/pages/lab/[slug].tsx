import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { experiments, getExperimentBySlug } from "@/data/experiments";

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

export const getStaticPaths = (async () => {
  return {
    paths: experiments.map((experiment) => ({
      params: { slug: experiment.slug },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const experiment = getExperimentBySlug(params?.slug as string);

  if (!experiment) {
    return { notFound: true };
  }

  return {
    props: {
      slug: experiment.slug,
      title: experiment.title,
      description: experiment.description,
      summary: experiment.summary,
      category: experiment.category,
      image: experiment.image,
      techStack: experiment.techStack,
      highlights: experiment.highlights,
      href: experiment.href,
    },
  };
}) satisfies GetStaticProps<{
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  image: string;
  techStack: string[];
  highlights: string[];
  href: string;
}>;

export default function ExperimentDetail({
  slug,
  title,
  description,
  summary,
  category,
  image,
  techStack,
  highlights,
  href,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const experiment = getExperimentBySlug(slug);
  const Icon = experiment?.icon;
  const pageUrl = `${SITE_URL}lab/${slug}`;

  return (
    <>
      <Head>
        <title>{title} · Lab · Faris Rizqilail</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${title} · Faris Rizqilail`} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={`${SITE_URL}${image}`} />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-foreground font-sans`}
      >
        <Navbar activeIndex={5} />

        <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
              <Link
                href="/#experiments"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={13} />
                <span>[ Back to Lab ]</span>
              </Link>

              <span className="font-mono text-[11px] text-zinc-500">
                PROTOTYPE // {category.toUpperCase()}
              </span>
            </div>

            {/* Main Spec Card */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0e] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden space-y-6 sm:space-y-8">
              {/* Header section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-xs text-[#C7B8F5]">
                      {category}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open Source
                    </span>
                  </div>
                  {Icon && <Icon size={22} className="text-zinc-400 shrink-0" />}
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  {title}
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  {summary}
                </p>
              </div>

              {/* Show-off Visual Preview Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/15 shadow-2xl">
                <Image
                  src={image}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
              </div>

              {/* Technical Specifications Bento */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Highlights (7 cols) */}
                <div className="md:col-span-7 rounded-xl border border-white/10 bg-zinc-950/80 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider border-b border-white/10 pb-2.5">
                    <Cpu size={14} className="text-[#C7B8F5]" />
                    <span>Key Architectural Capabilities</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 size={13} className="text-[#A7EADC] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack (5 cols) */}
                <div className="md:col-span-5 rounded-xl border border-white/10 bg-zinc-950/80 p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider border-b border-white/10 pb-2.5 mb-3">
                      <Layers size={14} className="text-[#F6D1AC]" />
                      <span>Tech Stack</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] text-zinc-300 bg-white/[0.04] border border-white/10 rounded-md px-2.5 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-mono pt-2 border-t border-white/5">
                    Full implementation details available on GitHub.
                  </p>
                </div>
              </div>

              {/* Full Description Section */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  [ System Description ]
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black hover:bg-zinc-200 transition-all shadow-md"
                >
                  <span>View Repository on GitHub</span>
                  <ArrowUpRight size={14} />
                </a>

                <Link
                  href="/#experiments"
                  className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to all prototypes
                </Link>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
