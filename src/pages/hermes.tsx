import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Download,
  GitFork,
  Globe,
  Mic,
  ScanEye,
  ShieldCheck,
  Smartphone,
  Terminal,
  Workflow,
} from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laildev.vercel.app/";
const REPO_URL = "https://github.com/farisqlail/lail-hermes-agent";

const featureGroups = [
  {
    title: "Multi-Channel Control",
    icon: Mic,
    items: [
      "Telegram bot with inline action buttons and voice note support",
      "Web dashboard at 127.0.0.1:8799",
      "Voice interaction with STT/TTS capabilities",
    ],
  },
  {
    title: "AI Orchestration",
    icon: Cpu,
    items: [
      "Integrates Claude Code CLI and Antigravity for code generation",
      "Google Stitch MCP for UI/UX design with direct project linking",
      "NVIDIA NIM or DeepSeek for planning and decision-making",
    ],
  },
  {
    title: "Autonomous Capabilities",
    icon: Workflow,
    items: [
      "Dynamic background task scheduling with cron support",
      "Sentinel continuous QA watchdog detecting code changes and running tests",
      "Proactive work initiation (daily briefs, folder watching, auto-retry)",
      "Semantic memory via Obsidian vault with RAG-based recall",
    ],
  },
  {
    title: "Quality Assurance",
    icon: ShieldCheck,
    items: [
      "Failure classification before retry (rate limits, missing binaries, impossible plans, semantic errors)",
      "Automatic repair loops for compile errors and test failures",
      "Self-correction with bounded spending caps and no-progress detection",
    ],
  },
  {
    title: "Development Features",
    icon: Terminal,
    items: [
      "APK builds with automatic project-type detection (Flutter/React Native/Android)",
      "Headless browser testing via Playwright",
      "Android emulator testing with adb",
      "Local object detection via TensorFlow.js coco-ssd",
    ],
  },
  {
    title: "Desktop Integration",
    icon: Smartphone,
    items: [
      "Windows native application with system tray icon",
      "Global hotkey support (Alt + Space)",
      "Wake-word activation with trained models",
      "Direct hardware access for microphone and camera",
    ],
  },
];

const architecture = [
  { label: "User Channels", detail: "Telegram, web UI, voice loop, camera vision" },
  { label: "Brain Layer", detail: "Chat router, step planner, semantic memory RAG" },
  { label: "Autonomous Engines", detail: "Dynamic scheduler, QA sentinel, daily briefing" },
  { label: "Execution Tools", detail: "Stitch, Claude, Antigravity, build/test runners" },
  { label: "Persistence", detail: "SQLite database and Obsidian markdown vault" },
];

const techStack = [
  { label: "Backend", value: "Python 3.11+" },
  { label: "Frontend", value: "React web UI, Three.js for 3D office visualization" },
  { label: "Audio", value: "faster-whisper STT, edge-tts TTS, RMS-based VAD" },
  { label: "Testing", value: "Playwright, pytest, Android emulator" },
  { label: "Storage", value: "SQLite, Obsidian markdown files" },
  { label: "Optional Gateway", value: "9Router for local LLM routing" },
];

const requirements = [
  "Python 3.11+",
  "Node.js 20+ with npm",
  "Claude Code CLI and Antigravity CLI",
  "Android SDK (adb/emulator)",
  "Optional: Playwright, faster-whisper, openwakeword, 9Router",
];

const designDecisions = [
  {
    title: "Failure Handling",
    detail: "“Unrecognised errors keep the old behaviour, so an unfamiliar failure gains nothing from a guess.”",
  },
  {
    title: "Memory System",
    detail: "Task failures and facts persist in a queryable semantic vault, enabling intelligent recall of architectural decisions and past solutions.",
  },
  {
    title: "Confirmation Gates",
    detail: "Risky operations (git pushes, file deletions, projects without git undo) require explicit Telegram approval before execution.",
  },
  {
    title: "MCP Integration",
    detail: "Supports pluggable Model Context Protocol servers for filesystem, browser, email, and calendar access with read-gate bypass and write-confirmation safeguards.",
  },
  {
    title: "Budget Controls",
    detail: "Per-task spending cap (default $10 USD) prevents repair loops from becoming cost liabilities.",
  },
];

