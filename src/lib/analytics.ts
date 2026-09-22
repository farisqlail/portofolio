import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export interface TimeSeriesDataPoint {
  date: string; // ISO date YYYY-MM-DD
  displayDate: string; // "Sep 22"
  views: number;
  visitors: number;
}

export interface CategoryTraffic {
  category: string;
  views: number;
  percentage: number;
  color: string;
}

export interface DeviceTraffic {
  device: "desktop" | "mobile" | "tablet";
  views: number;
  percentage: number;
}

export interface SourceTraffic {
  source: string;
  views: number;
  percentage: number;
}

export interface TopPage {
  path: string;
  title: string;
  category: string;
  views: number;
  percentage: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  topCategory: string;
  growthRate: number | null; // null if no previous period data
  timeSeries: TimeSeriesDataPoint[];
  categoryDistribution: CategoryTraffic[];
  deviceDistribution: DeviceTraffic[];
  sourceDistribution: SourceTraffic[];
  topPages: TopPage[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "#FF5500", // Safety Ember
  Architecture: "#38BDF8", // Cyan
  "AI & ML": "#A3E635", // Acid Lime
  Web3: "#C084FC", // Soft Purple
  Leadership: "#FCD34D", // Amber
  Portfolio: "#94A3B8", // Slate
  Lab: "#F43F5E", // Rose
};

/**
 * Get or create an anonymous visitor ID persisted in localStorage
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let vid = localStorage.getItem("pa_vid");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem("pa_vid", vid);
    }
    return vid;
  } catch {
    return "anon";
  }
}

/**
 * Log a real page visit directly to Supabase site_visits table
 */
export async function logSiteVisit(params: {
  path: string;
  page_type?: string;
  title?: string;
  category?: string;
  device?: string;
  referrer?: string;
  visitor_id?: string;
}): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    const {
      path,
      page_type = "blog_post",
      title = null,
      category = "Engineering",
      device = "desktop",
      referrer = "direct",
      visitor_id = getVisitorId(),
    } = params;

    // Try direct insert first
    const insertPayload: Record<string, unknown> = {
      path,
      page_type,
      title,
      category,
      device,
      referrer,
    };

    if (visitor_id) {
      insertPayload.visitor_id = visitor_id;
    }

    const { error } = await supabase.from("site_visits").insert(insertPayload);

    // If visitor_id column doesn't exist in Supabase yet, retry without it
    if (error && error.message?.includes("visitor_id")) {
      delete insertPayload.visitor_id;
      await supabase.from("site_visits").insert(insertPayload);
    }
  } catch {
    // Fail silently in client telemetry
  }
}

/**
 * Fetch 100% REAL analytics aggregated directly from Supabase posts and site_visits tables.
 * NO synthetic, random, or baseline simulation data.
 */
