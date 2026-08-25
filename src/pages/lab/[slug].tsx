import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
      category: experiment.category,
      href: experiment.href,
    },
  };
}) satisfies GetStaticProps<{
  slug: string;
  title: string;
  description: string;
  category: string;
  href: string;
}>;

export default function ExperimentDetail({
  slug,
  title,
  description,
  category,
  href,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const experiment = getExperimentBySlug(slug);
  const Icon = experiment?.icon;
  const pageUrl = `${SITE_URL}lab/${slug}`;

  return (
    <>
      <Head>
        <title>{title} · Lab · Faris Rizqilail</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${title} · Faris Rizqilail`} />
        <meta property="og:description" content={description} />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-foreground font-sans`}
      >
        <Navbar />

        <main className="mx-auto max-w-3xl px-6 pt-36 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#experiments"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span>[ Back to Lab ]</span>
            </Link>

            <div className="relative mt-8 rounded-2xl border border-border bg-surface/50 p-8 sm:p-10">
              <div className="corner-pin-tl" />
              <div className="corner-pin-tr" />
              <div className="corner-pin-bl" />
              <div className="corner-pin-br" />

              <div className="flex items-center justify-between border-b border-border pb-5 mb-6">
                <span className="rounded-full border border-border bg-black px-3 py-1 font-mono text-xs text-[#C7B8F5]">
                  {category}
                </span>
                {Icon && <Icon size={24} className="text-zinc-400" />}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {title}
              </h1>

              <div className="mt-6 pt-6 border-t border-border/60">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  [ System Architecture &amp; Specification ]
                </p>
                <p className="text-base leading-relaxed text-zinc-300">
                  {description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-all shadow-sm"
                >
                  <span>View Repository</span>
                  <ArrowUpRight size={13} />
                </a>

                <span className="font-mono text-xs text-zinc-500">
                  Status: <span className="text-emerald-400">Open Source</span>
                </span>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
