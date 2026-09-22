import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { ShieldCheck, ArrowLeft, Lock, FileText, Globe } from "lucide-react";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 22, 2026";

  return (
    <>
      <Head>
        <title>Privacy Policy · Faris Rizqilail (LailDev)</title>
        <meta
          name="description"
          content="Privacy Policy and Google AdSense cookie disclosure for Faris Rizqilail's portfolio and engineering blog."
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
              <span className="flex h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
              <span className="font-mono text-[10px] text-zinc-400 uppercase">
                LEGAL_DOC // COMPLIANCE
              </span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 mx-auto max-w-4xl w-full px-6 py-10 sm:py-16 space-y-10">
          {/* Header Banner */}
          <div className="rounded-xl border border-dashed border-white/20 bg-[#0c0c12] p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#FF5500] font-bold uppercase tracking-wider">
              <ShieldCheck size={14} />
              <span>[ DATA INTEGRITY & PRIVACY DISCLOSURE ]</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Last Revised: {lastUpdated} · Effective Immediately
            </p>
          </div>

          {/* Document Body */}
          <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <Globe size={16} className="text-[#FF5500]" />
                1. Overview
              </h2>
              <p>
                At <strong>Faris Rizqilail (LailDev)</strong>, accessible from{" "}
                <code className="text-[#A3E635] font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
                  https://laildev.vercel.app
                </code>
                , the privacy of our visitors is of paramount importance. This Privacy Policy document
                outlines the types of personal and technical information collected and recorded by this
                website and how we utilize it.
              </p>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not
                hesitate to contact us via email at{" "}
                <a
                  href="mailto:farisrizqilail@gmail.com"
                  className="text-[#FF5500] hover:underline font-mono text-xs"
                >
                  farisrizqilail@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <FileText size={16} className="text-[#38BDF8]" />
                2. Log Files & Anonymous Telemetry
              </h2>
              <p>
                Like many technical engineering publications, Faris Rizqilail follows a standard procedure
                of utilizing log files. These files record visits when visitors browse the website. The
                information collected includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs sm:text-sm font-sans">
                <li>Internet Protocol (IP) addresses (anonymized)</li>
                <li>Browser types, hardware architecture, and operating systems</li>
                <li>Internet Service Provider (ISP)</li>
                <li>Date and time stamps of page impressions</li>
                <li>Referring and exit pages</li>
                <li>Approximate page interaction duration</li>
              </ul>
              <p>
                This information is used strictly for analyzing telemetry trends, administering the site,
                monitoring performance bottlenecks (such as Core Web Vitals), and gathering aggregate
                demographic statistics. None of this telemetry is linked to any information that is
                personally identifiable.
              </p>
            </section>

            {/* CRITICAL GOOGLE ADSENSE COMPLIANCE SECTION */}
            <section className="space-y-4 rounded-lg border border-dashed border-[#FF5500]/40 bg-[#FF5500]/5 p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <Lock size={16} className="text-[#FF5500]" />
                3. Google AdSense & Third-Party Advertising Cookies
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <p>
                  Google is one of the third-party advertising vendors on our site. Google uses cookies,
                  specifically known as the <strong>DoubleClick DART cookie</strong>, to serve advertisements
                  to visitors based upon their visit to{" "}
                  <code className="text-[#A3E635] font-mono">laildev.vercel.app</code> and other sites across the
                  Internet.
                </p>
                <div className="rounded border border-dashed border-white/20 bg-black/70 p-4 font-mono text-xs space-y-2">
                  <p className="text-[#FF5500] font-bold">
                    [ IMPORTANT USER OPT-OUT DISCLOSURE ]
                  </p>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    Visitors may choose to decline or opt out of the use of DART cookies by visiting the
                    official Google ad and content network Privacy Policy at the following URL:
                  </p>
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:underline block break-all"
                  >
                    https://policies.google.com/technologies/ads
                  </a>
                </div>
                <p>
                  Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web
                  Beacons in their respective advertisements and links that appear on our blog, which are
                  sent directly to your browser. They automatically receive your IP address when this occurs.
                  These technologies are used to measure the effectiveness of their advertising campaigns
                  and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <p className="text-zinc-400 text-xs italic">
                  Note: Faris Rizqilail (LailDev) has no access to or control over these cookies that are used
                  by third-party advertisers.
                </p>
              </div>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#A3E635]" />
                4. Cookies & Web Storage Management
              </h2>
              <p>
                You can choose to disable cookies through your individual browser options. Detailed
                information about cookie management with specific web browsers can be found at the
                browsers&apos; respective websites:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs sm:text-sm font-sans">
                <li>Google Chrome Privacy and Security settings</li>
                <li>Mozilla Firefox Options / Preferences</li>
                <li>Apple Safari Preferences</li>
                <li>Microsoft Edge Settings</li>
              </ul>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <FileText size={16} className="text-[#C084FC]" />
                5. GDPR & CCPA Compliance Rights
              </h2>
              <p>
                We would like to make sure you are fully aware of all of your data protection rights. Every
                user is entitled to the following:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs sm:text-sm font-sans">
                <li><strong>The right to access</strong>: You have the right to request copies of your data.</li>
                <li><strong>The right to rectification</strong>: You have the right to request correction of inaccurate data.</li>
                <li><strong>The right to erasure</strong>: You have the right to request that we erase your data under certain conditions.</li>
                <li><strong>The right to restrict processing</strong>: You have the right to object to our processing of your data.</li>
              </ul>
            </section>

            <section className="space-y-3 rounded-lg border border-dashed border-white/10 bg-black/40 p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono">
                6. Consent
              </h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its Terms and
                Conditions.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
