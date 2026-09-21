import { supabase, isSupabaseConfigured } from "./supabaseClient";
import type { BlogPost } from "@/types/blog";

export const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "sample-1",
    title: "Building Resilient Microservices with Laravel & Node.js",
    slug: "building-resilient-microservices-laravel-nodejs",
    excerpt:
      "A deep dive into high-throughput API design, asynchronous queue orchestration with Redis, and hybrid polyglot backend architecture.",
    content: `## Architecture Overview

When architecting scalable applications, decoupling computation-heavy jobs from synchronous request lifecycles is critical. In our production workloads at **LailDev**, we frequently combine **Laravel** for transactional domain models and **Node.js** for high-concurrency event streams.

\`\`\`typescript
// Example: Asynchronous Redis Queue Producer
import { Queue } from "bullmq";

const syncQueue = new Queue("transaction-sync", {
  connection: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: 6379,
  },
});

export async function dispatchEvent(eventName: string, payload: unknown) {
  await syncQueue.add(eventName, payload, {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 },
  });
}
\`\`\`

### Key Architectural Guidelines

1. **Idempotent Handlers**: Guarantee that duplicate webhook deliveries or retry storms do not alter state twice.
2. **Circuit Breakers**: Wrap external downstream dependencies in circuit breakers with reasonable timeouts.
3. **Structured Telemetry**: Correlate every log trace across services using unified \`X-Correlation-ID\` headers.

---

### Database Sharding & Indexing Strategy

Relational databases like PostgreSQL thrive when indexing matches real query patterns:

- Use composite indexes on \`(tenant_id, created_at DESC)\` for multi-tenant feeds.
- Cache hot read paths in Redis with TTLs below 60 seconds.
`,
    cover_image: "/assets/images/lab/ai-code-review.jpg",
    category: "Architecture",
    tags: ["Laravel", "Node.js", "Redis", "Microservices"],
    status: "published",
    view_count: 342,
    published_at: "2026-09-15T08:00:00Z",
    created_at: "2026-09-15T08:00:00Z",
    updated_at: "2026-09-15T08:00:00Z",
  },
  {
    id: "sample-2",
    title: "Next.js 16 & Turbopack: Performance Benchmarks in Production",
    slug: "nextjs-16-turbopack-performance-deep-dive",
    excerpt:
      "Analyzing build times, static generation efficiency, and bundle optimization in Next.js 16 with Turbopack and React 19.",
    content: `## The Evolution of Frontend Tooling

With the release of Next.js 16 and Turbopack as the default bundler, build latency has reduced dramatically across large scale codebases. 

### What Changed in Turbopack?

- **Incremental Graph Evaluation**: Only re-transpile affected modules and dependent AST trees.
- **Fast Static Site Generation (SSG)**: Parallel worker pools generate dynamic paths without memory fragmentation.
- **Turbopack HMR**: Sub-50ms hot reload even across complex Tailwind v4 styling trees.

\`\`\`json
{
  "scripts": {
    "dev": "next dev --port 4000",
    "build": "next build"
  }
}
\`\`\`

### Real-World Benchmark Results

| Metric | Webpack (Next.js 14) | Turbopack (Next.js 16) | Delta |
| :--- | :--- | :--- | :--- |
| **Dev Startup** | 4.2s | 0.8s | **-81%** |
| **Typecheck** | 15.7s | 2.5s | **-84%** |
| **SSG Worker Emit** | 3.1s | 0.5s | **-83%** |

By eliminating dead Three.js boilerplate and streamlining dependencies, our total build pipeline completes in under 3 seconds.
`,
    cover_image: "/assets/images/lab/ai-agents.jpg",
    category: "Engineering",
    tags: ["Next.js", "React 19", "Turbopack", "Performance"],
    status: "published",
    view_count: 512,
    published_at: "2026-09-18T10:30:00Z",
    created_at: "2026-09-18T10:30:00Z",
    updated_at: "2026-09-18T10:30:00Z",
  },
  {
    id: "sample-3",
    title: "Orchestrating Autonomous Multi-Agent AI Systems",
    slug: "multi-agent-ai-startup-architecture",
    excerpt:
      "How we built a 4-role AI startup pipeline (PM, CTO, Developer, QA) using Llama 3.3 on Groq with event-driven execution.",
    content: `## The Multi-Agent Paradigm

Single-prompt LLMs struggle with complex software development tasks because of context bloat and hallucination compounding. By decomposing a single product brief into a collaborative team of role-specific agents, quality increases exponentially.

### The Four Agent Specializations

1. **Product Manager (PMA)**: Translates user briefs into formal specification documents, user stories, and acceptance criteria.
2. **CTO Agent (CTOA)**: Evaluates architecture tradeoffs, database schemas, and API design specifications.
3. **Developer Agent (DEVA)**: Generates type-safe implementation code against the CTO specification.
4. **QA Agent (QAA)**: Writes automated unit tests and integration test suites, verifying against acceptance criteria.

\`\`\`typescript
interface AgentMessage {
  sender: "PM" | "CTO" | "DEV" | "QA";
  recipient: "PM" | "CTO" | "DEV" | "QA" | "HUMAN";
  taskType: "SPEC" | "CODE" | "TEST" | "REVIEW";
  payload: Record<string, unknown>;
}
\`\`\`

### Event Routing & Quality Gates

Each agent produces an immutable artifact that must be validated by the subsequent agent before triggering the next pipeline phase.
`,
    cover_image: "/assets/images/lab/simple-wallet.jpg",
    category: "AI & ML",
    tags: ["AI", "Multi-Agent", "Llama 3.3", "Groq"],
    status: "published",
    view_count: 289,
    published_at: "2026-09-20T14:15:00Z",
    created_at: "2026-09-20T14:15:00Z",
    updated_at: "2026-09-20T14:15:00Z",
  },
];

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return SAMPLE_POSTS;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return SAMPLE_POSTS;
    }

    return data as BlogPost[];
  } catch (err) {
    console.warn("Failed to fetch posts from Supabase, falling back to sample:", err);
    return SAMPLE_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured) {
    return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
    }

    return data as BlogPost;
  } catch (err) {
    return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function incrementPostViews(slug: string): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    await supabase.rpc("increment_post_views", { post_slug: slug });
  } catch {
    // Non-blocking view increment
  }
}
