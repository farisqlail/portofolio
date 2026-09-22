import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Scale, ArrowLeft, BookOpen, AlertTriangle, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function TermsOfServicePage() {
  const lastUpdated = "September 22, 2026";

  return (
    <>
      <Head>
        <title>Terms of Service · Faris Rizqilail (LailDev)</title>
        <meta
          name="description"
          content="Terms of Service and Conditions of Use for Faris Rizqilail's portfolio, engineering blog, and technical resources."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans flex flex-col`}
      >
        {/* Top Minimal Nav */}
        <header className="border-b border-dashed border-white/15 bg-[#0a0a0f] px-6 py-4">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} className="text-[#FF5500]" />
              <span>RETURN_HOME</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
              <span className="font-mono text-[10px] text-zinc-400 uppercase">
                LEGAL_DOC // TERMS_OF_USE
              </span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 mx-auto max-w-4xl w-full px-6 py-10 sm:py-16 space-y-10">
          {/* Header Banner */}
          <div className="rounded-xl border border-dashed border-white/20 bg-[#0c0c12] p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#38BDF8] font-bold uppercase tracking-wider">
              <Scale size={14} />
              <span>[ CONDITIONS OF USE & INTELLECTUAL PROPERTY ]</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Last Revised: {lastUpdated} · Faris Rizqilail (@LailDev)
            </p>
          </div>

          {/* Document Body */}
          <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <BookOpen size={16} className="text-[#FF5500]" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this website, available at{" "}
                <code className="text-[#A3E635] font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
                  https://laildev.vercel.app
                </code>
                , you agree to be bound by these Terms of Service, all applicable laws and regulations,
                and agree that you are responsible for compliance with any applicable local laws. If you
                do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#A3E635]" />
                2. Intellectual Property & Code Snippets
              </h2>
              <p>
                All original technical articles, architectural guides, benchmarks, design schematics, and
                accompanying code examples authored by Faris Rizqilail are protected by applicable copyright
                and trademark laws.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs sm:text-sm font-sans">
                <li>
                  <strong>Open Code Examples</strong>: Code snippets and configuration patterns published
                  in blog posts are licensed for educational and developmental use in personal or commercial
                  projects under permissive terms.
                </li>
                <li>
                  <strong>Written Editorial Content</strong>: You may not republish, sell, rent, or
                  sub-license entire written articles or essays without prior written consent from the author.
                </li>
              </ul>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-400" />
                3. Disclaimer of Warranties
              </h2>
              <p>
                The materials and software references on Faris Rizqilail&apos;s website are provided on an
                &apos;as is&apos; basis. Faris Rizqilail makes no warranties, expressed or implied, and hereby
                disclaims and negates all other warranties including, without limitation, implied warranties
                of merchantability, fitness for a particular purpose, or non-infringement of intellectual
                property or other violation of rights.
              </p>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono">
                4. Third-Party Links & Advertisements
              </h2>
              <p>
                Our website may contain links to external sites or display advertisements served by Google
                AdSense. Faris Rizqilail has not reviewed all of the sites linked to its website and is not
                responsible for the contents of any such linked site. The inclusion of any link or advertisement
                does not imply endorsement by Faris Rizqilail.
              </p>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono">
                5. Modifications to Terms
              </h2>
              <p>
                Faris Rizqilail may revise these Terms of Service for its website at any time without prior
                notice. By using this website you are agreeing to be bound by the then current version of
                these Terms of Service.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
