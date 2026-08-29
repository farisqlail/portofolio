import type { LucideIcon } from "lucide-react";
import { Brain, Sparkles, Globe, Gamepad2, Bot } from "lucide-react";

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  image: string;
  techStack: string[];
  highlights: string[];
  icon: LucideIcon;
  href: string;
  landingHref?: string;
}

export const experiments: Experiment[] = [
  {
    slug: "lail-hermes-agent",
    title: "Lail Hermes",
    description:
      "Hermes is an autonomous AI developer, UI/UX designer, and task orchestrator for Windows, unifying Claude Code CLI, Antigravity, and Google Stitch MCP under one interface controlled via Telegram, web dashboard, or voice. Its Brain Layer routes chat, plans steps, and recalls semantic memory (RAG over an Obsidian vault) while Autonomous Engines run a dynamic cron scheduler, a Sentinel QA watchdog that detects code changes and reruns tests, and proactive routines like daily briefs and folder watching. Failures are classified before retry (rate limits, missing binaries, impossible plans, semantic errors) and repaired in bounded self-correction loops with a per-task spending cap. It builds APKs with automatic project-type detection (Flutter/React Native/Android), runs headless Playwright tests and Android emulator checks via adb, and does local object detection with TensorFlow.js coco-ssd. As a Windows tray app it supports global hotkeys, wake-word activation, and direct mic/camera access, with risky operations like git pushes or deletions gated behind explicit Telegram confirmation.",
    summary:
      "Autonomous AI developer, designer, and task orchestrator for Windows that unifies Claude Code, Antigravity, and Stitch MCP behind a Telegram/web/voice interface with self-scheduling agents and QA watchdogs.",
    category: "AI / Agent Orchestration",
    image: "/assets/images/lab/hermes/01-dashboard.png",
    techStack: ["Python 3.11+", "React", "Three.js", "SQLite", "Obsidian RAG", "Claude Code CLI", "faster-whisper", "edge-tts", "Playwright"],
    highlights: [
      "Multi-channel control via Telegram bot, web dashboard, and voice (STT/TTS) with wake-word activation",
      "Orchestrates Claude Code, Antigravity, and Stitch MCP with NVIDIA NIM/DeepSeek for planning",
      "Autonomous cron scheduler + Sentinel QA watchdog that detects changes and reruns tests",
      "Semantic memory via Obsidian vault RAG, with failure-classified retry and bounded repair loops",
      "APK builds with Flutter/React Native/Android auto-detection, Playwright + adb emulator testing",
    ],
    icon: Bot,
    href: "https://github.com/farisqlail/lail-hermes-agent",
    landingHref: "/hermes",
  },
  {
    slug: "ai-code-review-assistant",
    title: "AI Code Review Assistant",
    description:
      "Full-stack code analysis tool checking for bugs, security vulnerabilities, and adherence to style standards. React and Express backend proxying Llama 3.3 70B via Groq API with real-time SSE streaming.",
    summary:
      "Automated code review engine that inspects repositories for security vulnerabilities, syntax issues, and performance bottlenecks in real time using Llama 3.3 on Groq.",
    category: "AI / Code Tools",
    image: "/assets/images/lab/ai-code-review.jpg",
    techStack: ["React", "Express.js", "Llama 3.3 70B", "Groq API", "Tailwind CSS"],
    highlights: [
      "Real-time Server-Sent Events (SSE) streaming analysis",
      "Automated CVSS security vulnerability scoring",
      "Inline syntax and logic bug detection with fix suggestions",
    ],
    icon: Brain,
    href: "https://github.com/farisqlail/review-code-ai",
  },
  {
    slug: "simple-wallet-web3",
    title: "Simple Wallet Web3",
    description:
      "Web3 wallet application with Solidity smart contracts. Executes token transfers and account balance queries on EVM-compatible testnets via a JavaScript frontend.",
    summary:
      "Decentralized crypto wallet application for managing token balances and signing smart contract transactions on EVM-compatible testnets.",
    category: "Web3 / Blockchain",
    image: "/assets/images/lab/simple-wallet.jpg",
    techStack: ["Solidity", "Ethers.js", "React", "Hardhat", "Ethereum Testnet"],
    highlights: [
      "Direct smart contract interactions for ERC-20 & ETH transfers",
      "Real-time balance tracking and transaction confirmation statuses",
      "Lightweight non-custodial wallet architecture",
    ],
    icon: Globe,
    href: "https://github.com/farisqlail/simple-wallet-web3",
  },
  {
    slug: "ai-agents-mini-startup",
    title: "AI Agents Mini Startup",
    description:
      "Multi-agent system with four roles (PM, CTO, Developer, QA) powered by Llama 3.3 70B. Input a project brief, and agents generate architectural specs, source code, and test cases.",
    summary:
      "Autonomous multi-agent collaboration platform where four specialized AI roles design, architect, code, and test software from a single project brief.",
    category: "AI / Multi-Agent",
    image: "/assets/images/lab/ai-agents.jpg",
    techStack: ["Node.js", "Llama 3.3 70B", "Groq API", "React", "WebSocket"],
    highlights: [
      "4 specialized agents: Product Manager, CTO, Developer, QA Engineer",
      "Sequential and event-driven multi-agent message routing",
      "Direct export of generated project documentation and source repositories",
    ],
    icon: Sparkles,
    href: "https://github.com/farisqlail/ai-agents-mini-startup",
  },
  {
    slug: "brongwood-game",
    title: "Brongwood Game",
    description:
      "Pixel RPG built in TypeScript and HTML5 Canvas. Includes dialogue state machines, quest tracking, and custom sprite rendering routines.",
    summary:
      "Cozy 16-bit retro pixel RPG built from scratch in TypeScript with custom tilemaps, dialogue engines, and inventory management.",
    category: "Game Dev",
    image: "/assets/images/lab/brongwood.jpg",
    techStack: ["TypeScript", "HTML5 Canvas", "Web Audio API", "Tilemap Engine"],
    highlights: [
      "Custom 60 FPS 2D canvas game loop and sprite animation system",
      "Branching NPC dialogue state trees and quest progress tracking",
      "Grid-based collision detection and audio soundscape management",
    ],
    icon: Gamepad2,
    href: "https://github.com/farisqlail/Brongwood-game",
  },
];

export function getExperimentBySlug(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}
