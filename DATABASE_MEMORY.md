# Supabase Database Architecture & Schema Memory

This document serves as the permanent memory and single source of truth for the Supabase database schema, tables, RPCs, storage buckets, and Row Level Security (RLS) policies used across Faris Rizqilail's portfolio, blog CMS, Blueprint Vault, and visitor telemetry systems.

---

## 1. Environment Configuration

The application communicates with Supabase via `@supabase/supabase-js` configured in `src/lib/supabaseClient.ts`:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project HTTPS URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anon key for client-side queries and RLS-enforced operations.
- `SUPABASE_SERVICE_ROLE_KEY` *(optional)*: Server-side elevated privileges.

---

## 2. Table Specifications

### 2.1 `public.posts` (Engineering Blog & CMS)
Stores all published and draft technical articles, metadata, cover images, and view counters.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique article ID |
| `title` | `TEXT` | `NOT NULL` | Article headline |
| `slug` | `TEXT` | `NOT NULL UNIQUE` | SEO-friendly URL slug |
| `excerpt` | `TEXT` | `NOT NULL` | Short summary for cards and meta tags |
| `content` | `TEXT` | `NOT NULL` | HTML / Markdown article body |
| `cover_image` | `TEXT` | `DEFAULT NULL` | Storage URL or external cover image |
| `category` | `TEXT` | `NOT NULL DEFAULT 'Engineering'` | Topic ('Engineering', 'Architecture', 'AI & ML', etc.) |
| `tags` | `TEXT[]` | `DEFAULT '{}'` | Array of technology keyword tags |
| `status` | `TEXT` | `NOT NULL DEFAULT 'draft'` | Status: `'draft'` or `'published'` |
| `view_count` | `INTEGER` | `NOT NULL DEFAULT 0` | Total reader impressions |
| `published_at`| `TIMESTAMPTZ` | `DEFAULT NULL` | Publication timestamp |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Last edit timestamp |
| `author_id` | `UUID` | `REFERENCES auth.users(id)` | Author account linkage |

**Indexes**:
- `idx_posts_slug` on `slug`
- `idx_posts_status` on `status`
- `idx_posts_category` on `category`
- `idx_posts_published_at` on `published_at DESC`

**RLS Policies**:
- `Public can view published posts`: `FOR SELECT USING (status = 'published')`
- `Admin full access`: `FOR ALL TO authenticated USING (true) WITH CHECK (true)`

---

### 2.2 `public.blueprints` (Universal Digital Products & Blueprint Vault)
Powers `/blueprints` and `/admin/blueprints` for digital products, boilerplates, skills, guides, and consultation services.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique product ID |
| `title` | `TEXT` | `NOT NULL` | Product name |
| `slug` | `TEXT` | `NOT NULL UNIQUE` | Unique URL identifier |
| `summary` | `TEXT` | `NOT NULL` | One-sentence punchy summary |
| `description` | `TEXT` | `DEFAULT ''` | Comprehensive product description |
| `category` | `TEXT` | `NOT NULL` | `'Starters & Code'`, `'AI & Agents'`, `'Architecture & Guides'`, `'Tools & Utilities'`, `'Advisory & Services'` |
| `platform` | `TEXT` | `NOT NULL DEFAULT 'Gumroad'` | `'Gumroad'`, `'Lynk.id'`, `'LemonSqueezy'`, `'GitHub'`, `'Cal.com'`, `'Custom'` |
| `badge` | `TEXT` | `DEFAULT NULL` | `'FEATURED'`, `'NEW'`, `'BESTSELLER'`, `'OPEN SOURCE'`, `'POPULAR'`, `'LIMITED'` |
| `price_display`| `TEXT` | `NOT NULL DEFAULT 'Free'` | Price text (e.g. `'$29'`, `'Rp 149.000'`, `'Free'`) |
| `purchase_url` | `TEXT` | `NOT NULL` | External checkout / booking URL |
| `preview_url` | `TEXT` | `DEFAULT NULL` | Optional live demo or documentation URL |
| `cover_image` | `TEXT` | `NOT NULL` | Preview image URL (Supabase storage or CDN) |
| `tech_stack` | `TEXT[]` | `DEFAULT '{}'` | Array of technology tags |
| `highlights` | `TEXT[]` | `DEFAULT '{}'` | Bullet point value propositions |
| `sort_order` | `INTEGER` | `DEFAULT 0` | Priority order in catalog |
| `is_published` | `BOOLEAN` | `DEFAULT true` | Visibility toggle |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Last update timestamp |

