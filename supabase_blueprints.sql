-- ==============================================================================
-- THE BLUEPRINT VAULT: SUPABASE DATABASE MIGRATION SCRIPT
-- ==============================================================================
-- Run this script in your Supabase SQL Editor to support the Universal
-- Digital Products & Blueprints showcase with Row Level Security (RLS).
-- ==============================================================================

-- 1. Create table public.blueprints
create table if not exists public.blueprints (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  summary text not null,
  description text default '',
  category text not null,                     -- 'Starters & Code', 'AI & Agents', 'Architecture & Guides', 'Tools & Utilities', 'Advisory & Services'
  platform text not null default 'Gumroad',   -- 'Gumroad', 'Lynk.id', 'LemonSqueezy', 'GitHub', 'Cal.com', 'Custom'
  badge text default null,                    -- 'FEATURED', 'NEW', 'BESTSELLER', 'OPEN SOURCE', 'POPULAR'
  price_display text not null default 'Free', -- e.g. '$29', 'Rp 149.000', 'Free', 'Pay What You Want'
  purchase_url text not null,                 -- External checkout or booking URL (Gumroad, Lynk.id, etc.)
  preview_url text default null,              -- Optional live demo URL
  cover_image text not null,                  -- Image URL or Supabase storage path
  tech_stack text[] default '{}',             -- e.g. ['Next.js 16', 'Supabase', 'Tailwind']
  highlights text[] default '{}',             -- Key feature bullet points
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Indexes for performant filtering and sorting
create index if not exists idx_blueprints_slug on public.blueprints(slug);
create index if not exists idx_blueprints_category on public.blueprints(category);
create index if not exists idx_blueprints_published on public.blueprints(is_published);
create index if not exists idx_blueprints_sort_order on public.blueprints(sort_order asc, created_at desc);

-- 3. Row Level Security (RLS)
alter table public.blueprints enable row level security;

-- Policy A: Anyone (including unauthenticated public visitors) can read published blueprints
create policy "Public can view published blueprints"
  on public.blueprints
  for select
  using (is_published = true);

-- Policy B: Authenticated admin users can view all blueprints (including drafts)
create policy "Authenticated users can view all blueprints"
  on public.blueprints
  for select
  to authenticated
  using (true);

-- Policy C: Authenticated admin users have full write access (insert, update, delete)
create policy "Authenticated users can insert blueprints"
  on public.blueprints
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update blueprints"
  on public.blueprints
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete blueprints"
  on public.blueprints
  for delete
  to authenticated
  using (true);

-- ==============================================================================
-- 4. Initial Seed Data (Optional sample data for quick start)
-- ==============================================================================
insert into public.blueprints (
  title,
  slug,
  summary,
  description,
  category,
  platform,
  badge,
  price_display,
  purchase_url,
  preview_url,
  cover_image,
  tech_stack,
  highlights,
  sort_order,
  is_published
) values
(
  'Stitch Portfolio & CMS Boilerplate',
  'stitch-portfolio-cms-boilerplate',
  'A high-craft virtual scroll portfolio and backoffice CMS template built with Next.js 16, Supabase, and Tailwind CSS in the Stitch Blueprint design system.',
  'Complete production-ready codebase featuring fixed-deck virtual scroll UI, rich WYSIWYG article editor, visitor analytics engine with live SVG charts, and full SEO metadata.',
  'Starters & Code',
  'Gumroad',
  'FEATURED',
  '$29',
  'https://gumroad.com',
  'https://laildev.vercel.app',
  '/assets/images/categories/engineering.jpg',
  array['Next.js 16', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
  array['Fixed-Deck Virtual Scroll Engine', 'Integrated Markdown & WYSIWYG CMS', 'Live Telemetry & SVG Chart Analytics', 'Supabase RLS & Storage Ready'],
  1,
  true
),
(
  'Hermes AI Agent Production Skills Pack',
  'hermes-ai-agent-skills-pack',
  'Curated automation skills, tool definitions, and system prompts designed for autonomous developer agents and self-hosted LLM assistants.',
  'Plug-and-play skills module for Hermes Agent. Includes deep codebase exploration tools, automated code refactoring, Git commit generators, and multi-model fallbacks.',
  'AI & Agents',
  'Gumroad',
  'POPULAR',
  '$19',
  'https://gumroad.com',
  'https://laildev.vercel.app/hermes',
  '/assets/images/categories/ai-ml.jpg',
  array['Python', 'Node.js', 'LLM Agents', 'Hermes CLI', 'Function Calling'],
  array['15+ Pre-configured Autonomous Skills', 'Docker Self-Hosting Orchestration', 'Multi-Provider Fallback (Anthropic/OpenAI/Ollama)', 'Zero Latency Memory Hooks'],
  2,
  true
),
(
  'High-Scale Microservices & Docker Runbook',
  'high-scale-microservices-runbook',
  'Battle-tested architecture blueprints, Docker Swarm / Compose stacks, and caching topologies for scaling backend services to 100k+ RPM.',
  'An in-depth engineering blueprint and production runbook detailing API gateway routing, Redis tiered caching, PostgreSQL sharding strategies, and telemetry monitoring setups.',
  'Architecture & Guides',
  'Gumroad',
  'BESTSELLER',
  '$15',
  'https://gumroad.com',
  null,
  '/assets/images/categories/architecture.jpg',
  array['Architecture', 'Docker', 'Redis', 'PostgreSQL', 'API Gateway'],
  array['Comprehensive Architecture Diagrams', 'Production-ready docker-compose.yml', 'Zero-Downtime Deployment Blueprints', 'Database Query Optimization Guide'],
  3,
  true
),
(
  '1-on-1 System Architecture & Code Audit',
  '1on1-system-architecture-code-audit',
  '60-minute intensive advisory session to review your application architecture, identify performance bottlenecks, and map out scalable roadmaps.',
  'Direct 1-on-1 technical consultation with Faris Rizqilail. We will analyze your system design, review high-risk database queries, and provide an actionable optimization roadmap.',
  'Advisory & Services',
  'Cal.com',
  'LIMITED',
  'Rp 750.000',
  'https://cal.com',
  null,
  '/assets/images/categories/leadership.jpg',
  array['Architecture Review', 'Code Audit', 'Performance Optimization', '1-on-1 Advisory'],
  array['60-minute Video Call via Google Meet', 'Written Technical Findings Report', 'Priority Actionable Recommendations', 'Follow-up Async Q&A for 7 Days'],
  4,
  true
)
on conflict (slug) do nothing;
