import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { ArrowLeft, CheckCircle2, Download, FileArchive, GitFork } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";
const REPO_URL = "https://github.com/farisqlail/lail-hermes-agent";

const driveDownload = (fileId: string) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;

const releases = [
  {
    version: "0.0.1",
    latest: true,
    notes: "Initial public build. Windows tray app with Telegram, web dashboard, and voice control.",
    artifacts: [
      {
        label: "Installer (.exe)",
        detail: "Single-file installer, guided setup",
        href: driveDownload("1Oyb6_G7iAXv13Nbu1RBC14HFVGc6Y08Q"),
      },
      {
        label: "Setup Package",
        detail: "Full setup bundle",
        href: driveDownload("1ZrZK5lU2hpUrkToT_vZVT0s0PAb7lMmu"),
      },
    ],
  },
];

export default function HermesDownloads() {
  const pageUrl = `${SITE_URL}hermes/downloads`;
  const description = "Download Lail Hermes for Windows — installer and setup builds, versioned releases.";

  return (
    <>
      <Head>
        <title>Downloads · Lail Hermes</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Downloads · Lail Hermes" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}assets/images/lab/hermes/01-dashboard.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top bar */}
        <header className="relative z-10 border-b border-dashed border-white/15 bg-black/60 backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              href="/hermes"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white border border-dashed border-white/20 rounded-md px-3 py-1.5 bg-black/40 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>[ BACK TO HERMES ]</span>
            </Link>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-[#FF5500] transition-colors"
            >
              <GitFork size={14} />
              <span className="hidden sm:inline">[ SOURCE ]</span>
            </a>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pt-14 sm:pt-20 pb-24 space-y-10">
          {/* Hero */}
          <section className="space-y-4 text-center">
            <div className="relative mx-auto h-14 sm:h-16 w-full max-w-[220px] sm:max-w-xs">
              <Image
                src="/assets/images/lab/hermes/logo-landscape.png"
                alt="Lail Hermes logo"
                fill
                priority
                sizes="(max-width: 640px) 200px, 320px"
                className="object-contain"
              />
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Downloads
            </h1>
            <p className="mx-auto max-w-xl text-sm text-zinc-400 leading-relaxed font-sans">
              Windows builds of Lail Hermes. Pick the installer for a guided setup, or the setup package
              for a full manual install.
            </p>
          </section>

          {/* Release notice */}
          <div className="rounded-lg border border-dashed border-[#A3E635]/40 bg-[#A3E635]/5 px-4 py-3 font-mono text-[11px] text-zinc-300 text-center">
            Files are hosted on Google Drive. Drive may show a virus-scan warning on large files —
            choose &ldquo;download anyway&rdquo; to continue.
          </div>

          {/* Releases */}
          <section className="space-y-5">
            {releases.map((release) => (
              <div
                key={release.version}
                className="rounded-2xl border border-dashed border-white/20 bg-[#0c0c12]/95 p-6 sm:p-8 space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-white/15 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-lg sm:text-xl font-bold text-white">
                      v{release.version}
                    </span>
                    {release.latest && (
                      <span className="rounded border border-[#FF5500]/40 bg-[#FF5500]/10 px-2 py-0.5 font-mono text-[10px] text-[#FF5500] font-bold">
                        LATEST
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    WINDOWS x64
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {release.notes}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {release.artifacts.map((artifact) => (
                    <a
                      key={artifact.label}
                      href={artifact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-black/50 p-4 hover:border-[#FF5500]/60 hover:bg-[#FF5500]/5 transition-all"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <FileArchive size={18} className="text-[#A3E635] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white group-hover:text-[#FF5500] transition-colors">
                            {artifact.label}
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate">{artifact.detail}</p>
                        </div>
                      </div>
                      <Download
                        size={16}
                        className="text-zinc-400 shrink-0 group-hover:text-[#FF5500] transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* What you get */}
          <section className="rounded-xl border border-dashed border-white/15 bg-black/50 p-5 sm:p-6 space-y-3">
            <div className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider border-b border-dashed border-white/10 pb-2.5">
              [ BEFORE YOU INSTALL ]
            </div>
            <ul className="space-y-2 pt-1">
              {[
                "Requires Windows 10/11 x64",
                "Claude Code CLI and Antigravity CLI should be installed for full agent orchestration",
                "Optional: Python 3.11+ and Node.js 20+ if running from source instead of the installer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 size={12} className="text-[#A3E635] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
