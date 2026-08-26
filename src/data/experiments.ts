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
      "Full-stack code analysis tool checking for bugs, security vulnerabilities, and adherence to style standards. React and Express backend proxying Llama 3.3 70B via Groq API with real-time SSE streaming.",
    category: "AI / Code Tools",
    icon: Brain,
    href: "https://github.com/farisqlail/review-code-ai",
  },
  {
    slug: "simple-wallet-web3",
    title: "Simple Wallet Web3",
    description:
      "Web3 wallet application with Solidity smart contracts. Executes token transfers and account balance queries on EVM-compatible testnets via a JavaScript frontend.",
    category: "Web3 / Blockchain",
    icon: Globe,
    href: "https://github.com/farisqlail/simple-wallet-web3",
  },
  {
    slug: "ai-agents-mini-startup",
    title: "AI Agents Mini Startup",
    description:
      "Multi-agent system with four roles (PM, CTO, Developer, QA) powered by Llama 3.3 70B. Input a project brief, and agents generate architectural specs, source code, and test cases.",
    category: "AI / Multi-Agent",
    icon: Sparkles,
    href: "https://github.com/farisqlail/ai-agents-mini-startup",
  },
  {
    slug: "brongwood-game",
    title: "Brongwood Game",
    description:
      "Pixel RPG built in TypeScript and HTML5 Canvas. Includes dialogue state machines, quest tracking, and custom sprite rendering routines.",
    category: "Game Dev",
    icon: Gamepad2,
    href: "https://github.com/farisqlail/Brongwood-game",
  },
];

export function getExperimentBySlug(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}