export default function HermesLanding() {
  const pageUrl = `${SITE_URL}hermes`;
  const description =
    "Hermes is an autonomous AI developer, UI/UX designer, and task orchestrator for Windows, controlled via Telegram, web dashboard, or voice.";

  return (
    <>
      <Head>
        <title>Lail Hermes · Autonomous AI Dev Agent for Windows</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Lail Hermes · Autonomous AI Dev Agent for Windows" />
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
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              href="/?section=experiments"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white border border-dashed border-white/20 rounded-md px-3 py-1.5 bg-black/40 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>[ BACK TO LAB ]</span>
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

        <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-14 sm:pt-20 pb-24 space-y-14 sm:space-y-20">
          {/* Hero */}
          <section className="space-y-6 text-center">
            <div className="relative mx-auto h-16 sm:h-20 w-full max-w-xs sm:max-w-sm">
              <Image
                src="/assets/images/lab/hermes/logo-landscape.png"
                alt="Lail Hermes logo"
                fill
                priority
                sizes="(max-width: 640px) 320px, 384px"
                className="object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 mx-auto rounded-full border border-[#FF5500]/40 bg-[#FF5500]/10 px-3 py-1 font-mono text-[11px] text-[#FF5500] font-bold">
              <Bot size={13} />
              <span>OPEN SOURCE · WINDOWS DESKTOP AGENT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Lail Hermes
            </h1>

            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-300 font-sans">
              An autonomous AI developer, UI/UX designer, and task orchestrator for Windows
              that unifies Claude Code CLI, Antigravity, and Google Stitch MCP under one
              interface &mdash; controlled via Telegram, web dashboard, or voice.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/hermes/downloads"
                className="inline-flex items-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-6 py-3 text-sm font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md"
              >
                <Download size={16} />
                <span>[ DOWNLOAD FOR WINDOWS ]</span>
              </Link>

              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/25 bg-black/40 px-5 py-3 text-sm font-mono text-zinc-300 hover:text-white hover:border-white/40 transition-all"
              >
                <span>[ VIEW ON GITHUB ]</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
            <p className="font-mono text-[11px] text-zinc-500">
              v0.0.1 &mdash; installer and setup builds for Windows.
            </p>
          </section>

          {/* Screenshot */}
          <section className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-dashed border-white/20 bg-zinc-900 shadow-2xl">
              <Image
                src="/assets/images/lab/hermes/01-dashboard.png"
                alt="Lail Hermes web dashboard"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              <span className="absolute top-3 left-3 rounded border border-[#FF5500]/40 bg-black/80 px-2.5 py-0.5 font-mono text-[10px] text-[#FF5500] backdrop-blur-md font-bold">
                [ WEB DASHBOARD ]
              </span>
            </div>
          </section>

          {/* Screenshot Gallery */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-b border-dashed border-white/15 pb-3">
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
                [ INTERFACE GALLERY ]
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { src: "/assets/images/lab/hermes/02-office-mode.png", label: "OFFICE MODE" },
                { src: "/assets/images/lab/hermes/03-settings.png", label: "SETTINGS" },
                { src: "/assets/images/lab/hermes/04-capabilities.png", label: "CAPABILITIES" },
                { src: "/assets/images/lab/hermes/05-messaging.png", label: "MESSAGING" },
                { src: "/assets/images/lab/hermes/06-artifacts.png", label: "ARTIFACTS" },
                { src: "/assets/images/lab/hermes/07-scheduled-jobs.png", label: "SCHEDULED JOBS" },
              ].map((shot) => (
                <div
                  key={shot.src}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-dashed border-white/15 bg-zinc-900 group"
                >
                  <Image
                    src={shot.src}
                    alt={`Lail Hermes ${shot.label.toLowerCase()}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] text-zinc-300 font-bold">
                    {shot.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Core Features */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-b border-dashed border-white/15 pb-3">
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
                [ CORE FEATURES ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-dashed border-white/15 bg-black/50 p-5 space-y-3"
                >
                  <div className="flex items-center gap-2 font-sans text-sm font-bold text-white">
                    <group.icon size={16} className="text-[#FF5500]" />
                    <span>{group.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                        <CheckCircle2 size={12} className="text-[#A3E635] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-b border-dashed border-white/15 pb-3">
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
                [ ARCHITECTURE HIGHLIGHTS ]
              </span>
            </div>

            <div className="rounded-xl border border-dashed border-white/15 bg-black/50 p-5 space-y-3">
              {architecture.map((row, idx) => (
                <div key={row.label} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="font-mono text-[#FF5500] font-bold shrink-0">{idx + 1}.</span>
                  <div>
                    <span className="font-bold text-white">{row.label}</span>
                    <span className="text-zinc-400">: {row.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-dashed border-white/15 bg-black/70 p-4 font-mono text-[11px] text-zinc-400 overflow-x-auto">
              <pre className="whitespace-pre">{`%HERMES_HOME%\\         # Runtime data (config, projects, artifacts)
<repo>\\                # Application code (hermes/, tests/, deploy/)`}</pre>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-b border-dashed border-white/15 pb-3">
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider">
                [ TECHNICAL STACK ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techStack.map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg border border-dashed border-white/15 bg-black/50 p-3.5 flex items-start gap-3"
                >
                  <Database size={14} className="text-[#A3E635] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">{row.label}</p>
                    <p className="text-xs text-zinc-300 mt-0.5">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements + Design Decisions */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 rounded-xl border border-dashed border-white/15 bg-black/50 p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF5500] font-bold uppercase tracking-wider border-b border-dashed border-white/10 pb-2.5">
                <Globe size={14} />
                <span>[ INSTALLATION REQUIREMENTS ]</span>
              </div>
              <ul className="space-y-2 pt-1">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={12} className="text-[#A3E635] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-7 rounded-xl border border-dashed border-white/15 bg-black/50 p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#A3E635] font-bold uppercase tracking-wider border-b border-dashed border-white/10 pb-2.5">
                <ScanEye size={14} />
                <span>[ NOTABLE DESIGN DECISIONS ]</span>
              </div>
              <div className="space-y-3 pt-1">
                {designDecisions.map((d) => (
                  <div key={d.title}>
                    <p className="text-xs font-bold text-white">{d.title}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="rounded-2xl border border-dashed border-white/20 bg-[#0c0c12]/95 p-8 sm:p-10 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Run Hermes on your own machine.</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Free and open source. Clone the repo, or grab the Windows build (v0.0.1).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/hermes/downloads"
                className="inline-flex items-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-6 py-3 text-sm font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md"
              >
                <Download size={16} />
                <span>[ DOWNLOAD FOR WINDOWS ]</span>
              </Link>
              <Link
                href="/?section=experiments"
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
              >
                [ &larr; BACK TO LAB ]
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
