import type { LucideIcon } from "lucide-react";
import { Brain, Sparkles, Globe, Gamepad2 } from "lucide-react";

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  href: string;
}

export const experiments: Experiment[] = [
  {
    slug: "ai-code-review-assistant",
    title: "AI Code Review Assistant",
    description:
      "Fullstack AI tool that automatically analyzes code for bugs, security vulnerabilities, and best practices. React + Express frontend/backend proxying Llama 3.3 70B via Groq API with real-time streaming results.",
    category: "AI / Code Tools",
    icon: Brain,
    href: "https://github.com/farisqlail/review-code-ai",
  },
  {
    slug: "simple-wallet-web3",
    title: "Simple Wallet Web3",
    description:
      "Web3 wallet app with Solidity smart contract backend. Handles cryptocurrency transactions and interactions with Ethereum-compatible networks via a JavaScript frontend.",
    category: "Web3 / Blockchain",
    icon: Globe,
    href: "https://github.com/farisqlail/simple-wallet-web3",
  },
  {
    slug: "ai-agents-mini-startup",
    title: "AI Agents Mini Startup",
    description:
      "Collaborative AI platform with four specialized agents (PM, CTO, Developer, QA) powered by Llama 3.3 70B. Input a project brief — agents autonomously design architecture, write code, and run QA. Export as docs or source code.",
    category: "AI / Multi-Agent",
    icon: Sparkles,
    href: "https://github.com/farisqlail/ai-agents-mini-startup",
  },
  {
    slug: "brongwood-game",
    title: "Brongwood Game",
    description:
      "A cozy pixel RPG about healing, connection, and finding meaning in a quiet town. Built with TypeScript, focused on intimate narrative and community relationships.",
    category: "Game Dev",
    icon: Gamepad2,
    href: "https://github.com/farisqlail/Brongwood-game",
  },
];

export function getExperimentBySlug(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}
