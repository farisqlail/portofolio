import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check, ChevronRight, Cpu } from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  input: string;
  thinking: string;
  output: {
    title: string;
    details: string[];
    metrics?: string;
  };
}

const pipelineData: PipelineStep[] = [
  {
    id: "profile",
    name: "01 // Identity",
    input: "faris.getProfile()",
    thinking: "Resolving background from LailDev & engineering trajectory...",
    output: {
      title: "Faris Rizqilail — Software Engineer & Founder",
      details: [
        "Founder of @LailDev digital engineering agency",
        "Product Lead at InterActive Technologies Corp",
        "Ex-Kominfo RI & Telkom Indonesia Amoeba engineer",
      ],
      metrics: "7+ Years Active Production",
    },
  },
  {
    id: "stack",
    name: "02 // Tech Stack",
    input: "faris.getCapabilities()",
    thinking: "Compiling verified production framework proficiencies...",
    output: {
      title: "Full-Stack & Cloud Architecture",
      details: [
        "Frontend: React, Next.js 16, TypeScript, Tailwind CSS, Vue",
        "Backend: Node.js, Laravel, PHP, REST APIs, Microservices",
        "Database: PostgreSQL, MySQL, Supabase, Redis",
        "Mobile: React Native, iOS, Android PWAs",
      ],
      metrics: "9+ Production Deployments",
    },
  },
  {
    id: "philosophy",
    name: "03 // Philosophy",
    input: "faris.getExecutionPrinciples()",
    thinking: "Analyzing software delivery & engineering methodology...",
    output: {
      title: "Taste + Scalability + Speed",
      details: [
        "Code with taste: pixel-level UX elegance + rigorous typed backend",
        "Zero-bloat architecture: built to withstand scale without unnecessary complexity",
        "Owner mindset: connecting code commits directly to business revenue",
      ],
      metrics: "100% On-Time Delivery",
    },
  },
];

export default function TerminalDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [keyCounter, setKeyCounter] = useState(0);

  const current = pipelineData[activeTab];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
    }, 350);
  };

  const handleReplay = () => {
    setIsThinking(true);
    setKeyCounter((prev) => prev + 1);
    setTimeout(() => {
      setIsThinking(false);
    }, 350);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Tabs Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/80 pb-4 gap-3">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Developer Evaluation Pipeline
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Click tabs below to inspect capabilities and principles in real-time.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {pipelineData.map((step, i) => (
            <button
              key={step.id}
              onClick={() => handleTabChange(i)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-all ${
                activeTab === i
                  ? "bg-white text-black font-bold shadow-sm"
                  : "bg-surface-light text-zinc-400 hover:text-white border border-border"
              }`}
            >
              {step.name}
            </button>
          ))}

          <button
            onClick={handleReplay}
            title="Replay Execution"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-light text-zinc-400 hover:text-white transition-colors ml-1"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* 3-Tier Grid Stream */}
      <div className="rounded-xl border border-border bg-black/80 overflow-hidden font-mono text-xs divide-y divide-border">
        {/* Step 1: Input */}
        <div className="flex items-start sm:items-center gap-4 px-6 py-4 bg-black/40">
          <span className="shrink-0 rounded border border-border bg-surface px-2 py-0.5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            [ Input ]
          </span>
          <div className="flex items-center gap-2 text-zinc-300">
            <ChevronRight size={14} className="text-[#C7B8F5]" />
            <span className="text-white font-medium">{current.input}</span>
          </div>
        </div>

        {/* Step 2: Thinking */}
        <div className="flex items-start sm:items-center gap-4 px-6 py-4 bg-black/20">
          <span className="shrink-0 rounded border border-border bg-surface px-2 py-0.5 text-[10px] text-[#C7B8F5] font-bold uppercase tracking-wider flex items-center gap-1">
            <Cpu size={10} className={isThinking ? "animate-spin text-emerald-400" : ""} />
            [ Thinking ]
          </span>
          <p className="animate-shimmer text-zinc-300 font-normal">
            {current.thinking}
          </p>
        </div>

        {/* Step 3: Output */}
        <div className="p-6 bg-surface-light/40">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded border border-border bg-black px-2 py-0.5 text-[10px] text-[#A7EADC] font-bold uppercase tracking-wider flex items-center gap-1">
              <Check size={10} />
              [ Output Result ]
            </span>
            {current.output.metrics && (
              <span className="font-mono text-[11px] text-zinc-500">
                Status: <span className="text-zinc-300">{current.output.metrics}</span>
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.id}-${keyCounter}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <h4 className="text-base font-sans font-bold text-white tracking-tight">
                {current.output.title}
              </h4>

              <div className="space-y-2 pl-3 border-l border-border">
                {current.output.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-zinc-300 font-sans text-sm">
                    <span className="text-[#F3B5D2] shrink-0 mt-0.5">✦</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
