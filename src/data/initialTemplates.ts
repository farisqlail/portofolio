import type { Template } from "@/types/template";

export const initialTemplates: Template[] = [
  {
    id: "template-portfolio-deck",
    title: "Minimalist Fixed-Deck Portfolio",
    description:
      "A high-craft virtual scroll portfolio template built with Next.js 16, Framer Motion, and Tailwind CSS. Features GPU ambient grid beams and macOS window details.",
    price: "$29",
    gumroad_url: "https://gumroad.com",
    preview_url: "https://laildev.vercel.app",
    image_url: "/assets/images/faris-hero-2.png",
    tags: ["Next.js 16", "Tailwind CSS", "Framer Motion", "TypeScript"],
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "template-saas-dashboard",
    title: "Apex SaaS Analytics & Backoffice",
    description:
      "Dark-mode enterprise SaaS dashboard template with realtime data visualization, responsive sidebar navigation, Supabase-ready auth and database models.",
    price: "$39",
    gumroad_url: "https://gumroad.com",
    preview_url: "https://laildev.vercel.app/lab/ai-agents-mini-startup",
    image_url: "/assets/images/faris-hero-2.png",
    tags: ["React 19", "Supabase", "Tailwind CSS", "Recharts"],
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "template-ai-review-tool",
    title: "Omni AI Code Review & Workflow UI",
    description:
      "Turnkey frontend template for developer AI products. Includes code snippet diffing, streaming markdown chat, and terminal diagnostics.",
    price: "$24",
    gumroad_url: "https://gumroad.com",
    preview_url: "https://laildev.vercel.app/lab/ai-code-review-assistant",
    image_url: "/assets/images/faris-hero-2.png",
    tags: ["Next.js", "AI Prompts", "TypeScript", "Tailwind"],
    featured: false,
    created_at: new Date().toISOString(),
  },
];