export async function getAnalyticsSummary(days: number = 7): Promise<AnalyticsSummary> {
  // 1. Fetch real posts from Supabase
  let posts: Array<{ title: string; slug: string; category: string; view_count: number }> = [];

  if (isSupabaseConfigured) {
    try {
      const { data: postsData } = await supabase
        .from("posts")
        .select("title, slug, category, view_count")
        .order("view_count", { ascending: false });

      if (postsData) {
        posts = postsData;
      }
    } catch (err) {
      console.warn("Failed to fetch posts from Supabase:", err);
    }
  }

  // Sum of real post views recorded in the posts table
  const totalPostViews = posts.reduce((sum, p) => sum + (p.view_count || 0), 0);

  // 2. Query real site_visits for the requested date window
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);
  cutoff.setHours(0, 0, 0, 0);

  let visits: Array<{
    id: string;
    path: string;
    page_type: string;
    title: string | null;
    category: string | null;
    device: string | null;
    referrer: string | null;
    visitor_id?: string | null;
    created_at: string;
  }> = [];

  if (isSupabaseConfigured) {
    try {
      const { data: visitsData, error: visitsError } = await supabase
        .from("site_visits")
        .select("*")
        .gte("created_at", cutoff.toISOString())
        .order("created_at", { ascending: true });

      if (!visitsError && visitsData) {
        visits = visitsData;
      }
    } catch (err) {
      console.warn("Failed to query site_visits from Supabase:", err);
    }
  }

  // 3. Query previous period visits to calculate genuine growth rate (if available)
  let growthRate: number | null = null;
  if (isSupabaseConfigured && visits.length > 0) {
    try {
      const prevCutoff = new Date(cutoff);
      prevCutoff.setDate(prevCutoff.getDate() - days);

      const { data: prevVisits } = await supabase
        .from("site_visits")
        .select("id")
        .gte("created_at", prevCutoff.toISOString())
        .lt("created_at", cutoff.toISOString());

      if (prevVisits && prevVisits.length > 0) {
        growthRate = Math.round(((visits.length - prevVisits.length) / prevVisits.length) * 1000) / 10;
      }
    } catch {
      growthRate = null;
    }
  }

  // 4. Build exact daily time series for the past N days (100% REAL)
  const timeSeries: TimeSeriesDataPoint[] = [];
  const dateMap: Record<string, { views: number; visitors: Set<string> }> = {};

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split("T")[0];
    dateMap[dateKey] = { views: 0, visitors: new Set() };
  }

  // Populate from real site_visits
  visits.forEach((v) => {
    const dayKey = v.created_at ? v.created_at.split("T")[0] : "";
    if (dateMap[dayKey]) {
      dateMap[dayKey].views += 1;
      const visitorKey = v.visitor_id || `${v.device || "d"}_${v.referrer || "r"}`;
      dateMap[dayKey].visitors.add(visitorKey);
    }
  });

  Object.entries(dateMap).forEach(([dateStr, stats]) => {
    const d = new Date(dateStr);
    timeSeries.push({
      date: dateStr,
      displayDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: stats.views,
      visitors: stats.visitors.size,
    });
  });

  // 5. Compute real KPI metrics
  const todayKey = now.toISOString().split("T")[0];
  const todayViews = dateMap[todayKey]?.views || 0;

  // Real unique visitors in this period
  const allUniqueVisitors = new Set<string>();
  visits.forEach((v) => {
    allUniqueVisitors.add(v.visitor_id || `${v.device || "d"}_${v.referrer || "r"}`);
  });
  const uniqueVisitors = allUniqueVisitors.size;

  // Real total views:
  // If site_visits has logged rows, total views in the period is visits.length.
  // Otherwise, fallback to the real posts view_count from Supabase.
  const totalViews = visits.length > 0 ? visits.length : totalPostViews;

  // 6. Real Category Distribution
  const catMap: Record<string, number> = {};

  if (visits.length > 0) {
    visits.forEach((v) => {
      const cat = v.category || "Engineering";
      catMap[cat] = (catMap[cat] || 0) + 1;
    });
  } else {
    // When site_visits is fresh, aggregate directly from real posts view_count
    posts.forEach((p) => {
      const cat = p.category || "Engineering";
      catMap[cat] = (catMap[cat] || 0) + (p.view_count || 0);
    });
  }

  const totalCatViews = Object.values(catMap).reduce((a, b) => a + b, 0);
  const categoryDistribution: CategoryTraffic[] = Object.entries(catMap)
    .filter(([_, count]) => count > 0)
    .map(([cat, count]) => ({
      category: cat,
      views: count,
      percentage: totalCatViews > 0 ? Math.round((count / totalCatViews) * 100) : 0,
      color: CATEGORY_COLORS[cat] || "#FF5500",
    }))
    .sort((a, b) => b.views - a.views);

  const topCategory = categoryDistribution[0]?.category || (posts[0]?.category ?? "None");

  // 7. Real Device Distribution
  const devMap: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
  visits.forEach((v) => {
    const dev = (v.device || "desktop").toLowerCase();
    if (dev in devMap) {
      devMap[dev] += 1;
    } else {
      devMap.desktop += 1;
    }
  });

  const totalDevices = Object.values(devMap).reduce((a, b) => a + b, 0);
  const deviceDistribution: DeviceTraffic[] = (
    ["desktop", "mobile", "tablet"] as const
  ).map((device) => ({
    device,
    views: devMap[device],
    percentage: totalDevices > 0 ? Math.round((devMap[device] / totalDevices) * 100) : 0,
  }));

  // 8. Real Source Distribution
  const srcMap: Record<string, number> = {};
  visits.forEach((v) => {
    const ref = v.referrer || "direct";
    const sourceName =
      ref.includes("google")
        ? "Google Search"
        : ref.includes("github")
        ? "GitHub"
        : ref.includes("twitter") || ref.includes("t.co") || ref.includes("x.com")
        ? "Twitter / X"
        : ref.includes("linkedin")
        ? "LinkedIn"
        : ref === "direct" || !ref
        ? "Direct / Organic"
        : ref;

    srcMap[sourceName] = (srcMap[sourceName] || 0) + 1;
  });

  const totalSources = Object.values(srcMap).reduce((a, b) => a + b, 0);
  const sourceDistribution: SourceTraffic[] = Object.entries(srcMap)
    .map(([source, count]) => ({
      source,
      views: count,
      percentage: totalSources > 0 ? Math.round((count / totalSources) * 100) : 0,
    }))
    .sort((a, b) => b.views - a.views);

  // 9. Real Top Pages (100% from Supabase posts table)
  const topPages: TopPage[] = posts
    .slice()
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 10)
    .map((p) => ({
      path: `/blog/${p.slug}`,
      title: p.title,
      category: p.category,
      views: p.view_count || 0,
      percentage: totalPostViews > 0 ? Math.round(((p.view_count || 0) / totalPostViews) * 100) : 0,
    }));

  return {
    totalViews,
    uniqueVisitors,
    todayViews,
    topCategory,
    growthRate,
    timeSeries,
    categoryDistribution,
    deviceDistribution,
    sourceDistribution,
    topPages,
  };
}