**Indexes**:
- `idx_blueprints_slug` on `slug`
- `idx_blueprints_category` on `category`
- `idx_blueprints_published` on `is_published`
- `idx_blueprints_sort_order` on `(sort_order ASC, created_at DESC)`

**RLS Policies**:
- `Public can view published blueprints`: `FOR SELECT USING (is_published = true)`
- `Authenticated users can view all blueprints`: `FOR SELECT TO authenticated USING (true)`
- `Authenticated users can insert/update/delete blueprints`: `FOR ALL TO authenticated USING (true)`

---

### 2.3 `public.site_visits` (Real-Time Telemetry & Visitor Analytics)
Collects privacy-friendly page visit telemetry rendered on `/admin/analytics`.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique log event ID |
| `path` | `TEXT` | `NOT NULL` | Page path (e.g. `'/blog/my-post'`, `'/blueprints'`) |
| `page_type` | `TEXT` | `NOT NULL DEFAULT 'blog_post'` | `'blog_post'`, `'blog_index'`, `'home'`, `'lab'`, `'hermes'`, `'blueprints'` |
| `title` | `TEXT` | `DEFAULT NULL` | Page title at visit time |
| `category` | `TEXT` | `DEFAULT 'Engineering'` | Topic classification |
| `device` | `TEXT` | `DEFAULT 'desktop'` | `'desktop'`, `'mobile'`, `'tablet'` |
| `referrer` | `TEXT` | `DEFAULT 'direct'` | Origin source or referrer domain |
| `visitor_id` | `TEXT` | `DEFAULT NULL` | Anonymous hashed session token |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT now()` | Event timestamp |

**Indexes**:
- `idx_site_visits_created_at` on `created_at DESC`
- `idx_site_visits_path` on `path`
- `idx_site_visits_category` on `category`
- `idx_site_visits_device` on `device`

**RLS Policies**:
- `Public can log page visits`: `FOR INSERT TO anon, authenticated WITH CHECK (true)`
- `Allow read site_visits`: `FOR SELECT TO anon, authenticated USING (true)`

---

### 2.4 `public.templates` (Legacy / Direct Templates Table)
Maintained for backwards compatibility with earlier `/templates` iterations.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID PK` | Template ID |
| `title` | `TEXT` | Template title |
| `description` | `TEXT` | Description |
| `price` | `TEXT` | Price label |
| `gumroad_url` | `TEXT` | Direct Gumroad link |
| `preview_url` | `TEXT` | Optional demo link |
| `image_url` | `TEXT` | Thumbnail image |
| `tags` | `TEXT[]` | Tags list |
| `featured` | `BOOLEAN` | Featured badge |
| `created_at` | `TIMESTAMPTZ`| Creation timestamp |

---

## 3. Stored Procedures (RPCs)

### 3.1 `public.increment_post_views(post_slug TEXT)`
Allows public visitors to increment an article's view count without granting update privileges over the entire article row.
```sql
CREATE OR REPLACE FUNCTION public.increment_post_views(post_slug TEXT)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE public.posts
    SET view_count = view_count + 1
    WHERE slug = post_slug;
END;
$$;
```

### 3.2 `public.log_site_visit(...)`
Batches visitor telemetry logging securely into `public.site_visits`.
```sql
CREATE OR REPLACE FUNCTION public.log_site_visit(
    p_path TEXT,
    p_page_type TEXT DEFAULT 'blog_post',
    p_title TEXT DEFAULT NULL,
    p_category TEXT DEFAULT 'Engineering',
    p_device TEXT DEFAULT 'desktop',
    p_referrer TEXT DEFAULT 'direct',
    p_visitor_id TEXT DEFAULT NULL
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.site_visits (path, page_type, title, category, device, referrer, visitor_id)
    VALUES (p_path, p_page_type, p_title, p_category, p_device, p_referrer, p_visitor_id);
END;
$$;
```

---

## 4. Storage Buckets & Policies

| Bucket Name | Visibility | Allowed MIME Types | Used By |
| :--- | :--- | :--- | :--- |
| `blog-assets` | Public | Images (`image/*`), PDFs | `/admin/posts` cover images, inline WYSIWYG attachments |
| `templates` | Public | Images (`image/*`) | `/admin/blueprints` & `/admin/templates` preview covers |

**Storage RLS Rules**:
- **SELECT**: Public read access allowed for anyone (`bucket_id IN ('blog-assets', 'templates')`).
- **INSERT**: Authenticated users allowed to upload files.
- **DELETE**: Authenticated users allowed to remove files.
