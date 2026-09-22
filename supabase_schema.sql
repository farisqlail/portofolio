-- ==============================================================================
-- SUPABASE SCHEMA & POLICIES FOR FARIS RIZQILAIL PORTFOLIO BLOG & CMS
-- ==============================================================================

-- 1. Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    category TEXT NOT NULL DEFAULT 'Engineering',
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    view_count INTEGER NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy A: Public can read published posts
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts" 
ON public.posts 
FOR SELECT 
USING (status = 'published');

-- Policy B: Authenticated admin users have full access (CRUD)
DROP POLICY IF EXISTS "Admin full access" ON public.posts;
CREATE POLICY "Admin full access" 
ON public.posts 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Stored Procedure (RPC) to increment view counts securely from public visitors
CREATE OR REPLACE FUNCTION public.increment_post_views(post_slug TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.posts
    SET view_count = view_count + 1
    WHERE slug = post_slug;
END;
$$;

-- 4. Storage Bucket Setup (Run in Supabase Dashboard or SQL)
-- Create bucket 'blog-assets' for cover images & article attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-assets', 'blog-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public Read Access
DROP POLICY IF EXISTS "Public Read blog-assets" ON storage.objects;
CREATE POLICY "Public Read blog-assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-assets');

-- Storage Policy: Authenticated Upload Access
DROP POLICY IF EXISTS "Admin Upload blog-assets" ON storage.objects;
CREATE POLICY "Admin Upload blog-assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-assets');

-- 5. Optional Initial Seed Data
INSERT INTO public.posts (title, slug, excerpt, content, cover_image, category, tags, status, view_count, published_at)
VALUES 
(
  'Building Resilient Microservices with Laravel & Node.js',
  'building-resilient-microservices-laravel-nodejs',
  'A deep dive into high-throughput API design, asynchronous queue orchestration with Redis, and hybrid polyglot backend architecture.',
  '## Architecture Overview\n\nWhen architecting scalable applications, decoupling computation-heavy jobs from synchronous request lifecycles is critical...',
  '/assets/images/lab/ai-code-review.jpg',
  'Architecture',
  ARRAY['Laravel', 'Node.js', 'Redis', 'Microservices'],
  'published',
  342,
  NOW()
),
(
  'Next.js 16 & Turbopack: Performance Benchmarks in Production',
  'nextjs-16-turbopack-performance-deep-dive',
  'Analyzing build times, static generation efficiency, and bundle optimization in Next.js 16 with Turbopack and React 19.',
  '## The Evolution of Frontend Tooling\n\nWith the release of Next.js 16 and Turbopack as the default bundler, build latency has reduced dramatically...',
  '/assets/images/lab/ai-agents.jpg',
  'Engineering',
  ARRAY['Next.js', 'React 19', 'Turbopack', 'Performance'],
  'published',
  512,
  NOW()
),
(
  'Orchestrating Autonomous Multi-Agent AI Systems',
  'multi-agent-ai-startup-architecture',
  'How we built a 4-role AI startup pipeline (PM, CTO, Developer, QA) using Llama 3.3 on Groq with event-driven execution.',
  '## The Multi-Agent Paradigm\n\nSingle-prompt LLMs struggle with complex software development tasks because of context bloat...',
  '/assets/images/lab/simple-wallet.jpg',
  'AI & ML',
  ARRAY['AI', 'Multi-Agent', 'Llama 3.3', 'Groq'],
  'published',
  289,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 6. SITE VISITS & TRAFFIC ANALYTICS
-- ==============================================================================

-- Create site_visits table for real-time telemetry and page impressions
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    path TEXT NOT NULL,
    page_type TEXT NOT NULL DEFAULT 'blog_post', -- 'blog_post', 'blog_index', 'home', 'lab', 'hermes'
    title TEXT,
    category TEXT DEFAULT 'Engineering',
    device TEXT DEFAULT 'desktop', -- 'desktop', 'mobile', 'tablet'
    referrer TEXT DEFAULT 'direct',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance indexes for analytics aggregation
CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON public.site_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_path ON public.site_visits(path);
CREATE INDEX IF NOT EXISTS idx_site_visits_category ON public.site_visits(category);
CREATE INDEX IF NOT EXISTS idx_site_visits_device ON public.site_visits(device);

-- Enable RLS
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (anon/authenticated) can record a page visit
DROP POLICY IF EXISTS "Public can log page visits" ON public.site_visits;
CREATE POLICY "Public can log page visits"
ON public.site_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only authenticated admin can query analytics data
DROP POLICY IF EXISTS "Admin can view all visits" ON public.site_visits;
CREATE POLICY "Admin can view all visits"
ON public.site_visits
FOR SELECT
TO authenticated
USING (true);

-- Stored procedure (RPC) for optimized visit logging
CREATE OR REPLACE FUNCTION public.log_site_visit(
    p_path TEXT,
    p_page_type TEXT DEFAULT 'blog_post',
    p_title TEXT DEFAULT NULL,
    p_category TEXT DEFAULT 'Engineering',
    p_device TEXT DEFAULT 'desktop',
    p_referrer TEXT DEFAULT 'direct'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.site_visits (path, page_type, title, category, device, referrer)
    VALUES (p_path, p_page_type, p_title, p_category, p_device, p_referrer);
END;
$$;
