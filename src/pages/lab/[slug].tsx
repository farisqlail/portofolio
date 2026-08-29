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
      landingHref: experiment.landingHref ?? null,
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
  landingHref: string | null;
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
  landingHref,
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans relative overflow-hidden`}
      >
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <Navbar activeIndex={1} />

        <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-24 sm:pt-32 pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
              <Link
                href="/?section=experiments"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white border border-dashed border-white/20 rounded-md px-3 py-1.5 bg-black/40 backdrop-blur-md transition-colors"
              >
                <ArrowLeft size={13} />
                <span>[ BACK TO LAB ]</span>
              </Link>

              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                <span className="h-1.5 w-1.5 bg-[#FF5500]" />
                <span>SPEC // {category.toUpperCase()}</span>
              </div>
            </div>

            {/* Main Spec Card with Stitch styling */}
            <div className="relative rounded-2xl border border-dashed border-white/20 bg-[#0c0c12]/95 p-6 sm:p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden space-y-6 sm:space-y-8">
              {/* Corner Cross Stitch Markers */}
              <span className="absolute top-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
              <span className="absolute top-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>

              {/* Header section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-dashed border-white/15 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-[#FF5500]/40 bg-[#FF5500]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#FF5500]">
                      [ {category} ]
                    </span>
                    <span className="font-mono text-xs text-[#A3E635] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-[#A3E635] animate-pulse" />
                      OPEN_SOURCE
                    </span>
                  </div>
                  {Icon && <Icon size={20} className="text-zinc-400 shrink-0" />}
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  {title}
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-sans">
                  {summary}
                </p>
              </div>

              {/* Show-off Visual Preview Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-900 border border-dashed border-white/20 shadow-2xl">
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
                <div className="md:col-span-7 rounded-xl border border-dashed border-white/15 bg-black/50 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider border-b border-dashed border-white/10 pb-2.5">
                    <Cpu size={14} className="text-[#FF5500]" />
                    <span>[ KEY ARCHITECTURAL CAPABILITIES ]</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                        <span className="font-mono text-[#FF5500] text-xs font-bold shrink-0 mt-0.5">0{idx + 1}/</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack (5 cols) */}
                <div className="md:col-span-5 rounded-xl border border-dashed border-white/15 bg-black/50 p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#A3E635] font-bold uppercase tracking-wider border-b border-dashed border-white/10 pb-2.5 mb-3">
                      <Layers size={14} className="text-[#A3E635]" />
                      <span>[ TECH STACK ]</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 font-mono">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] text-zinc-300 bg-white/[0.04] border border-dashed border-white/15 rounded px-2.5 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-mono pt-2 border-t border-dashed border-white/10">
                    Full implementation details available on GitHub.
                  </p>
                </div>
              </div>

              {/* Full Description Section */}
              <div className="pt-4 border-t border-dashed border-white/15 space-y-2">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  [ SYSTEM DESCRIPTION ]
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-sans">
                  {description}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-dashed border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md"
                  >
                    <span>[ VIEW REPOSITORY ON GITHUB ↗ ]</span>
                    <ArrowUpRight size={14} />
                  </a>

                  {landingHref && (
                    <Link
                      href={landingHref}
                      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/25 bg-black/40 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-bold text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] transition-all"
                    >
                      <span>[ VIEW LANDING PAGE ]</span>
                    </Link>
                  )}
                </div>

                <Link
                  href="/?section=experiments"
                  className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  [ ← RETURN TO PROTOTYPES ]
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
